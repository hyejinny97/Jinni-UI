import { useState } from 'react';
import { DateRangePickerProps } from './DateRangePicker';
import { RangeType } from '@/types/date-component';

type UseDateRangeValueProps = Pick<
  DateRangePickerProps,
  'defaultValue' | 'value' | 'onChange'
>;

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

  const handleDateRangeChange = (
    newValue: RangeType<Date | null>,
    selectedDate?: Date
  ) => {
    if (!isControlled) setUncontrolledDateRange(newValue);
    if (onChange) onChange(newValue, selectedDate);
  };

  return {
    dateRangeValue,
    handleDateRangeChange
  };
};
