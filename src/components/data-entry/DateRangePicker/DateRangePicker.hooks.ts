import { useState } from 'react';
import { DateRangePickerProps } from './DateRangePicker';
import {
  RangeType,
  DateRangeValidationError
} from '@/components/data-entry/DateRangeField';

const INIT_DEFAULT_VALUE = { start: null, end: null };

export const useDateRange = ({
  defaultValue,
  value,
  onChange
}: Pick<DateRangePickerProps, 'defaultValue' | 'value' | 'onChange'>) => {
  const isControlled = value !== undefined;
  const [uncontrolledDateRange, setUncontrolledDateRange] = useState<
    RangeType<Date | null>
  >({ ...INIT_DEFAULT_VALUE, ...defaultValue });
  const dateRange = isControlled ? value : uncontrolledDateRange;

  const handleRangeChange = (
    newValue: RangeType<Date | null>,
    validationError?: DateRangeValidationError
  ) => {
    if (!isControlled) setUncontrolledDateRange(newValue);
    if (onChange) onChange(newValue, validationError);
  };

  return {
    dateRange,
    handleRangeChange
  };
};
