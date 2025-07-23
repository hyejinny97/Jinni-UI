import { useState } from 'react';
import { CalendarProps } from './Calendar';

export const useSelectedDate = ({
  defaultValue,
  value,
  onChange
}: Pick<CalendarProps, 'defaultValue' | 'value' | 'onChange'>) => {
  const isControlled = value !== undefined;
  const [uncontrolledDate, setUncontrolledDate] = useState<Date | undefined>(
    defaultValue
  );

  const handleChange = (newSelectedDate: Date) => {
    if (!isControlled) setUncontrolledDate(newSelectedDate);
    if (onChange) onChange(newSelectedDate);
  };

  return {
    selectedDate: isControlled ? value : uncontrolledDate,
    handleChange
  };
};
