import { TOKENS, MONTH_DIGITS, KEY_DATE_PARTS } from './DateField.constants';
import {
  MonthDigitTypes,
  YearTokensTypes,
  MonthTokensTypes,
  DayTokensTypes,
  KeyDatePartType
} from './DateField.types';
import { is2Digit } from '@/utils/dateTimeFormat';

export const getLocaleNumberValues = (locale?: string) => {
  const localeNumbers: Array<string> = [];
  for (let m = 0; m < 10; m++) {
    const parts = new Intl.DateTimeFormat(locale, {
      minute: 'numeric'
    }).formatToParts(new Date(1970, 0, 1, 1, m));
    const minutePart = parts.find((p) => p.type === 'minute');
    if (minutePart) {
      localeNumbers.push(minutePart.value);
    }
  }
  return localeNumbers;
};

export const getLocaleMonthValues = (dateTimeFormat: Intl.DateTimeFormat) => {
  const month: Array<string> = [];
  for (let m = 0; m < 12; m++) {
    const date = new Date(2025, m);
    const parts = dateTimeFormat.formatToParts(date);
    const monthPart = parts.find((p) => p.type === 'month');
    if (monthPart) {
      month.push(monthPart.value);
    }
  }
  return month;
};

export const getLocaleDayValues = (dateTimeFormat: Intl.DateTimeFormat) => {
  const day: Array<string> = [];
  for (let d = 1; d < 32; d++) {
    const date = new Date(1970, 0, d);
    const parts = dateTimeFormat.formatToParts(date);
    const dayPart = parts.find((p) => p.type === 'day');
    if (dayPart) {
      day.push(dayPart.value);
    }
  }
  return day;
};

export const findYearTokenType = (
  dateTimeFormat: Intl.DateTimeFormat
): YearTokensTypes => {
  const year = dateTimeFormat
    .formatToParts(new Date())
    .find((p) => p.type === 'year');
  const is2DigitType = year ? year.value.length === 2 : false;
  for (const [token, value] of Object.entries(TOKENS)) {
    if (value.type !== 'year') continue;
    const matchDigit = is2DigitType
      ? value.digit === '2-digit'
      : value.digit === 'numeric';
    if (matchDigit) return token as YearTokensTypes;
  }
  throw new Error(`year token type을 찾을 수 없습니다.`);
};

export const findMonthTokenType = (
  localeMonthValues: Array<string>,
  locale?: string
): MonthTokensTypes => {
  const isValidMonthDigit = (digit: MonthDigitTypes) => {
    const targetLocaleMonthValues = getLocaleMonthValues(
      new Intl.DateTimeFormat(locale, { month: digit })
    );
    return targetLocaleMonthValues.every((val) =>
      localeMonthValues.includes(val)
    );
  };
  const monthDigit: MonthDigitTypes | undefined = MONTH_DIGITS.find((digit) =>
    isValidMonthDigit(digit)
  );
  if (!monthDigit) throw new Error(`month token type을 찾을 수 없습니다.`);
  for (const [token, value] of Object.entries(TOKENS)) {
    if (value.type !== 'month') continue;
    const matchDigit = value.digit === monthDigit;
    if (matchDigit) return token as MonthTokensTypes;
  }
  throw new Error(`month token type을 찾을 수 없습니다.`);
};

export const findDayTokenType = (
  localeDayValues: Array<string>
): DayTokensTypes => {
  const is2DigitType = is2Digit(localeDayValues);
  for (const [token, value] of Object.entries(TOKENS)) {
    if (value.type !== 'day') continue;
    const matchDigit = is2DigitType
      ? value.digit === '2-digit'
      : value.digit === 'numeric';
    if (matchDigit) return token as DayTokensTypes;
  }
  throw new Error(`day token type을 찾을 수 없습니다.`);
};

export const dateToTimeStamp = (date: Date): number => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return new Date(year, month, day).getTime();
};

export const getLastDay = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const isKeyDatePart = (
  type: keyof Intl.DateTimeFormatPartTypesRegistry
): type is KeyDatePartType => KEY_DATE_PARTS.some((part) => part === type);
