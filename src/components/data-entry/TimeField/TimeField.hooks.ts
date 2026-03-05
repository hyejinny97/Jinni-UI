import {
  useState,
  useMemo,
  useLayoutEffect,
  useEffect,
  useCallback,
  MutableRefObject
} from 'react';
import { TimeFieldProps } from './TimeField';
import { TokensType, TimeObjectType } from './TimeField.types';
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
  is2Digit
} from './TimeField.utils';
import { TOKENS } from './TimeField.constants';
import { isNumber } from '@/utils/isNumber';
import {
  TimeMode,
  TimeValidationError,
  KeyTimePartType
} from '@/types/time-component';
import { dateToSeconds, isTimeStepManualType } from '@/utils/time-component';

type TimeObjectToDate = ({
  hour,
  minute,
  second,
  dayPeriod
}: TimeObjectType) => Date;

type HandleTimeChangeType = ({
  hour,
  minute,
  second,
  dayPeriod
}: TimeObjectType) => void;

type UseTimeProps = Pick<
  TimeFieldProps,
  'defaultValue' | 'value' | 'onChange'
> & {
  dateToTimeObject: (date: Date | null | undefined) => TimeObjectType;
  timeObjectToDate: TimeObjectToDate;
};

type UseValidationProps<Mode extends TimeMode = 'preset'> = Pick<
  TimeFieldProps<'div', Mode>,
  | 'mode'
  | 'minTime'
  | 'maxTime'
  | 'disabledTimes'
  | 'timeStep'
  | 'onErrorStatus'
> & {
  time: TimeObjectType;
  timeObjectToDate: TimeObjectToDate;
};

type UseFocusProps = {
  timePartsElRef: MutableRefObject<HTMLElement[]>;
};

type UseInputProps = {
  localeHourValues: Array<string>;
  localeSecondValues: Array<string>;
  localeMinuteValues: Array<string>;
  localeDayPeriodValues: Array<string>;
  handleTimeChange: HandleTimeChangeType;
  focusNextTimePartOrBlur: (currentTimePartEl: HTMLElement) => void;
};

export const useTimeValue = ({
  defaultValue,
  value,
  onChange,
  dateToTimeObject,
  timeObjectToDate
}: UseTimeProps) => {
  const isControlled = value !== undefined;
  const [uncontrolledTime, setUncontrolledTime] = useState<TimeObjectType>(
    dateToTimeObject(defaultValue)
  );
  const time: TimeObjectType = isControlled
    ? dateToTimeObject(value)
    : uncontrolledTime;

  const handleTimeChange: HandleTimeChangeType = ({
    hour,
    minute,
    second,
    dayPeriod
  }) => {
    const newTime = {
      hour: hour ?? time.hour,
      minute: minute ?? time.minute,
      second: second ?? time.second,
      dayPeriod: dayPeriod ?? time.dayPeriod
    };
    const newDate = timeObjectToDate(newTime);
    if (!isControlled) setUncontrolledTime(newTime);
    if (onChange) onChange(newDate);
  };

  return {
    time,
    handleTimeChange
  };
};

export const useValidation = <Mode extends TimeMode = 'preset'>({
  time,
  mode,
  minTime,
  maxTime,
  disabledTimes,
  timeStep,
  onErrorStatus,
  timeObjectToDate
}: UseValidationProps<Mode>) => {
  const minTimeInSeconds = useMemo<number | undefined>(
    () => minTime && dateToSeconds(minTime),
    [minTime]
  );
  const maxTimeInSeconds = useMemo<number | undefined>(
    () => maxTime && dateToSeconds(maxTime),
    [maxTime]
  );
  const disabledTimeInSeconds = useMemo<number[] | undefined>(
    () => disabledTimes && disabledTimes.map(dateToSeconds),
    [disabledTimes]
  );

  const validateTime = useCallback(
    (time: Date | null): TimeValidationError | undefined => {
      if (time === null) return;
      const timeInSeconds = dateToSeconds(time);
      if (isNumber(minTimeInSeconds) && timeInSeconds < minTimeInSeconds) {
        return 'minTime';
      }
      if (isNumber(maxTimeInSeconds) && timeInSeconds > maxTimeInSeconds) {
        return 'maxTime';
      }
      if (
        disabledTimeInSeconds &&
        disabledTimeInSeconds.includes(timeInSeconds)
      ) {
        return 'disabledTime';
      }
      switch (mode) {
        case 'preset': {
          if (isNumber(timeStep) && timeInSeconds % timeStep !== 0) {
            return 'timeStep';
          }
          break;
        }
        case 'manual': {
          if (isTimeStepManualType(timeStep)) {
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
        }
      }
    },
    [mode, minTimeInSeconds, maxTimeInSeconds, disabledTimeInSeconds, timeStep]
  );

  const validationError = useMemo<TimeValidationError | undefined>(
    () =>
      Object.keys(time).length > 0
        ? validateTime(timeObjectToDate(time))
        : undefined,
    [time, validateTime, timeObjectToDate]
  );

  useLayoutEffect(() => {
    onErrorStatus?.(validationError);
  }, [validationError, onErrorStatus]);

  return {
    isValidationError: !!validationError
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

export const useFocus = ({ timePartsElRef }: UseFocusProps) => {
  const focusPrevTimePart = useCallback(
    (currentTimePartEl: HTMLElement): boolean => {
      const currentIndex = timePartsElRef.current.indexOf(currentTimePartEl);
      const prevIndex = currentIndex - 1;
      if (prevIndex >= 0) {
        const prevTimePartEl = timePartsElRef.current[prevIndex];
        prevTimePartEl.focus();
        return true;
      }
      return false;
    },
    [timePartsElRef]
  );

  const focusNextTimePart = useCallback(
    (currentTimePartEl: HTMLElement): boolean => {
      const currentIndex = timePartsElRef.current.indexOf(currentTimePartEl);
      const nextIndex = currentIndex + 1;
      if (nextIndex < timePartsElRef.current.length) {
        const nextTimePartEl = timePartsElRef.current[nextIndex];
        nextTimePartEl.focus();
        return true;
      }
      return false;
    },
    [timePartsElRef]
  );

  const focusNextTimePartOrBlur = (currentTimePartEl: HTMLElement) => {
    const focused = focusNextTimePart(currentTimePartEl);
    if (!focused) {
      currentTimePartEl.blur();
    }
  };

  useEffect(() => {
    const timePartsEl = timePartsElRef.current;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        focusPrevTimePart(event.currentTarget as HTMLElement);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        focusNextTimePart(event.currentTarget as HTMLElement);
      }
    };

    timePartsEl.forEach((timePartEl) => {
      timePartEl.addEventListener('keydown', handleKeyDown);
    });
    return () => {
      timePartsEl.forEach((timePartEl) => {
        timePartEl.removeEventListener('keydown', handleKeyDown);
      });
    };
  }, [timePartsElRef, focusPrevTimePart, focusNextTimePart]);

  return {
    focusNextTimePartOrBlur
  };
};

export const useInput = ({
  localeHourValues,
  localeSecondValues,
  localeMinuteValues,
  localeDayPeriodValues,
  handleTimeChange,
  focusNextTimePartOrBlur
}: UseInputProps) => {
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
  }, [is2DigitHour, localeHourValues]);
  const localeMinuteValuesNumeric = useMemo(() => {
    if (!is2DigitMinute) return localeMinuteValues;
    const ZERO = localeMinuteValues[0][0];
    return localeMinuteValues.map((minute) =>
      minute[0] === ZERO ? minute.slice(1) : minute
    );
  }, [is2DigitMinute, localeMinuteValues]);
  const localeSecondValuesNumeric = useMemo(() => {
    if (!is2DigitSecond) return localeSecondValues;
    const ZERO = localeSecondValues[0][0];
    return localeSecondValues.map((second) =>
      second[0] === ZERO ? second.slice(1) : second
    );
  }, [is2DigitSecond, localeSecondValues]);

  const handleInputChange =
    (type: KeyTimePartType) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      if (value === undefined || value === null) return;
      switch (type) {
        case 'hour': {
          const newValue = value.slice(-2);
          const candidatesIdx = localeHourValuesNumeric.reduce(
            (acc, hour, idx) =>
              hour.startsWith(newValue) ? [...acc, idx] : acc,
            [] as number[]
          );
          if (candidatesIdx.length === 1) {
            handleTimeChange({ hour: localeHourValues[candidatesIdx[0]] });
            focusNextTimePartOrBlur(e.currentTarget);
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
          const newValue = value.slice(-2);
          const candidatesIdx = localeMinuteValuesNumeric.reduce(
            (acc, minute, idx) =>
              minute.startsWith(newValue) ? [...acc, idx] : acc,
            [] as number[]
          );
          if (candidatesIdx.length === 1) {
            handleTimeChange({ minute: localeMinuteValues[candidatesIdx[0]] });
            focusNextTimePartOrBlur(e.currentTarget);
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
          const newValue = value.slice(-2);
          const candidatesIdx = localeSecondValuesNumeric.reduce(
            (acc, second, idx) =>
              second.startsWith(newValue) ? [...acc, idx] : acc,
            [] as number[]
          );
          if (candidatesIdx.length === 1) {
            handleTimeChange({ second: localeSecondValues[candidatesIdx[0]] });
            focusNextTimePartOrBlur(e.currentTarget);
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
            focusNextTimePartOrBlur(e.currentTarget);
          } else if (candidates.length > 1) {
            handleTimeChange({ dayPeriod: candidates[0] });
          }
          return;
        }
      }
    };

  return {
    handleInputChange
  };
};
