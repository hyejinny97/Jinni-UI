import { useState } from 'react';
import { TimePickerProps } from './TimePicker';
import { ValidationError } from '@/components/data-entry/TimeField';

export const useTime = ({
  defaultValue,
  value,
  onChange
}: Pick<TimePickerProps, 'defaultValue' | 'value' | 'onChange'>) => {
  const isControlled = value !== undefined;
  const [uncontrolledTime, setUncontrolledTime] = useState<Date | null>(
    defaultValue || null
  );

  const handleChange = (
    newValue: Date | null,
    validationError?: ValidationError
  ) => {
    if (!isControlled) setUncontrolledTime(newValue);
    if (onChange) onChange(newValue, validationError);
  };

  return {
    time: isControlled ? value : uncontrolledTime,
    handleChange
  };
};
