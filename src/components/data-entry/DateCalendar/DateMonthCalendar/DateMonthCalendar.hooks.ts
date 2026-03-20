import { useState } from 'react';
import { DateMonthCalendarProps } from './DateMonthCalendar';

type UseDateValueProps = Pick<
  DateMonthCalendarProps,
  'defaultValue' | 'value' | 'onChange' | 'referenceDate'
>;

export const useDateValue = ({
  defaultValue,
  value,
  onChange,
  referenceDate
}: UseDateValueProps) => {
  const isControlled = value !== undefined;
  const [uncontrolledSelectedDate, setUncontrolledSelectedDate] = useState<
    Date | undefined
  >(defaultValue);
  const selectedDate = isControlled ? value : uncontrolledSelectedDate;
  const todayDate = new Date();
  const displayedDate = selectedDate || referenceDate || todayDate;

  const changeMonth = (newValue: Date) => {
    if (!isControlled) setUncontrolledSelectedDate(newValue);
    if (onChange) onChange(newValue);
  };

  return {
    selectedDate,
    displayedDate,
    changeMonth
  };
};
