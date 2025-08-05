import { useState } from 'react';
import { DateTimePickerProps } from './DateTimePicker';
import { DateTimeValidationError } from '@/components/data-entry/DateTimeField';

export const useDateTimeValue = ({
  defaultValue,
  value,
  onChange
}: Pick<DateTimePickerProps, 'defaultValue' | 'value' | 'onChange'>) => {
  const isControlled = value !== undefined;
  const [uncontrolledDateTime, setUncontrolledDateTime] = useState<Date | null>(
    defaultValue || null
  );
  const dateTimeValue = isControlled ? value : uncontrolledDateTime;

  const initDate = (date: Date) => {
    const newDate = new Date(date);
    newDate.setMonth(0);
    newDate.setDate(1);
    newDate.setHours(0);
    newDate.setMinutes(0);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    return newDate;
  };

  const handleDateTimeChange = (
    newValue: Date | null,
    validationError?: DateTimeValidationError
  ) => {
    if (!isControlled) setUncontrolledDateTime(newValue);
    if (onChange) onChange(newValue, validationError);
  };

  const handleDateChange = (newValue: Date) => {
    const newDate =
      dateTimeValue === null ? initDate(new Date()) : new Date(dateTimeValue);
    newDate.setFullYear(newValue.getFullYear());
    newDate.setMonth(newValue.getMonth());
    newDate.setDate(newValue.getDate());
    handleDateTimeChange(newDate);
  };

  const handleTimeChange = (newValue: Date) => {
    const newTime =
      dateTimeValue === null ? initDate(new Date()) : new Date(dateTimeValue);
    newTime.setHours(newValue.getHours());
    newTime.setMinutes(newValue.getMinutes());
    newTime.setSeconds(newValue.getSeconds());
    handleDateTimeChange(newTime);
  };

  return {
    dateTimeValue,
    handleDateTimeChange,
    handleDateChange,
    handleTimeChange
  };
};
