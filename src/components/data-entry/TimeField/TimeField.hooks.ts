import { useState, useMemo, useRef, useLayoutEffect } from 'react';
import { TimeFieldProps, TimeMode } from './TimeField';
import {
  ValidationError,
  KeyTimePartType,
  TokensType,
  TimeObjectType,
  TimeStepManualType
} from './TimeField.types';
import {
  isAvailableLocale,
  getLocaleHourValues,
  getLocaleMinuteValues,
  getLocaleSecondValues,
  getLocaleDayPeriodValues,
  findHourTokenType,
  findMinuteTokenType,
  findSecondTokenType,
  findDayPeriodTokenType,
  is2Digit,
  dateToSeconds,
  isTimeStepManualType
} from './TimeField.utils';
import { TOKENS } from './TimeField.constants';
import { isNumber } from '@/utils/isNumber';

type UseTimeProps = Pick<
  TimeFieldProps,
  | 'defaultValue'
  | 'value'
  | 'onChange'
  | 'onError'
  | 'minTime'
  | 'maxTime'
  | 'disabledTimes'
> & {
  mode: TimeMode;
  timeStep: number | TimeStepManualType;
  dateToTimeObject: (date: Date | null | undefined) => TimeObjectType;
  timeObjectToDate: ({
    hour,
    minute,
    second,
    dayPeriod
  }: TimeObjectType) => Date;
};

type HandleTimeChangeType = ({
  hour,
  minute,
  second,
  dayPeriod
}: TimeObjectType) => void;

export const useTimeValue = ({
  defaultValue,
  value,
  minTime,
  maxTime,
  disabledTimes,
  mode,
  timeStep,
  onChange,
  onError,
  dateToTimeObject,
  timeObjectToDate
}: UseTimeProps) => {
  const isControlled = value !== undefined;
  const [uncontrolledTime, setUncontrolledTime] = useState<TimeObjectType>(
    dateToTimeObject(defaultValue)
  );
  const [isValidationError, setIsValidationError] = useState<boolean>(false);
  const time = isControlled ? dateToTimeObject(value) : uncontrolledTime;

  const validateTime = (time: Date | null): ValidationError | undefined => {
    if (time === null) return;
    const timeInSeconds = dateToSeconds(time);
    if (minTime) {
      const minTimeInSeconds = dateToSeconds(minTime);
      if (timeInSeconds < minTimeInSeconds) return 'minTime';
    }
    if (maxTime) {
      const maxTimeInSeconds = dateToSeconds(maxTime);
      if (timeInSeconds > maxTimeInSeconds) return 'maxTime';
    }
    if (disabledTimes) {
      const disabledTimeInSeconds = disabledTimes.map(dateToSeconds);
      if (disabledTimeInSeconds.includes(timeInSeconds)) return 'disabledTime';
    }
    if (mode === 'preset' && isNumber(timeStep)) {
      if (timeInSeconds % timeStep !== 0) return 'timeStep';
    } else if (mode === 'manual' && isTimeStepManualType(timeStep)) {
      const {
        hour: hourStep,
        minute: minuteStep,
        second: secondStep
      } = timeStep;
      const hour = time.getHours();
      const minute = time.getMinutes();
      const second = time.getSeconds();
      if (
        (hourStep && hour % hourStep !== 0) ||
        (minuteStep && minute % minuteStep !== 0) ||
        (secondStep && second % secondStep !== 0)
      ) {
        return 'timeStep';
      }
    }
  };

  const handleTimeChange: HandleTimeChangeType = ({
    hour,
    minute,
    second,
    dayPeriod
  }) => {
    const newTime = {
      ...time,
      hour: hour !== undefined ? hour : time.hour,
      minute: minute !== undefined ? minute : time.minute,
      second: second !== undefined ? second : time.second,
      dayPeriod: dayPeriod !== undefined ? dayPeriod : time.dayPeriod
    };
    const newDate = timeObjectToDate(newTime);
    const validationError = validateTime(newDate);
    if (!isControlled) setUncontrolledTime(newTime);
    if (onChange) onChange(newDate, validationError);
  };

  useLayoutEffect(() => {
    const date = isControlled ? value : timeObjectToDate(uncontrolledTime);
    const validationError = validateTime(date);
    setIsValidationError(!!validationError);
    if (!!validationError && onError) {
      onError(validationError);
    }
  }, [value, uncontrolledTime]);

  return {
    time,
    handleTimeChange,
    isValidationError
  };
};

export const useTimeFormat = ({
  locale,
  options,
  format
}: Pick<TimeFieldProps, 'locale' | 'options' | 'format'>) => {
  const {
    dateTimeFormat,
    localeHourValues,
    localeMinuteValues,
    localeSecondValues,
    localeDayPeriodValues,
    timeParts
  } = useMemo(() => {
    const dateTimeLocale = isAvailableLocale(locale) ? locale : 'en-US';
    let dateTimeFormat: Intl.DateTimeFormat;
    let localeHourValues: Array<string>;
    let localeSecondValues: Array<string>;
    let localeMinuteValues: Array<string>;
    let localeDayPeriodValues: Array<string>;
    let timeParts: Intl.DateTimeFormatPart[];

    if (format !== undefined) {
      const allTokens = Object.keys(TOKENS);
      const regex = new RegExp(`(${allTokens.join('|')})`, 'g');
      const parts = format.split(regex).filter((part) => part !== '');
      const options: Intl.DateTimeFormatOptions = {};
      parts.forEach((part) => {
        if (!allTokens.includes(part)) return;
        const token = part as TokensType;
        if (TOKENS[token].type === 'hour') {
          options.hour = TOKENS[token].digit;
          options.hourCycle = TOKENS[token].hourCycle;
        }
        if (TOKENS[token].type === 'minute') {
          options.minute = TOKENS[token].digit;
        }
        if (TOKENS[token].type === 'second') {
          options.second = TOKENS[token].digit;
        }
      });
      dateTimeFormat = new Intl.DateTimeFormat(dateTimeLocale, options);
      localeHourValues = getLocaleHourValues(dateTimeFormat);
      localeSecondValues = getLocaleSecondValues(dateTimeFormat);
      localeMinuteValues = getLocaleMinuteValues(dateTimeFormat);
      localeDayPeriodValues = getLocaleDayPeriodValues({
        locale: dateTimeLocale,
        options
      });
      timeParts = parts.map((part) => {
        if (allTokens.includes(part))
          return { type: TOKENS[part as TokensType].type, value: part };
        else return { type: 'literal', value: part };
      });
    } else {
      dateTimeFormat = new Intl.DateTimeFormat(dateTimeLocale, options);
      localeHourValues = getLocaleHourValues(dateTimeFormat);
      localeSecondValues = getLocaleSecondValues(dateTimeFormat);
      localeMinuteValues = getLocaleMinuteValues(dateTimeFormat);
      localeDayPeriodValues = getLocaleDayPeriodValues({
        locale: dateTimeLocale,
        options
      });
      timeParts = dateTimeFormat.formatToParts().map((part) => {
        switch (part.type) {
          case 'dayPeriod':
            return {
              type: 'dayPeriod',
              value: findDayPeriodTokenType(part.value)
            };
          case 'hour':
            return { type: 'hour', value: findHourTokenType(localeHourValues) };
          case 'minute':
            return {
              type: 'minute',
              value: findMinuteTokenType(localeMinuteValues)
            };
          case 'second':
            return {
              type: 'second',
              value: findSecondTokenType(localeSecondValues)
            };
          default:
            return { type: 'literal', value: part.value };
        }
      });
    }
    return {
      dateTimeFormat,
      localeHourValues,
      localeMinuteValues,
      localeSecondValues,
      localeDayPeriodValues,
      timeParts
    };
  }, [locale, options, format]);

  const dateToTimeObject = (date: Date | undefined | null): TimeObjectType => {
    if (date === undefined || date === null) return {};

    const isHour12 = dateTimeFormat.resolvedOptions().hour12;
    if (isHour12) {
      const hours = date.getHours();
      return {
        hour: localeHourValues[hours % 12],
        minute: localeMinuteValues[date.getMinutes()],
        second: localeSecondValues[date.getSeconds()],
        dayPeriod:
          hours >= 12 ? localeDayPeriodValues[1] : localeDayPeriodValues[0]
      };
    } else {
      return {
        hour: localeHourValues[date.getHours()],
        minute: localeMinuteValues[date.getMinutes()],
        second: localeSecondValues[date.getSeconds()]
      };
    }
  };

  const timeObjectToDate = ({
    hour,
    minute,
    second,
    dayPeriod
  }: TimeObjectType): Date => {
    const date = new Date(1970, 0, 1);
    if (hour !== undefined) {
      const localeHourIndex = localeHourValues.indexOf(hour);
      if (dayPeriod) {
        if (dayPeriod === localeDayPeriodValues[0] && localeHourIndex >= 12) {
          date.setHours(localeHourIndex - 12);
        } else if (
          dayPeriod === localeDayPeriodValues[1] &&
          localeHourIndex < 12
        ) {
          date.setHours(localeHourIndex + 12);
        } else {
          date.setHours(localeHourIndex);
        }
      } else {
        date.setHours(localeHourIndex);
      }
    }
    if (minute !== undefined)
      date.setMinutes(localeMinuteValues.indexOf(minute));
    if (second !== undefined)
      date.setSeconds(localeSecondValues.indexOf(second));
    return date;
  };

  return {
    localeHourValues,
    localeMinuteValues,
    localeSecondValues,
    localeDayPeriodValues,
    timeParts,
    dateToTimeObject,
    timeObjectToDate
  };
};

export const useInput = ({
  localeHourValues,
  localeSecondValues,
  localeMinuteValues,
  localeDayPeriodValues,
  handleTimeChange
}: {
  localeHourValues: Array<string>;
  localeSecondValues: Array<string>;
  localeMinuteValues: Array<string>;
  localeDayPeriodValues: Array<string>;
  handleTimeChange: HandleTimeChangeType;
}) => {
  const timePartsElRef = useRef<Array<HTMLElement>>([]);
  const is2DigitHour = useMemo(
    () => is2Digit(localeHourValues),
    [localeHourValues]
  );
  const is2DigitMinute = useMemo(
    () => is2Digit(localeMinuteValues),
    [localeMinuteValues]
  );
  const is2DigitSecond = useMemo(
    () => is2Digit(localeSecondValues),
    [localeSecondValues]
  );
  const localeHourValuesNumeric = useMemo(() => {
    if (!is2DigitHour) return localeHourValues;
    const ZERO = localeHourValues[1][0];
    return localeHourValues.map((hour) =>
      hour[0] === ZERO ? hour.slice(1) : hour
    );
  }, [localeHourValues]);
  const localeMinuteValuesNumeric = useMemo(() => {
    if (!is2DigitMinute) return localeMinuteValues;
    const ZERO = localeMinuteValues[0][0];
    return localeMinuteValues.map((minute) =>
      minute[0] === ZERO ? minute.slice(1) : minute
    );
  }, [localeMinuteValues]);
  const localeSecondValuesNumeric = useMemo(() => {
    if (!is2DigitSecond) return localeSecondValues;
    const ZERO = localeSecondValues[0][0];
    return localeSecondValues.map((second) =>
      second[0] === ZERO ? second.slice(1) : second
    );
  }, [localeSecondValues]);

  const focusNextTimePart = (currentTimePartEl: HTMLElement) => {
    const currentIndex = timePartsElRef.current.indexOf(currentTimePartEl);
    const nextIndex = currentIndex + 1;
    if (nextIndex < timePartsElRef.current.length) {
      const nextTimePartEl = timePartsElRef.current[nextIndex];
      nextTimePartEl.focus();
    } else {
      currentTimePartEl.blur();
    }
  };

  const handleInputChange =
    (type: KeyTimePartType) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      if (value === undefined || value === null) return;
      switch (type) {
        case 'hour': {
          let newValue = value.slice(-2);
          const candidatesIdx = localeHourValuesNumeric.reduce(
            (acc, hour, idx) =>
              hour.startsWith(newValue) ? [...acc, idx] : acc,
            [] as number[]
          );
          if (candidatesIdx.length === 1) {
            handleTimeChange({ hour: localeHourValues[candidatesIdx[0]] });
            focusNextTimePart(e.currentTarget);
          } else if (candidatesIdx.length > 1) {
            if (is2DigitHour) {
              const ZERO = localeHourValues[1][0];
              handleTimeChange({ hour: ZERO + newValue });
            } else {
              handleTimeChange({ hour: newValue });
            }
          }
          return;
        }
        case 'minute': {
          let newValue = value.slice(-2);
          const candidatesIdx = localeMinuteValuesNumeric.reduce(
            (acc, minute, idx) =>
              minute.startsWith(newValue) ? [...acc, idx] : acc,
            [] as number[]
          );
          if (candidatesIdx.length === 1) {
            handleTimeChange({ minute: localeMinuteValues[candidatesIdx[0]] });
            focusNextTimePart(e.currentTarget);
          } else if (candidatesIdx.length > 1) {
            if (is2DigitMinute) {
              const ZERO = localeMinuteValues[0][0];
              handleTimeChange({ minute: ZERO + newValue });
            } else {
              handleTimeChange({ minute: newValue });
            }
          }
          return;
        }
        case 'second': {
          let newValue = value.slice(-2);
          const candidatesIdx = localeSecondValuesNumeric.reduce(
            (acc, second, idx) =>
              second.startsWith(newValue) ? [...acc, idx] : acc,
            [] as number[]
          );
          if (candidatesIdx.length === 1) {
            handleTimeChange({ second: localeSecondValues[candidatesIdx[0]] });
            focusNextTimePart(e.currentTarget);
          } else if (candidatesIdx.length > 1) {
            if (is2DigitSecond) {
              const ZERO = localeSecondValues[0][0];
              handleTimeChange({ second: ZERO + newValue });
            } else {
              handleTimeChange({ second: newValue });
            }
          }
          return;
        }
        case 'dayPeriod': {
          const candidates = localeDayPeriodValues.filter((dayPeriod) =>
            dayPeriod.toLocaleUpperCase().startsWith(value.toLocaleUpperCase())
          );
          if (candidates.length === 1) {
            handleTimeChange({ dayPeriod: candidates[0] });
            focusNextTimePart(e.currentTarget);
          } else if (candidates.length > 1) {
            handleTimeChange({ dayPeriod: candidates[0] });
          }
          return;
        }
      }
    };

  return {
    timePartsElRef,
    handleInputChange
  };
};
