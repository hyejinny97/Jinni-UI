import { LocaleDayType, LocaleWeekDayType } from './DayCalendar.types';
import { DAY } from '@/constants/time';

export const getLocaleDays = ({
  year,
  month,
  locale,
  startDay,
  endDay
}: {
  year: number;
  month: number;
  locale?: string;
  startDay: number;
  endDay: number;
}): Array<LocaleDayType> => {
  const dateTimeFormat = new Intl.DateTimeFormat(locale, { day: 'numeric' });
  let day: Array<LocaleDayType> = [];
  for (let d = startDay; d < endDay + 1; d++) {
    const date = new Date(year, month, d);
    const isOutsideDay = date.getMonth() !== month;
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

export const getLocaleWeekDays = (
  locale?: string
): Array<LocaleWeekDayType> => {
  const dateTimeFormat = new Intl.DateTimeFormat(locale, { weekday: 'narrow' });
  let weekday: Array<LocaleWeekDayType> = [];
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

const initTime = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  return newDate;
};

export const isSameDay = ({
  baseDate,
  targetDate
}: {
  baseDate: Date;
  targetDate: Date;
}) => {
  return initTime(baseDate).getTime() === initTime(targetDate).getTime();
};

export const isLowerDay = ({
  baseDate,
  targetDate
}: {
  baseDate?: Date;
  targetDate: Date;
}): boolean => {
  if (!baseDate) return false;
  return initTime(baseDate).getTime() > initTime(targetDate).getTime();
};

export const isHigherDay = ({
  baseDate,
  targetDate
}: {
  baseDate?: Date;
  targetDate: Date;
}): boolean => {
  if (!baseDate) return false;
  return initTime(baseDate).getTime() < initTime(targetDate).getTime();
};

export const getWeekNumber = (date: Date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / DAY;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};
