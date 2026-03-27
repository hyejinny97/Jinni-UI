import {
  YearDigitType,
  MonthDigitType,
  DateComponentProps
} from '@/types/date-component';
import { MONTH_DIGITS } from '@/constants/date-component';
import { DAY } from '@/constants/time';

type GetLocaleYearProps = Pick<DateComponentProps, 'locale' | 'options'> & {
  date: Date;
};

type GetDatePartsProps = Pick<DateComponentProps, 'locale' | 'options'> & {
  displayedDate: Date;
};

export const getLocaleYear = ({
  locale,
  options,
  date
}: GetLocaleYearProps): string => {
  const dateTimeFormat = new Intl.DateTimeFormat(locale, options);
  const yearPart = dateTimeFormat
    .formatToParts()
    .find((part) => part.type === 'year');
  const yearType: YearDigitType =
    yearPart && yearPart.value.length === 2 ? '2-digit' : 'numeric';
  return new Intl.DateTimeFormat(locale, { year: yearType }).format(date);
};

export const getYearMonthParts = ({
  locale,
  options,
  displayedDate
}: GetDatePartsProps): Array<Intl.DateTimeFormatPart> => {
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
  }).formatToParts(displayedDate);
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
