import { useState } from 'react';
import { DatePickerProps } from './DatePicker';
import { ValidationError } from '@/components/data-entry/DateField';

export const useDateValue = ({
  defaultValue,
  value,
  onChange
}: Pick<DatePickerProps, 'defaultValue' | 'value' | 'onChange'>) => {
  const isControlled = value !== undefined;
  const [uncontrolledDate, setUncontrolledDate] = useState<Date | null>(
    defaultValue || null
  );

  const handleChange = (newValue: Date, validationError?: ValidationError) => {
    if (!isControlled) setUncontrolledDate(newValue);
    if (onChange) onChange(newValue, validationError);
  };

  return {
    dateValue: isControlled ? value : uncontrolledDate,
    handleChange
  };
};
