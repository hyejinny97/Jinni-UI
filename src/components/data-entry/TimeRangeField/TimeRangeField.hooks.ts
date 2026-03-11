import { useState, useMemo, useLayoutEffect, useRef, useCallback } from 'react';
import { TimeRangeFieldProps } from './TimeRangeField';
import {
  RangeType,
  TimeRangeValidationError,
  TimeValidationError,
  RangeFieldType
} from '@/types/time-component';
import { CHRONOLOGICAL_ORDER } from '@/constants/time-component';

type UseTimeRangeValueProps = Pick<
  TimeRangeFieldProps,
  'defaultValue' | 'value' | 'onChange'
>;

type UseValidationProps = Pick<TimeRangeFieldProps, 'locale' | 'options'> & {
  timeRangeValue: RangeType<Date | null>;
};

const INIT_DEFAULT_VALUE = { start: null, end: null };

export const useTimeRangeValue = ({
  defaultValue,
  value,
  onChange
}: UseTimeRangeValueProps) => {
  const isControlled = value !== undefined;
  const [uncontrolledTimeRange, setUncontrolledTimeRange] = useState<
    RangeType<Date | null>
  >(defaultValue || INIT_DEFAULT_VALUE);
  const timeRangeValue: RangeType<Date | null> = isControlled
    ? value
    : uncontrolledTimeRange;

  const handleChange =
    (rangeField: RangeFieldType) => (newValue: Date | null) => {
      const newTimeRange = {
        start: rangeField === 'start' ? newValue : timeRangeValue.start,
        end: rangeField === 'end' ? newValue : timeRangeValue.end
      };
      if (!isControlled) setUncontrolledTimeRange(newTimeRange);
      if (onChange) onChange(newTimeRange);
    };

  return {
    timeRangeValue,
    handleChange
  };
};

export const useValidation = ({
  locale,
  options,
  timeRangeValue
}: UseValidationProps) => {
  const [validationError, setValidationError] =
    useState<TimeRangeValidationError>({});
  const { chronologicalOrder } = validationError;

  const timePartTypes = useMemo(() => {
    const dateTimeFormat = new Intl.DateTimeFormat(locale, options);
    const partTypes = dateTimeFormat.formatToParts().map((part) => part.type);
    const partTypeSet = new Set<keyof Intl.DateTimeFormatPartTypesRegistry>(
      partTypes
    );
    return partTypeSet;
  }, [locale, options]);

  const timeToSeconds = useCallback(
    (time: Date) => {
      let timeInSeconds = 0;
      if (timePartTypes.has('hour')) {
        timeInSeconds += time.getHours() * 3600;
      }
      if (timePartTypes.has('minute')) {
        timeInSeconds += time.getMinutes() * 60;
      }
      if (timePartTypes.has('second')) {
        timeInSeconds += time.getSeconds();
      }
      return timeInSeconds;
    },
    [timePartTypes]
  );

  useLayoutEffect(() => {
    const { start, end } = timeRangeValue;
    const newChronologicalError: boolean = !!(
      start &&
      end &&
      timeToSeconds(start) > timeToSeconds(end)
    );
    if (chronologicalOrder !== newChronologicalError) {
      setValidationError((prev) => ({
        ...prev,
        [CHRONOLOGICAL_ORDER]: newChronologicalError
      }));
    }
  }, [timeRangeValue, chronologicalOrder, timeToSeconds]);

  const onStartFieldErrorStatus = useCallback(
    (error: boolean, errorReason?: TimeValidationError) => {
      setValidationError((prev) => ({
        ...prev,
        start: error ? errorReason : undefined
      }));
    },
    []
  );

  const onEndFieldErrorStatus = useCallback(
    (error: boolean, errorReason?: TimeValidationError) => {
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
      validationError.start ||
      validationError.end
    ),
    onStartFieldErrorStatus,
    onEndFieldErrorStatus
  };
};

export const useIndicator = ({
  focusedField
}: Pick<TimeRangeFieldProps, 'focusedField'>) => {
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
