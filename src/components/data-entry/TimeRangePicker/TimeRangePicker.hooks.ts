import { useState } from 'react';
import { TimeRangePickerProps } from './TimeRangePicker';
import {
  TimeRangeValidationError,
  RangeType,
  useChronologicalError,
  CHRONOLOGICAL_ORDER
} from '@/components/data-entry/TimeRangeField';

const INIT_DEFAULT_VALUE = { start: null, end: null };

export const useTimeRange = ({
  defaultValue,
  value,
  onChange,
  locale,
  options
}: Pick<
  TimeRangePickerProps,
  'defaultValue' | 'value' | 'onChange' | 'locale' | 'options'
>) => {
  const isControlled = value !== undefined;
  const [uncontrolledTimeRange, setUncontrolledTimeRange] = useState<
    RangeType<Date | null>
  >(defaultValue || INIT_DEFAULT_VALUE);
  const [timeRangeValidationError, setTimeRangeValidationError] =
    useState<TimeRangeValidationError>({});
  const timeRange = isControlled ? value : uncontrolledTimeRange;
  const { isChronologicalOrderError } = useChronologicalError({
    locale,
    options
  });

  const handleRangeChange = (
    newValue: RangeType<Date | null>,
    validationError?: TimeRangeValidationError
  ) => {
    if (validationError) setTimeRangeValidationError(validationError);
    if (!isControlled) setUncontrolledTimeRange(newValue);
    if (onChange) onChange(newValue, validationError);
  };

  const handleTimeChange =
    (timeFieldPosition: keyof RangeType<any>) => (newValue: Date) => {
      const startTime =
        timeFieldPosition === 'start' ? newValue : timeRange.start;
      const endTime = timeFieldPosition === 'end' ? newValue : timeRange.end;
      handleRangeChange(
        { ...timeRange, [timeFieldPosition]: newValue },
        {
          ...timeRangeValidationError,
          [CHRONOLOGICAL_ORDER]: isChronologicalOrderError(startTime, endTime)
        }
      );
    };

  return {
    timeRange,
    handleRangeChange,
    handleTimeChange
  };
};
