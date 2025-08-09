import { useState, useMemo } from 'react';
import { DateTimeFieldProps } from './DateTimeField';
import { DateTimeValidationError } from './DateTimeField.types';
import { TimeValidationError } from '@/components/data-entry/TimeField';
import { DateValidationError } from '@/components/data-entry/DateField';

export const useDateTimeValue = ({
  defaultValue,
  value,
  onChange
}: Pick<DateTimeFieldProps, 'defaultValue' | 'value' | 'onChange'>) => {
  const isControlled = value !== undefined;
  const [uncontrolledDateTimeValue, setUncontrolledDateTimeValue] =
    useState<Date | null>(defaultValue || null);
  const [isValidationError, setIsValidationError] = useState<boolean>(false);
  const dateTimeValue = isControlled ? value : uncontrolledDateTimeValue;

  const handleValidationError = (validationError?: DateTimeValidationError) => {
    setIsValidationError(!!validationError);
  };
  const INIT_DATE_TIME = useMemo(() => {
    const dateTime = new Date();
    dateTime.setHours(0);
    dateTime.setMinutes(0);
    dateTime.setSeconds(0);
    dateTime.setMilliseconds(0);
    return dateTime;
  }, []);

  const handleDateChange = (
    newValue: Date,
    validationError?: DateValidationError
  ) => {
    const newDate =
      dateTimeValue === null ? INIT_DATE_TIME : new Date(dateTimeValue);
    newDate.setFullYear(newValue.getFullYear());
    newDate.setMonth(newValue.getMonth());
    newDate.setDate(newValue.getDate());
    if (!isControlled) setUncontrolledDateTimeValue(newDate);
    if (onChange) onChange(newDate, validationError);
    setIsValidationError(!!validationError);
  };

  const handleTimeChange = (
    newValue: Date,
    validationError?: TimeValidationError
  ) => {
    const newTime =
      dateTimeValue === null ? INIT_DATE_TIME : new Date(dateTimeValue);
    newTime.setHours(newValue.getHours());
    newTime.setMinutes(newValue.getMinutes());
    newTime.setSeconds(newValue.getSeconds());
    if (!isControlled) setUncontrolledDateTimeValue(newTime);
    if (onChange) onChange(newTime, validationError);
    setIsValidationError(!!validationError);
  };

  return {
    dateTimeValue,
    handleDateChange,
    handleTimeChange,
    isValidationError,
    handleValidationError
  };
};

export const useFocus = ({ focused }: Pick<DateTimeFieldProps, 'focused'>) => {
  const [uncontrolledFocused, setUncontrolledFocused] =
    useState<boolean>(false);

  return {
    isFocused: focused || uncontrolledFocused,
    focus: () => setUncontrolledFocused(true),
    blur: () => setUncontrolledFocused(false)
  };
};
