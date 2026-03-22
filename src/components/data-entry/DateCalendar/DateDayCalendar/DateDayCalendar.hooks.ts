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
  const [displayedDate, setDisplayedDate] = useState<Date>(
    selectedDate || referenceDate || todayDate
  );

  const onDayChange = (newValue: Date) => {
    if (!isControlled) setUncontrolledSelectedDate(newValue);
    if (onChange) onChange(newValue);
  };
  const goToPrevMonth = () => {
    const currentMonth = displayedDate.getMonth();
    const newDate = new Date(displayedDate);
    newDate.setMonth(currentMonth - 1);
    setDisplayedDate(newDate);
  };
  const goToNextMonth = () => {
    const currentMonth = displayedDate.getMonth();
    const newDate = new Date(displayedDate);
    newDate.setMonth(currentMonth + 1);
    setDisplayedDate(newDate);
  };

  return {
    selectedDate,
    displayedDate,
    onDayChange,
    goToPrevMonth,
    goToNextMonth
  };
};
