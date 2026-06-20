import { useState } from 'react';
import { DateYearCalendarProps } from './DateYearCalendar';
import { useIsControlled } from '@/hooks/useIsControlled';

type UseDateValueProps = Pick<
  DateYearCalendarProps,
  'defaultValue' | 'value' | 'onChange' | 'referenceDate'
>;

export const useDateValue = ({
  defaultValue,
  value,
  onChange,
  referenceDate
}: UseDateValueProps) => {
  const isControlled = useIsControlled(value);
  const [uncontrolledSelectedDate, setUncontrolledSelectedDate] = useState<
    Date | undefined
  >(defaultValue);
  const selectedDate = isControlled ? value : uncontrolledSelectedDate;
  const todayDate = new Date();
  const displayedDate = selectedDate || referenceDate || todayDate;

  const onYearChange = (newValue: Date) => {
    if (!isControlled) setUncontrolledSelectedDate(newValue);
    if (onChange) onChange(newValue);
  };

  return {
    selectedDate,
    displayedDate,
    onYearChange
  };
};
