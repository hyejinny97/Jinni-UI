import { useState } from 'react';
import { DateRangeCalendarProps } from './DateRangeCalendar';
import { RangeType } from '@/components/data-entry/DateRangeField';

const INIT_DEFAULT_VALUE = { start: null, end: null };

export const useSelectedDateRange = ({
  defaultValue,
  value,
  onChange
}: Pick<DateRangeCalendarProps, 'defaultValue' | 'value' | 'onChange'>) => {
  const isControlled = value !== undefined;
  const [uncontrolledDateRange, setUncontrolledDateRange] = useState<
    RangeType<Date | null>
  >({ ...INIT_DEFAULT_VALUE, ...defaultValue });
  const dateRange = isControlled ? value : uncontrolledDateRange;

  const handleChange = (newValue: RangeType<Date | null>) => {
    if (!isControlled) setUncontrolledDateRange(newValue);
    if (onChange) onChange(newValue);
  };

  return {
    selectedDateRange: dateRange,
    handleChange
  };
};
