import { useState, useMemo } from 'react';
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
  const INIT_DATE_TIME = useMemo(() => {
    const dateTime = new Date();
    dateTime.setHours(0);
    dateTime.setMinutes(0);
    dateTime.setSeconds(0);
    dateTime.setMilliseconds(0);
    return dateTime;
  }, []);

  const handleDateTimeChange = (
    newValue: Date | null,
    validationError?: DateTimeValidationError
  ) => {
    if (!isControlled) setUncontrolledDateTime(newValue);
    if (onChange) onChange(newValue, validationError);
  };

  const handleDateChange = (newValue: Date) => {
    const newDate =
      dateTimeValue === null ? INIT_DATE_TIME : new Date(dateTimeValue);
    newDate.setFullYear(newValue.getFullYear());
    newDate.setMonth(newValue.getMonth());
    newDate.setDate(newValue.getDate());
    handleDateTimeChange(newDate);
  };

  const handleTimeChange = (newValue: Date) => {
    const newTime =
      dateTimeValue === null ? INIT_DATE_TIME : new Date(dateTimeValue);
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
