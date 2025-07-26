import { useState, useMemo, useLayoutEffect, useRef } from 'react';
import { DateRangeFieldProps } from './DateRangeField';
import { ValidationError } from '@/components/data-entry/DateField';
import { getBaseCalendarType } from '@/components/data-entry/Calendar';
import { RangeType, DateRangeValidationError } from './DateRangeField.types';
import {
  CHRONOLOGICAL_ORDER,
  INCLUDE_DISABLED_DATE
} from './DateRangeField.constants';

const INIT_DEFAULT_VALUE = { start: null, end: null };

const useDateRangeValidationError = ({
  locale,
  options,
  disabledDates
}: Pick<DateRangeFieldProps, 'locale' | 'options' | 'disabledDates'>) => {
  const baseCalendarType = useMemo(
    () => getBaseCalendarType({ locale, options }),
    [locale, options]
  );

  const isLowerThan = ({
    baseDate,
    targetDate,
    inclusive = false
  }: {
    baseDate: Date;
    targetDate: Date;
    inclusive?: boolean;
  }): boolean => {
    const baseDateParts = [
      baseDate.getFullYear(),
      baseDate.getMonth(),
      baseDate.getDate()
    ];
    const targetDateParts = [
      targetDate.getFullYear(),
      targetDate.getMonth(),
      targetDate.getDate()
    ];

    let compareLength: number = 0;
    switch (baseCalendarType) {
      case 'year':
        compareLength = 1;
        break;
      case 'month':
        compareLength = 2;
        break;
      case 'day':
        compareLength = 3;
        break;
    }

    for (let i = 0; i < compareLength; i++) {
      if (baseDateParts[i] > targetDateParts[i]) return true;
      if (baseDateParts[i] < targetDateParts[i]) return false;
    }
    return inclusive;
  };

  const includeDate = ({
    startDate,
    endDate,
    targetDate
  }: {
    startDate: Date;
    endDate: Date;
    targetDate: Date;
  }) => {
    return (
      isLowerThan({
        baseDate: targetDate,
        targetDate: startDate
      }) &&
      isLowerThan({
        baseDate: endDate,
        targetDate: targetDate
      })
    );
  };

  const isChronologicalOrderError = ({
    startDate,
    endDate
  }: {
    startDate: Date | null | undefined;
    endDate: Date | null | undefined;
  }): boolean => {
    if (!startDate || !endDate) return false;
    return isLowerThan({ baseDate: startDate, targetDate: endDate });
  };

  const includeDisabledDate = ({
    startDate,
    endDate
  }: {
    startDate: Date | null | undefined;
    endDate: Date | null | undefined;
  }): boolean => {
    if (!startDate || !endDate || !disabledDates || disabledDates.length === 0)
      return false;
    return disabledDates.some((disabledDate) =>
      includeDate({ startDate, endDate, targetDate: disabledDate })
    );
  };

  return {
    isChronologicalOrderError,
    includeDisabledDate
  };
};

export const useDateRange = ({
  defaultValue,
  value,
  onChange,
  locale,
  options,
  disabledDates
}: Pick<
  DateRangeFieldProps,
  'defaultValue' | 'value' | 'onChange' | 'locale' | 'options' | 'disabledDates'
>) => {
  const isControlled = value !== undefined;
  const [uncontrolledDateRange, setUncontrolledDateRange] = useState<
    Required<RangeType<Date | null>>
  >({ ...INIT_DEFAULT_VALUE, ...defaultValue });
  const dateRange = isControlled ? value : uncontrolledDateRange;
  const [dateRangeValidationError, setDateRangeValidationError] =
    useState<DateRangeValidationError>({});
  const { isChronologicalOrderError, includeDisabledDate } =
    useDateRangeValidationError({
      locale,
      options,
      disabledDates
    });

  const handleValidationError = (
    dateFieldPosition: keyof RangeType<any>,
    validationError?: ValidationError
  ) => {
    setDateRangeValidationError((prev) => ({
      ...prev,
      [dateFieldPosition]: validationError
    }));
  };

  const handleChange =
    (dateFieldPosition: keyof RangeType<any>) =>
    (newValue: Date, validationError?: ValidationError) => {
      const startDate =
        dateFieldPosition === 'start' ? newValue : dateRange.start;
      const endDate = dateFieldPosition === 'end' ? newValue : dateRange.end;
      const newDateRangeValidationError: DateRangeValidationError = {
        ...dateRangeValidationError,
        [dateFieldPosition]: validationError,
        [CHRONOLOGICAL_ORDER]: isChronologicalOrderError({
          startDate,
          endDate
        }),
        [INCLUDE_DISABLED_DATE]: includeDisabledDate({ startDate, endDate })
      };

      const newDateRange = {
        ...dateRange,
        [dateFieldPosition]: newValue
      };
      if (!isControlled) setUncontrolledDateRange(newDateRange);
      if (onChange) onChange(newDateRange, newDateRangeValidationError);
    };

  useLayoutEffect(() => {
    const startDate = dateRange.start;
    const endDate = dateRange.end;
    setDateRangeValidationError((prev) => ({
      ...prev,
      [CHRONOLOGICAL_ORDER]: isChronologicalOrderError({
        startDate,
        endDate
      }),
      [INCLUDE_DISABLED_DATE]: includeDisabledDate({ startDate, endDate })
    }));
  }, [dateRange]);

  return {
    dateRange: isControlled ? value : uncontrolledDateRange,
    handleChange,
    dateRangeValidationError,
    handleValidationError
  };
};

export const useIndicator = ({
  focusedDate
}: Pick<DateRangeFieldProps, 'focusedDate'>) => {
  const indicatorElRef = useRef<HTMLDivElement>(null);
  const startDateFieldElRef = useRef<HTMLElement>(null);
  const endDateFieldElRef = useRef<HTMLElement>(null);

  const setIndicatorLeftAndWidth = (
    focusedDate: Required<DateRangeFieldProps['focusedDate']>
  ) => {
    const indicatorEl = indicatorElRef.current;
    const startDateFieldEl = startDateFieldElRef.current;
    const endDateFieldEl = endDateFieldElRef.current;
    if (!indicatorEl || !startDateFieldEl || !endDateFieldEl) return;

    const focusedDateFieldEl =
      focusedDate === 'start' ? startDateFieldEl : endDateFieldEl;
    const inputBaseContentEl = focusedDateFieldEl.querySelector(
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
  };

  useLayoutEffect(() => {
    if (!focusedDate) return;
    setIndicatorLeftAndWidth(focusedDate);
  }, [focusedDate]);

  return {
    indicatorElRef,
    startDateFieldElRef,
    endDateFieldElRef
  };
};
