import { useState, useLayoutEffect, useRef, useMemo, useCallback } from 'react';
import { DateRangeFieldProps } from './DateRangeField';
import {
  RangeFieldType,
  RangeType,
  DateRangeValidationError,
  DateValidationError
} from '@/types/date-component';
import {
  CHRONOLOGICAL_ORDER,
  INCLUDE_DISABLED_DATE
} from '@/constants/date-component';
import { SECOND } from '@/constants/time';

type UseDateRangeValueProps = Pick<
  DateRangeFieldProps,
  'defaultValue' | 'value' | 'onChange'
>;

type UseValidationProps = Pick<
  DateRangeFieldProps,
  'locale' | 'options' | 'disabledDates'
> & {
  dateRangeValue: RangeType<Date | null>;
};

const INIT_DEFAULT_VALUE = { start: null, end: null };

export const useDateRangeValue = ({
  defaultValue,
  value,
  onChange
}: UseDateRangeValueProps) => {
  const isControlled = value !== undefined;
  const [uncontrolledDateRange, setUncontrolledDateRange] = useState<
    RangeType<Date | null>
  >(defaultValue || INIT_DEFAULT_VALUE);
  const dateRangeValue: RangeType<Date | null> = isControlled
    ? value
    : uncontrolledDateRange;

  const handleChange =
    (rangeField: RangeFieldType) => (newValue: Date | null) => {
      const newDateRange = {
        start: rangeField === 'start' ? newValue : dateRangeValue.start,
        end: rangeField === 'end' ? newValue : dateRangeValue.end
      };
      if (!isControlled) setUncontrolledDateRange(newDateRange);
      if (onChange) onChange(newDateRange);
    };

  return {
    dateRangeValue,
    handleChange
  };
};

export const useValidation = ({
  locale,
  options,
  disabledDates,
  dateRangeValue
}: UseValidationProps) => {
  const [validationError, setValidationError] =
    useState<DateRangeValidationError>({});
  const { chronologicalOrder, includeDisabledDate } = validationError;

  const datePartTypes = useMemo(() => {
    const dateTimeFormat = new Intl.DateTimeFormat(locale, options);
    const partTypes = dateTimeFormat.formatToParts().map((part) => part.type);
    const partTypeSet = new Set<keyof Intl.DateTimeFormatPartTypesRegistry>(
      partTypes
    );
    return partTypeSet;
  }, [locale, options]);

  const dateToSeconds = useCallback(
    (date: Date): number => {
      const dateObj = new Date(date);
      if (datePartTypes.has('day')) {
        dateObj.setHours(0, 0, 0, 0);
      } else if (datePartTypes.has('month')) {
        dateObj.setDate(1);
        dateObj.setHours(0, 0, 0, 0);
      } else if (datePartTypes.has('year')) {
        dateObj.setMonth(0);
        dateObj.setDate(1);
        dateObj.setHours(0, 0, 0, 0);
      }
      return dateObj.getTime() / SECOND;
    },
    [datePartTypes]
  );

  useLayoutEffect(() => {
    const { start, end } = dateRangeValue;
    const newChronologicalError: boolean = !!(
      start &&
      end &&
      dateToSeconds(start) > dateToSeconds(end)
    );
    if (chronologicalOrder !== newChronologicalError) {
      setValidationError((prev) => ({
        ...prev,
        [CHRONOLOGICAL_ORDER]: newChronologicalError
      }));
    }
  }, [dateRangeValue, chronologicalOrder, dateToSeconds]);

  useLayoutEffect(() => {
    const { start, end } = dateRangeValue;
    const newIncludeDisabledDateError: boolean = !!(
      start &&
      end &&
      disabledDates &&
      disabledDates.some(
        (disabledDate) =>
          dateToSeconds(start) < dateToSeconds(disabledDate) &&
          dateToSeconds(disabledDate) < dateToSeconds(end)
      )
    );
    if (includeDisabledDate !== newIncludeDisabledDateError) {
      setValidationError((prev) => ({
        ...prev,
        [INCLUDE_DISABLED_DATE]: newIncludeDisabledDateError
      }));
    }
  }, [disabledDates, dateRangeValue, includeDisabledDate, dateToSeconds]);

  const onStartFieldErrorStatus = useCallback(
    (error: boolean, errorReason?: DateValidationError) => {
      setValidationError((prev) => ({
        ...prev,
        start: error ? errorReason : undefined
      }));
    },
    []
  );

  const onEndFieldErrorStatus = useCallback(
    (error: boolean, errorReason?: DateValidationError) => {
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
      validationError.start ||
      validationError.end
    ),
    onStartFieldErrorStatus,
    onEndFieldErrorStatus
  };
};

export const useIndicator = ({
  focusedField
}: Pick<DateRangeFieldProps, 'focusedField'>) => {
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
