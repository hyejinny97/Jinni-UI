import { useState } from 'react';
import { DateRangeCalendarProps } from './DateRangeCalendar';
import { RangeType } from '@/components/data-entry/DateRangeField';
import {
  useDateRangeValidationError,
  INCLUDE_DISABLED_DATE
} from '@/components/data-entry/DateRangeField';

const INIT_DEFAULT_VALUE = { start: null, end: null };

export const useSelectedDateRange = ({
  defaultValue,
  value,
  onChange,
  locale,
  options,
  disabledDates
}: Pick<
  DateRangeCalendarProps,
  'defaultValue' | 'value' | 'onChange' | 'locale' | 'options' | 'disabledDates'
>) => {
  const isControlled = value !== undefined;
  const [uncontrolledDateRange, setUncontrolledDateRange] = useState<
    RangeType<Date | null>
  >({ ...INIT_DEFAULT_VALUE, ...defaultValue });
  const dateRange = isControlled ? value : uncontrolledDateRange;
  const { includeDisabledDate } = useDateRangeValidationError({
    locale,
    options,
    disabledDates
  });

  const handleChange = (newValue: RangeType<Date | null>) => {
    if (!isControlled) setUncontrolledDateRange(newValue);
    if (onChange)
      onChange(newValue, {
        [INCLUDE_DISABLED_DATE]: includeDisabledDate({
          startDate: newValue.start,
          endDate: newValue.end
        })
      });
  };

  return {
    selectedDateRange: dateRange,
    handleChange
  };
};
