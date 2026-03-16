import { useState } from 'react';
import { DatePickerProps } from './DatePicker';
import { DateValidationError } from '@/types/date-component';

export const useDateValue = ({
  defaultValue,
  value,
  onChange
}: Pick<DatePickerProps, 'defaultValue' | 'value' | 'onChange'>) => {
  const isControlled = value !== undefined;
  const [uncontrolledDate, setUncontrolledDate] = useState<Date | null>(
    defaultValue || null
  );

  const handleChange = (
    newValue: Date,
    validationError?: DateValidationError
  ) => {
    if (!isControlled) setUncontrolledDate(newValue);
    if (onChange) onChange(newValue, validationError);
  };

  return {
    dateValue: isControlled ? value : uncontrolledDate,
    handleChange
  };
};
