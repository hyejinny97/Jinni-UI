import { isObject } from '@/utils/isObject';
import { isNumber } from '@/utils/isNumber';
import { TimeStepManualType, TimeComponentProps } from '@/types/time-component';

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
}: Pick<TimeComponentProps, 'locale' | 'options'>): Array<string> => {
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
