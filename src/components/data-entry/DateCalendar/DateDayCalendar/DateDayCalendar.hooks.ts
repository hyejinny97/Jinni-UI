import { useState } from 'react';
import { DateDayCalendarProps } from './DateDayCalendar';

type UseDateValueProps = Pick<
  DateDayCalendarProps,
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

  const changeDay = (newValue: Date) => {
    if (!isControlled) setUncontrolledSelectedDate(newValue);
    if (onChange) onChange(newValue);
  };

  return {
    selectedDate,
    displayedDate,
    changeDay
  };
};
