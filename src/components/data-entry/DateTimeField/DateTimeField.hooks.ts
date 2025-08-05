import { useState } from 'react';
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

  const handleDateChange = (
    newValue: Date,
    validationError?: DateValidationError
  ) => {
    const newDate =
      dateTimeValue === null ? initDate(new Date()) : new Date(dateTimeValue);
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
      dateTimeValue === null ? initDate(new Date()) : new Date(dateTimeValue);
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
