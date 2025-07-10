import { useState, useMemo, useLayoutEffect } from 'react';
import { TimeRangeFieldProps } from './TimeRangeField';
import { RangeType, TimeRangeValidationError } from './TimeRangeField.types';
import { ValidationError } from '@/components/data-entry/TimeField';
import { CHRONOLOGICAL_ORDER } from './TimeRangeField.constants';

type IsChronologicalOrderError = (
  startTime: Date | null | undefined,
  endTime: Date | null | undefined
) => boolean;

const INIT_DEFAULT_VALUE = { start: null, end: null };

export const useTimeRange = ({
  defaultValue,
  value,
  onChange,
  locale,
  options
}: Pick<
  TimeRangeFieldProps,
  'defaultValue' | 'value' | 'onChange' | 'locale' | 'options'
>) => {
  const isControlled = value !== undefined;
  const [uncontrolledTimeRange, setUncontrolledTimeRange] = useState<
    RangeType<Date | null>
  >(defaultValue || INIT_DEFAULT_VALUE);
  const timeRange = isControlled ? value : uncontrolledTimeRange;
  const [timeRangeValidationError, setTimeRangeValidationError] =
    useState<TimeRangeValidationError>({});

  const timePartTypes = useMemo(() => {
    const dateTimeFormat = new Intl.DateTimeFormat(locale, options);
    const partTypes = dateTimeFormat.formatToParts().map((part) => part.type);
    const partTypeSet = new Set<keyof Intl.DateTimeFormatPartTypesRegistry>();
    partTypes.forEach((type) => partTypeSet.add(type));
    return partTypeSet;
  }, [locale, options]);

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

  const isChronologicalOrderError: IsChronologicalOrderError = (
    startTime,
    endTime
  ) => {
    if (!startTime || !endTime) return false;
    if (timeToSeconds(startTime) > timeToSeconds(endTime)) return true;
    return false;
  };

  const handleValidationError = (
    timeFieldPosition: keyof RangeType<any>,
    validationError?: ValidationError
  ) => {
    setTimeRangeValidationError((prev) => ({
      ...prev,
      [timeFieldPosition]: validationError
    }));
  };

  const handleChange =
    (timeFieldPosition: keyof RangeType<any>) =>
    (newValue: Date, validationError?: ValidationError) => {
      const startTime =
        timeFieldPosition === 'start' ? newValue : timeRange.start;
      const endTime = timeFieldPosition === 'end' ? newValue : timeRange.end;
      const newTimeRangeValidationError: TimeRangeValidationError = {
        ...timeRangeValidationError,
        [timeFieldPosition]: validationError,
        [CHRONOLOGICAL_ORDER]: isChronologicalOrderError(startTime, endTime)
      };
      setTimeRangeValidationError(newTimeRangeValidationError);

      const newTimeRange = {
        ...timeRange,
        [timeFieldPosition]: newValue
      };
      if (!isControlled) setUncontrolledTimeRange(newTimeRange);
      if (onChange) onChange(newTimeRange, newTimeRangeValidationError);
    };

  useLayoutEffect(() => {
    setTimeRangeValidationError((prev) => ({
      ...prev,
      [CHRONOLOGICAL_ORDER]: isChronologicalOrderError(
        timeRange.start,
        timeRange.end
      )
    }));
  }, [timeRange]);

  return {
    timeRange: isControlled ? value : uncontrolledTimeRange,
    handleChange,
    timeRangeValidationError,
    handleValidationError
  };
};
