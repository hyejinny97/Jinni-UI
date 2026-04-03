import { useState } from 'react';
import { DateYearRangeCalendarProps } from './DateYearRangeCalendar';
import { RangeType } from '@/types/date-component';

type UseDateValueProps = Pick<
  DateYearRangeCalendarProps,
  'defaultValue' | 'value' | 'onChange' | 'referenceDate'
>;

export const useDateValue = ({
  defaultValue,
  value,
  referenceDate,
  onChange
}: UseDateValueProps) => {
  const isControlled = value !== undefined;
  const [uncontrolledSelectedDate, setUncontrolledSelectedDate] = useState<
    RangeType<Date | null>
  >(defaultValue || { start: null, end: null });
  const selectedDate: RangeType<Date | null> = isControlled
    ? value
    : uncontrolledSelectedDate;
  const todayDate = new Date();
  const displayedDate: Date =
    selectedDate.start || selectedDate.end || referenceDate || todayDate;

  const onSelectDate = (
    newValue: RangeType<Date | null>,
    selectedDate?: Date
  ) => {
    if (!isControlled) setUncontrolledSelectedDate(newValue);
    if (onChange) onChange(newValue, selectedDate);
  };

  return {
    selectedDate,
    displayedDate,
    onSelectDate
  };
};
