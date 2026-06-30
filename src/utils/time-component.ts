import { isObject } from '@/utils/isObject';
import { isNumber } from '@/utils/isNumber';
import {
  TimeStepManualType,
  TimeComponentProps,
  TimeMode,
  DisabledTimesFnType,
  DisabledTimesWithUnitFnType
} from '@/types/time-component';

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

export const fixTimeStepTypeByMode = ({
  mode,
  timeStep
}: {
  mode: TimeMode;
  timeStep: number | TimeStepManualType;
}):
  | { mode: 'preset'; timeStep: number }
  | { mode: 'manual'; timeStep: TimeStepManualType } => {
  if (mode === 'preset' && isNumber(timeStep))
    return { mode: 'preset' as const, timeStep };
  if (mode === 'manual' && isTimeStepManualType(timeStep))
    return { mode: 'manual' as const, timeStep };
  throw new Error(
    `timeStep prop의 타입이 올바르지 않습니다.\n- mode: 'preset', timeStep: number\n- mode: 'manual', timeStep: { hour: number; minute: number; second: number; }`
  );
};

export const isDisabledTimesWithUnitFnType = (
  fn: DisabledTimesFnType | DisabledTimesWithUnitFnType
): fn is DisabledTimesWithUnitFnType => {
  const fnString = fn.toString();
  const paramsMatch = fnString.match(/\(([^)]*)\)/);
  if (!paramsMatch) return false;

  const params = paramsMatch[1];
  return /\bunit\b/.test(params);
};

export const isDisabledTimesFnType = (
  fn: DisabledTimesFnType | DisabledTimesWithUnitFnType
): fn is DisabledTimesFnType => {
  return !isDisabledTimesWithUnitFnType(fn);
};

export const fixDigitalClockPropsByMode = ({
  mode,
  disabledTimes,
  timeStep
}: {
  mode: TimeMode;
  disabledTimes:
    | Array<Date>
    | DisabledTimesFnType
    | DisabledTimesWithUnitFnType
    | undefined;
  timeStep: number | TimeStepManualType;
}):
  | {
      mode: 'preset';
      disabledTimes?: Array<Date> | DisabledTimesFnType;
      timeStep: number;
    }
  | {
      mode: 'manual';
      disabledTimes?: Array<Date> | DisabledTimesWithUnitFnType;
      timeStep: TimeStepManualType;
    } => {
  switch (mode) {
    case 'preset': {
      if (!isNumber(timeStep)) {
        throw new Error(
          `mode='preset'인 경우, timeStep prop의 타입은 number입니다.`
        );
      }
      if (
        disabledTimes !== undefined &&
        !Array.isArray(disabledTimes) &&
        !isDisabledTimesFnType(disabledTimes)
      ) {
        throw new Error(
          `mode='preset'인 경우, disabledTimes prop의 타입은 아래와 같습니다.\n- Array<Date> | ({ time }: { time: Date }) => boolean;`
        );
      }
      return {
        mode: 'preset' as const,
        disabledTimes,
        timeStep
      };
    }
    case 'manual': {
      if (!isTimeStepManualType(timeStep)) {
        throw new Error(
          `mode='manual'인 경우, timeStep prop의 타입은 { hour: number; minute: number; second: number; }입니다.`
        );
      }
      if (
        disabledTimes !== undefined &&
        !Array.isArray(disabledTimes) &&
        !isDisabledTimesWithUnitFnType(disabledTimes)
      ) {
        throw new Error(
          `mode='manual'인 경우, disabledTimes prop의 타입은 아래와 같습니다.\n- Array<Date> | ({ time, unit }: { time: Date; unit: 'hour' | 'minute' | 'second'; }) => boolean;`
        );
      }
      return {
        mode: 'manual' as const,
        disabledTimes,
        timeStep
      };
    }
  }
};
