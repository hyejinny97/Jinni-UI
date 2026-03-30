import {
  YearDigitType,
  MonthDigitType,
  DateComponentProps,
  DateOptions,
  CalendarType
} from '@/types/date-component';
import { MONTH_DIGITS, CALENDARS } from '@/constants/date-component';
import { DAY } from '@/constants/time';

export const getYearDateTimeFormat = ({
  locale,
  options
}: Pick<DateComponentProps, 'locale' | 'options'>) => {
  const dateTimeFormat = new Intl.DateTimeFormat(locale, options);
  const yearPart = dateTimeFormat
    .formatToParts()
    .find((part) => part.type === 'year');
  const yearType: YearDigitType =
    yearPart && yearPart.value.length === 2 ? '2-digit' : 'numeric';
  return new Intl.DateTimeFormat(locale, { year: yearType });
};

export const getYearMonthDateTimeFormat = ({
  locale,
  options
}: Pick<DateComponentProps, 'locale' | 'options'>) => {
  const dateTimeFormat = new Intl.DateTimeFormat(locale, options);
  const baseDate = new Date(1970, 0, 1);
  const parts = dateTimeFormat.formatToParts(baseDate);
  const yearPart = parts.find((part) => part.type === 'year');
  const monthPart = parts.find((part) => part.type === 'month');

  const yearType: YearDigitType =
    yearPart && yearPart.value.length === 2 ? '2-digit' : 'numeric';
  const monthType: MonthDigitType =
    (monthPart &&
      MONTH_DIGITS.find(
        (digit) =>
          new Intl.DateTimeFormat(locale, { month: digit })
            .formatToParts(baseDate)
            .find((part) => part.type === 'month')?.value === monthPart.value
      )) ||
    'long';

  return new Intl.DateTimeFormat(locale, {
    year: yearType,
    month: monthType
  });
};

export const dateToMonth = (date: Date): number => {
  const year = date.getFullYear() - 1;
  const month = date.getMonth();
  return year * 12 + month;
};

export const dateToDay = (date: Date): number => {
  const localMidnight = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  return Math.floor(localMidnight.getTime() / DAY) + 1;
};

export const getLastDay = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const getBaseCalendarType = ({
  locale,
  options
}: {
  locale?: string;
  options?: DateOptions;
}): CalendarType => {
  const dateTimeFormat = new Intl.DateTimeFormat(locale, options);
  const dateParts = dateTimeFormat.formatToParts();
  const datePartTypes = new Set(dateParts.map((part) => part.type));
  for (const calendarType of CALENDARS) {
    if (datePartTypes.has(calendarType)) {
      return calendarType;
    }
  }
  throw new Error('Calendar Type을 찾을 수 없습니다.');
};
