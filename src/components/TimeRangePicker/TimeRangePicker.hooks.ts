import { useState } from 'react';
import { TimeRangePickerProps } from './TimeRangePicker';
import { RangeType, RangeFieldType } from '@/types/time-component';
import { useIsControlled } from '@/hooks/useIsControlled';

type UseTimeRangeValueProps = Pick<
  TimeRangePickerProps,
  'defaultValue' | 'value' | 'onChange'
>;

const INIT_DEFAULT_VALUE = { start: null, end: null };

export const useTimeRangeValue = ({
  defaultValue,
  value,
  onChange
}: UseTimeRangeValueProps) => {
  const isControlled = useIsControlled(value);
  const [uncontrolledTimeRange, setUncontrolledTimeRange] = useState<
    RangeType<Date | null>
  >(defaultValue || INIT_DEFAULT_VALUE);
  const timeRangeValue: RangeType<Date | null> = isControlled
    ? value
    : uncontrolledTimeRange;

  const handleTimeRangeChange = (newValue: RangeType<Date | null>) => {
    if (!isControlled) setUncontrolledTimeRange(newValue);
    if (onChange) onChange(newValue);
  };

  const handleTimeChange =
    (rangeField: RangeFieldType) => (newValue: Date | null) => {
      handleTimeRangeChange({
        start: rangeField === 'start' ? newValue : timeRangeValue.start,
        end: rangeField === 'end' ? newValue : timeRangeValue.end
      });
    };

  return {
    timeRangeValue,
    handleTimeRangeChange,
    handleTimeChange
  };
};
