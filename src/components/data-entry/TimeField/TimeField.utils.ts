import { TimeFieldProps } from './TimeField';
import { TOKENS } from './TimeField.constants';
import { TimeStepManualType } from './TimeField.types';
import { isObject } from '@/utils/isObject';
import { isNumber } from '@/utils/isNumber';

export const isAvailableLocale = (locale: string | undefined): boolean => {
  if (locale === undefined) return true;
  const supportedLocales = Intl.DateTimeFormat.supportedLocalesOf([locale]);
  return supportedLocales.length > 0;
};

export const getLocaleHourValues = (
  dateTimeFormat: Intl.DateTimeFormat
): Array<string> => {
  const hours = new Set<string>();
  for (let h = 0; h < 24; h++) {
    const date = new Date(2025, 0, 1, h);
    const parts = dateTimeFormat.formatToParts(date);
    const hourPart = parts.find((p) => p.type === 'hour');
    if (hourPart) {
      hours.add(hourPart.value);
    }
  }
  return Array.from(hours);
};

export const getLocaleMinuteValues = (
  dateTimeFormat: Intl.DateTimeFormat
): Array<string> => {
  const minutes = new Set<string>();
  for (let m = 0; m < 60; m++) {
    const date = new Date(2025, 0, 1, 1, m);
    const parts = dateTimeFormat.formatToParts(date);
    const minutePart = parts.find((p) => p.type === 'minute');
    if (minutePart) {
      minutes.add(minutePart.value);
    }
  }
  return Array.from(minutes);
};

export const getLocaleSecondValues = (
  dateTimeFormat: Intl.DateTimeFormat
): Array<string> => {
  const seconds = new Set<string>();
  for (let s = 0; s < 60; s++) {
    const date = new Date(2025, 0, 1, 1, 1, s);
    const parts = dateTimeFormat.formatToParts(date);
    const secondPart = parts.find((p) => p.type === 'second');
    if (secondPart) {
      seconds.add(secondPart.value);
    }
  }
  return Array.from(seconds);
};

export const getLocaleDayPeriodValues = ({
  locale,
  options
}: Pick<TimeFieldProps, 'locale' | 'options'>): Array<string> => {
  const dateTimeFormat = new Intl.DateTimeFormat(locale, {
    ...options,
    hour12: true
  });
  const dayPeriods = new Set<string>();
  for (let hour = 0; hour < 24; hour++) {
    const date = new Date(2025, 0, 1, hour);
    const parts = dateTimeFormat.formatToParts(date);
    const dayPeriod = parts.find((part) => part.type === 'dayPeriod');
    if (dayPeriod) {
      dayPeriods.add(dayPeriod.value);
    }
  }
  return Array.from(dayPeriods);
};

export const is2Digit = (values: Array<string>) =>
  values.length > 0 && values.every((v) => v.length === 2);

export const findHourTokenType = (localeHourValues: Array<string>) => {
  const is2DigitType = is2Digit(localeHourValues);
  let tokenHourCycle;
  if (localeHourValues.length === 12) {
    tokenHourCycle = localeHourValues[0] === '12' ? 'h12' : 'h11';
  } else {
    tokenHourCycle = localeHourValues[0] === '24' ? 'h24' : 'h23';
  }
  for (const [token, value] of Object.entries(TOKENS)) {
    if (value.type !== 'hour') continue;
    const matchDigit = is2DigitType
      ? value.digit === '2-digit'
      : value.digit === 'numeric';
    const matchHourCycle = tokenHourCycle === value.hourCycle;
    if (matchDigit && matchHourCycle) return token;
  }
  throw new Error(`hour token type을 찾을 수 없습니다.`);
};

export const findMinuteTokenType = (localeMinuteValues: Array<string>) => {
  const is2DigitType = is2Digit(localeMinuteValues);
  for (const [token, value] of Object.entries(TOKENS)) {
    if (value.type !== 'minute') continue;
    const matchDigit = is2DigitType
      ? value.digit === '2-digit'
      : value.digit === 'numeric';
    if (matchDigit) return token;
  }
  throw new Error(`minute token type을 찾을 수 없습니다.`);
};

export const findSecondTokenType = (localeSecondValues: Array<string>) => {
  const is2DigitType = is2Digit(localeSecondValues);
  for (const [token, value] of Object.entries(TOKENS)) {
    if (value.type !== 'second') continue;
    const matchDigit = is2DigitType
      ? value.digit === '2-digit'
      : value.digit === 'numeric';
    if (matchDigit) return token;
  }
  throw new Error(`second token type을 찾을 수 없습니다.`);
};

export const findDayPeriodTokenType = (dayPeriodValue: string) => {
  const lettersCase =
    dayPeriodValue.toLocaleUpperCase() === dayPeriodValue ? 'upper' : 'lower';
  for (const [token, value] of Object.entries(TOKENS)) {
    if (value.type !== 'dayPeriod') continue;
    const matchCase = lettersCase === value.case;
    if (matchCase) return token;
  }
  throw new Error(`dayPeriod token type을 찾을 수 없습니다.`);
};

export const dateToSeconds = (date: Date) => {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return hour * 3600 + minute * 60 + second;
};

export const isTimeStepManualType = (
  timeStep: unknown
): timeStep is TimeStepManualType =>
  isObject(timeStep) &&
  Object.entries(timeStep).every(
    ([key, value]) =>
      ['hour', 'minute', 'second'].includes(key) && isNumber(value)
  );
