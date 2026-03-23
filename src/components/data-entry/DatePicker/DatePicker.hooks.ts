import { useState } from 'react';
import { DatePickerProps } from './DatePicker';

export const useDateValue = ({
  defaultValue,
  value,
  onChange
}: Pick<DatePickerProps, 'defaultValue' | 'value' | 'onChange'>) => {
  const isControlled = value !== undefined;
  const [uncontrolledDate, setUncontrolledDate] = useState<Date | null>(
    defaultValue || null
  );
  const selectedDate = isControlled ? value : uncontrolledDate;

  const onSelectDate = (newValue: Date) => {
    if (!isControlled) setUncontrolledDate(newValue);
    if (onChange) onChange(newValue);
  };

  return {
    selectedDate,
    onSelectDate
  };
};
