import { LocaleDayType } from './DayCalendar.types';

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getLocaleDays = (
  year: number,
  month: number,
  locale?: string
): Array<LocaleDayType> => {
  const dateTimeFormat = new Intl.DateTimeFormat(locale, { day: 'numeric' });
  let day: Array<LocaleDayType> = [];
  const endDay = getDaysInMonth(year, month);
  for (let d = 1; d < endDay + 1; d++) {
    const date = new Date(year, month, d);
    const parts = dateTimeFormat.formatToParts(date);
    const dayPart = parts.find((p) => p.type === 'day');
    if (dayPart) {
      day.push({
        format: dayPart.value,
        value: date
      });
    }
  }
  return day;
};

export const getLocaleWeekDays = (locale?: string) => {
  const dateTimeFormat = new Intl.DateTimeFormat(locale, { weekday: 'narrow' });
  let weekday: Array<string> = [];
  for (let d = 1; d < 8; d++) {
    const date = new Date(2023, 0, d);
    const parts = dateTimeFormat.formatToParts(date);
    const weekdayPart = parts.find((p) => p.type === 'weekday');
    if (weekdayPart) {
      weekday.push(weekdayPart.value);
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

export const isSameDay = (baseDay: Date, targetDay: Date) => {
  return initTime(baseDay).getTime() === initTime(targetDay).getTime();
};
