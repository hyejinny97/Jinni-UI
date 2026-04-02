import { useState, useMemo, useLayoutEffect, useRef, useCallback } from 'react';
import { DateTimeRangeFieldProps } from './DateTimeRangeField';
import {
  RangeType,
  RangeFieldType,
  DateTimeValidationError,
  DateTimeRangeValidationError,
  DateTimeOptions
} from '@/types/date-time-component';
import {
  CHRONOLOGICAL_ORDER,
  INCLUDE_DISABLED_DATE
} from '@/constants/date-time-component';
import {
  DEFAULT_TIME_OPTIONS,
  KEY_TIME_PARTS
} from '@/constants/time-component';
import { SECOND } from '@/constants/time';

type UseDateTimeRangeValueProps = Pick<
  DateTimeRangeFieldProps,
  'defaultValue' | 'value' | 'onChange'
>;

type UseValidationProps = Pick<
  DateTimeRangeFieldProps,
  'locale' | 'options' | 'disabledDates'
> & {
  dateTimeRangeValue: RangeType<Date | null>;
};

const INIT_DEFAULT_VALUE = { start: null, end: null };

export const useDateTimeRangeValue = ({
  defaultValue,
  value,
  onChange
}: UseDateTimeRangeValueProps) => {
  const isControlled = value !== undefined;
  const [uncontrolledDateTimeRange, setUncontrolledDateTimeRange] = useState<
    RangeType<Date | null>
  >(defaultValue || INIT_DEFAULT_VALUE);
  const dateTimeRangeValue: RangeType<Date | null> = isControlled
    ? value
    : uncontrolledDateTimeRange;

  const handleChange =
    (rangeField: RangeFieldType) => (newValue: Date | null) => {
      const newDateTimeRange = {
        start: rangeField === 'start' ? newValue : dateTimeRangeValue.start,
        end: rangeField === 'end' ? newValue : dateTimeRangeValue.end
      };
      if (!isControlled) setUncontrolledDateTimeRange(newDateTimeRange);
      if (onChange) onChange(newDateTimeRange);
    };

  return {
    dateTimeRangeValue,
    handleChange
  };
};

export const useValidation = ({
  locale,
  options,
  disabledDates,
  dateTimeRangeValue
}: UseValidationProps) => {
  const [validationError, setValidationError] =
    useState<DateTimeRangeValidationError>({});
  const { chronologicalOrder, includeDisabledDate } = validationError;

  const dateTimePartTypes = useMemo(() => {
    const TIME_OPTIONS_TYPE = [...KEY_TIME_PARTS, 'timeStyle'];
    const hasTimeOption =
      options &&
      Object.keys(options).some((option) => TIME_OPTIONS_TYPE.includes(option));
    const hasDateStyleOption =
      options && Object.keys(options).includes('dateStyle');
    let dateTimeOptions: DateTimeOptions | undefined = options;
    if (hasTimeOption) {
      if (hasDateStyleOption) {
        dateTimeOptions = { ...options, ...DEFAULT_TIME_OPTIONS };
      } else {
        dateTimeOptions = { ...options, hour: 'numeric', minute: 'numeric' };
      }
    }
    const dateTimeFormat = new Intl.DateTimeFormat(locale, dateTimeOptions);
    const partTypes = dateTimeFormat.formatToParts().map((part) => part.type);
    const partTypeSet = new Set<keyof Intl.DateTimeFormatPartTypesRegistry>(
      partTypes
    );
    return partTypeSet;
  }, [locale, options]);

  const dateToSeconds = useCallback(
    (date: Date): number => {
      const dateObj = new Date(date);
      if (dateTimePartTypes.has('day')) {
        dateObj.setHours(0, 0, 0, 0);
      } else if (dateTimePartTypes.has('month')) {
        dateObj.setDate(1);
        dateObj.setHours(0, 0, 0, 0);
      } else if (dateTimePartTypes.has('year')) {
        dateObj.setMonth(0);
        dateObj.setDate(1);
        dateObj.setHours(0, 0, 0, 0);
      }
      return dateObj.getTime() / SECOND;
    },
    [dateTimePartTypes]
  );

  const timeToSeconds = useCallback(
    (time: Date) => {
      let timeInSeconds = 0;
      if (dateTimePartTypes.has('hour')) {
        timeInSeconds += time.getHours() * 3600;
      }
      if (dateTimePartTypes.has('minute')) {
        timeInSeconds += time.getMinutes() * 60;
      }
      if (dateTimePartTypes.has('second')) {
        timeInSeconds += time.getSeconds();
      }
      return timeInSeconds;
    },
    [dateTimePartTypes]
  );

  const dateTimeToSeconds = useCallback(
    (dateTime: Date): number => {
      return dateToSeconds(dateTime) + timeToSeconds(dateTime);
    },
    [dateToSeconds, timeToSeconds]
  );

  useLayoutEffect(() => {
    const { start, end } = dateTimeRangeValue;
    const newChronologicalError: boolean = !!(
      start &&
      end &&
      dateTimeToSeconds(start) > dateTimeToSeconds(end)
    );
    if (chronologicalOrder !== newChronologicalError) {
      setValidationError((prev) => ({
        ...prev,
        [CHRONOLOGICAL_ORDER]: newChronologicalError
      }));
    }
  }, [dateTimeRangeValue, chronologicalOrder, dateTimeToSeconds]);

  useLayoutEffect(() => {
    const { start, end } = dateTimeRangeValue;
    const newIncludeDisabledDateError: boolean = !!(
      start &&
      end &&
      disabledDates &&
      disabledDates.some(
        (disabledDate) =>
          dateTimeToSeconds(start) < dateTimeToSeconds(disabledDate) &&
          dateTimeToSeconds(disabledDate) < dateTimeToSeconds(end)
      )
    );
    if (includeDisabledDate !== newIncludeDisabledDateError) {
      setValidationError((prev) => ({
        ...prev,
        [INCLUDE_DISABLED_DATE]: newIncludeDisabledDateError
      }));
    }
  }, [
    disabledDates,
    dateTimeRangeValue,
    includeDisabledDate,
    dateTimeToSeconds
  ]);

  const onStartFieldErrorStatus = useCallback(
    (error: boolean, errorReason?: DateTimeValidationError) => {
      setValidationError((prev) => ({
        ...prev,
        start: error ? errorReason : undefined
      }));
    },
    []
  );

  const onEndFieldErrorStatus = useCallback(
    (error: boolean, errorReason?: DateTimeValidationError) => {
      setValidationError((prev) => ({
        ...prev,
        end: error ? errorReason : undefined
      }));
    },
    []
  );

  return {
    isValidationError: !!(
      validationError[CHRONOLOGICAL_ORDER] ||
      validationError[INCLUDE_DISABLED_DATE] ||
      validationError.start?.date ||
      validationError.start?.time ||
      validationError.end?.date ||
      validationError.end?.time
    ),
    onStartFieldErrorStatus,
    onEndFieldErrorStatus
  };
};

export const useIndicator = ({
  focusedField
}: Pick<DateTimeRangeFieldProps, 'focusedField'>) => {
  const indicatorElRef = useRef<HTMLDivElement>(null);
  const startFieldElRef = useRef<HTMLElement>(null);
  const endFieldElRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const indicatorEl = indicatorElRef.current;
    const startFieldEl = startFieldElRef.current;
    const endFieldEl = endFieldElRef.current;
    if (!focusedField || !indicatorEl || !startFieldEl || !endFieldEl) return;

    const focusedFieldEl = focusedField === 'start' ? startFieldEl : endFieldEl;
    const inputBaseContentEl = focusedFieldEl.querySelector(
      '.JinniInputBaseContent'
    );
    if (!inputBaseContentEl) return;

    const paddingLeft = parseInt(
      window.getComputedStyle(inputBaseContentEl).paddingLeft
    );
    const paddingRight = parseInt(
      window.getComputedStyle(inputBaseContentEl).paddingRight
    );
    indicatorEl.style.left = `${(inputBaseContentEl as HTMLElement).offsetLeft + paddingLeft}px`;
    indicatorEl.style.width = `${inputBaseContentEl.clientWidth - paddingLeft - paddingRight}px`;
  }, [focusedField]);

  return {
    indicatorElRef,
    startFieldElRef,
    endFieldElRef
  };
};
