import { TOKENS, MONTH_DIGITS } from './DateField.constants';
import { MonthDigitTypes } from './DateField.types';

export const isAvailableLocale = (locale: string | undefined): boolean => {
  if (locale === undefined) return true;
  const supportedLocales = Intl.DateTimeFormat.supportedLocalesOf([locale]);
  return supportedLocales.length > 0;
};

export const is2Digit = (values: Array<string>) =>
  values.length > 0 && values.every((v) => v.length === 2);

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

export const getLocaleDayValues = (
  dateTimeFormat: Intl.DateTimeFormat,
  date: Date | null = null
) => {
  const day = new Set<string>();
  const year = date ? date.getFullYear() : new Date().getFullYear();
  const month = date ? date.getMonth() : 0;
  for (let d = 1; d < 32; d++) {
    const date = new Date(year, month, d);
    const parts = dateTimeFormat.formatToParts(date);
    const dayPart = parts.find((p) => p.type === 'day');
    if (dayPart) {
      day.add(dayPart.value);
    }
  }
  return Array.from(day);
};

export const findYearTokenType = (dateTimeFormat: Intl.DateTimeFormat) => {
  const year = dateTimeFormat
    .formatToParts(new Date())
    .find((p) => p.type === 'year');
  const is2DigitType = year ? year.value.length === 2 : false;
  for (const [token, value] of Object.entries(TOKENS)) {
    if (value.type !== 'year') continue;
    const matchDigit = is2DigitType
      ? value.digit === '2-digit'
      : value.digit === 'numeric';
    if (matchDigit) return token;
  }
  throw new Error(`year token type을 찾을 수 없습니다.`);
};

export const findMonthTokenType = (
  localeMonthValues: Array<string>,
  locale?: string
) => {
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
    if (matchDigit) return token;
  }
  throw new Error(`month token type을 찾을 수 없습니다.`);
};

export const findDayTokenType = (localeDayValues: Array<string>) => {
  const is2DigitType = is2Digit(localeDayValues);
  for (const [token, value] of Object.entries(TOKENS)) {
    if (value.type !== 'day') continue;
    const matchDigit = is2DigitType
      ? value.digit === '2-digit'
      : value.digit === 'numeric';
    if (matchDigit) return token;
  }
  throw new Error(`day token type을 찾을 수 없습니다.`);
};
