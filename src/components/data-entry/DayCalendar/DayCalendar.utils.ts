import { LocaleWeekDayType, LocaleDayType } from './DayCalendar.types';
import { DAY } from '@/constants/time';

export const getLocaleWeekDays = (
  locale?: string
): Array<LocaleWeekDayType> => {
  const dateTimeFormat = new Intl.DateTimeFormat(locale, { weekday: 'narrow' });
  const weekday: Array<LocaleWeekDayType> = [];
  for (let d = 1; d < 8; d++) {
    const date = new Date(2023, 0, d);
    const parts = dateTimeFormat.formatToParts(date);
    const weekdayPart = parts.find((p) => p.type === 'weekday');
    if (weekdayPart) {
      weekday.push({ type: 'weekday', format: weekdayPart.value });
    }
  }
  return weekday;
};

export const getLocaleDays = ({
  locale,
  displayedDate,
  startDay,
  endDay
}: {
  locale?: string;
  displayedDate: Date;
  startDay: number;
  endDay: number;
}): Array<LocaleDayType> => {
  const dateTimeFormat = new Intl.DateTimeFormat(locale, { day: 'numeric' });
  const displayedMonth = displayedDate.getMonth();
  const day: Array<LocaleDayType> = [];
  for (let d = startDay; d < endDay + 1; d++) {
    const date = new Date(displayedDate);
    date.setDate(d);
    const isOutsideDay = date.getMonth() !== displayedMonth;
    const parts = dateTimeFormat.formatToParts(date);
    const dayPart = parts.find((p) => p.type === 'day');
    if (dayPart) {
      day.push({
        type: isOutsideDay ? 'outside-day' : 'day',
        format: dayPart.value,
        value: date
      });
    }
  }
  return day;
};

export const getWeekNumber = (date: Date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / DAY;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

export const isSameDay = ({
  baseDate,
  targetDate
}: {
  baseDate: Date;
  targetDate: Date;
}) => {
  return (
    Math.trunc(baseDate.getTime() / DAY) ===
    Math.trunc(targetDate.getTime() / DAY)
  );
};

export const isLowerDay = ({
  baseDate,
  targetDate
}: {
  baseDate?: Date;
  targetDate: Date;
}): boolean => {
  if (!baseDate) return false;
  return (
    Math.trunc(baseDate.getTime() / DAY) >
    Math.trunc(targetDate.getTime() / DAY)
  );
};

export const isHigherDay = ({
  baseDate,
  targetDate
}: {
  baseDate?: Date;
  targetDate: Date;
}): boolean => {
  if (!baseDate) return false;
  return (
    Math.trunc(baseDate.getTime() / DAY) <
    Math.trunc(targetDate.getTime() / DAY)
  );
};
