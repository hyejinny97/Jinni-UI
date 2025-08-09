import { useState, useMemo, useLayoutEffect, useRef } from 'react';
import { DateTimeRangeFieldProps } from './DateTimeRangeField';
import {
  RangeType,
  DateTimeRangeValidationError
} from './DateTimeRangeField.types';
import {
  DateTimeValidationError,
  filterTimeOptions,
  filterDateOptions
} from '@/components/data-entry/DateTimeField';
import { getBaseCalendarType } from '@/components/data-entry/Calendar';
import {
  CHRONOLOGICAL_ORDER,
  INCLUDE_DISABLED_DATE
} from './DateTimeRangeField.constants';
import { DEFAULT_TIME_OPTIONS } from '@/components/data-entry/TimeField';

const INIT_DEFAULT_VALUE = { start: null, end: null };

const useDateTimeRangeValidationError = ({
  locale,
  options,
  disabledDates
}: Pick<DateTimeRangeFieldProps, 'locale' | 'options' | 'disabledDates'>) => {
  const timePartTypes = useMemo(() => {
    const timeOptions = filterTimeOptions(options);
    const noTimePartOptions =
      timeOptions === undefined || Object.keys(timeOptions).length === 0;
    const dateTimeFormat = new Intl.DateTimeFormat(
      locale,
      noTimePartOptions ? DEFAULT_TIME_OPTIONS : timeOptions
    );
    const partTypes = dateTimeFormat.formatToParts().map((part) => part.type);
    const partTypeSet = new Set<keyof Intl.DateTimeFormatPartTypesRegistry>();
    partTypes.forEach((type) => partTypeSet.add(type));
    return partTypeSet;
  }, [locale, options]);
  const baseCalendarType = useMemo(
    () => getBaseCalendarType({ locale, options: filterDateOptions(options) }),
    [locale, options]
  );

  const timeToSeconds = (time: Date) => {
    let seconds = 0;
    if (timePartTypes.has('hour')) {
      seconds += time.getHours() * 3600;
    }
    if (timePartTypes.has('minute')) {
      seconds += time.getMinutes() * 60;
    }
    if (timePartTypes.has('second')) {
      seconds += time.getSeconds();
    }
    return seconds;
  };

  const compareDate = ({
    baseDate,
    targetDate
  }: {
    baseDate: Date;
    targetDate: Date;
  }): 'lower' | 'higher' | 'same' => {
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
      if (baseDateParts[i] > targetDateParts[i]) return 'lower';
      if (baseDateParts[i] < targetDateParts[i]) return 'higher';
    }
    return 'same';
  };

  const isLowerThan = ({
    baseDateTime,
    targetDateTime
  }: {
    baseDateTime: Date;
    targetDateTime: Date;
  }): boolean => {
    switch (
      compareDate({ baseDate: baseDateTime, targetDate: targetDateTime })
    ) {
      case 'higher':
        return false;
      case 'lower':
        return true;
      case 'same':
        return timeToSeconds(baseDateTime) > timeToSeconds(targetDateTime);
    }
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
        baseDateTime: targetDate,
        targetDateTime: startDate
      }) &&
      isLowerThan({
        baseDateTime: endDate,
        targetDateTime: targetDate
      })
    );
  };

  const isChronologicalOrderError = ({
    startDateTime,
    endDateTime
  }: {
    startDateTime: Date | null | undefined;
    endDateTime: Date | null | undefined;
  }): boolean => {
    if (!startDateTime || !endDateTime) return false;
    return isLowerThan({
      baseDateTime: startDateTime,
      targetDateTime: endDateTime
    });
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

export const useDateTimeRangeValue = ({
  defaultValue,
  value,
  onChange,
  locale,
  options,
  disabledDates
}: Pick<
  DateTimeRangeFieldProps,
  'defaultValue' | 'value' | 'onChange' | 'locale' | 'options' | 'disabledDates'
>) => {
  const isControlled = value !== undefined;
  const [uncontrolledDateTimeRange, setUncontrolledDateTimeRange] = useState<
    RangeType<Date | null>
  >({ ...INIT_DEFAULT_VALUE, ...defaultValue });
  const dateTimeRangeValue = isControlled ? value : uncontrolledDateTimeRange;
  const [dateTimeRangeValidationError, setDateTimeRangeValidationError] =
    useState<DateTimeRangeValidationError>({});
  const { isChronologicalOrderError, includeDisabledDate } =
    useDateTimeRangeValidationError({
      locale,
      options,
      disabledDates
    });

  const handleValidationError = (
    dateTimeFieldPosition: keyof RangeType<any>,
    validationError?: DateTimeValidationError
  ) => {
    setDateTimeRangeValidationError((prev) => ({
      ...prev,
      [dateTimeFieldPosition]: validationError
    }));
  };

  const handleChange =
    (dateTimeFieldPosition: keyof RangeType<any>) =>
    (newValue: Date, validationError?: DateTimeValidationError) => {
      const startDateTime =
        dateTimeFieldPosition === 'start' ? newValue : dateTimeRangeValue.start;
      const endDateTime =
        dateTimeFieldPosition === 'end' ? newValue : dateTimeRangeValue.end;
      const newDateTimeRangeValidationError: DateTimeRangeValidationError = {
        ...dateTimeRangeValidationError,
        [dateTimeFieldPosition]: validationError,
        [CHRONOLOGICAL_ORDER]: isChronologicalOrderError({
          startDateTime,
          endDateTime
        }),
        [INCLUDE_DISABLED_DATE]: includeDisabledDate({
          startDate: startDateTime,
          endDate: endDateTime
        })
      };

      const newDateTimeRangeValue = {
        ...dateTimeRangeValue,
        [dateTimeFieldPosition]: newValue
      };
      if (!isControlled) setUncontrolledDateTimeRange(newDateTimeRangeValue);
      if (onChange)
        onChange(newDateTimeRangeValue, newDateTimeRangeValidationError);
    };

  useLayoutEffect(() => {
    const startDateTime = dateTimeRangeValue.start;
    const endDateTime = dateTimeRangeValue.end;
    setDateTimeRangeValidationError((prev) => ({
      ...prev,
      [CHRONOLOGICAL_ORDER]: isChronologicalOrderError({
        startDateTime,
        endDateTime
      }),
      [INCLUDE_DISABLED_DATE]: includeDisabledDate({
        startDate: startDateTime,
        endDate: endDateTime
      })
    }));
  }, [dateTimeRangeValue]);

  return {
    dateTimeRangeValue,
    handleChange,
    dateTimeRangeValidationError,
    handleValidationError
  };
};

export const useIndicator = ({
  focusedDateTime
}: Pick<DateTimeRangeFieldProps, 'focusedDateTime'>) => {
  const indicatorElRef = useRef<HTMLDivElement>(null);
  const startDateTimeFieldElRef = useRef<HTMLElement>(null);
  const endDateTimeFieldElRef = useRef<HTMLElement>(null);

  const setIndicatorLeftAndWidth = (
    focusedDate: Required<DateTimeRangeFieldProps['focusedDateTime']>
  ) => {
    const indicatorEl = indicatorElRef.current;
    const startDateFieldEl = startDateTimeFieldElRef.current;
    const endDateFieldEl = endDateTimeFieldElRef.current;
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
    if (!focusedDateTime) return;
    setIndicatorLeftAndWidth(focusedDateTime);
  }, [focusedDateTime]);

  return {
    indicatorElRef,
    startDateTimeFieldElRef,
    endDateTimeFieldElRef
  };
};

export const useFocus = ({
  focused
}: Pick<DateTimeRangeFieldProps, 'focused'>) => {
  const [uncontrolledFocused, setUncontrolledFocused] =
    useState<boolean>(false);

  return {
    isFocused: focused || uncontrolledFocused,
    focus: () => setUncontrolledFocused(true),
    blur: () => setUncontrolledFocused(false)
  };
};
