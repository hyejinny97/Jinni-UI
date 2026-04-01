import { useState, useCallback, useLayoutEffect } from 'react';
import { DateTimeFieldProps } from './DateTimeField';
import { TimeValidationError } from '@/types/time-component';
import { DateValidationError } from '@/types/date-component';
import { DateTimeValidationError } from '@/types/date-time-component';

type UseDateTimeValueProps = Pick<
  DateTimeFieldProps,
  'defaultValue' | 'value' | 'onChange'
>;

const INIT_DATE_TIME = new Date();
INIT_DATE_TIME.setHours(0, 0, 0, 0);

export const useDateTimeValue = ({
  defaultValue,
  value,
  onChange
}: UseDateTimeValueProps) => {
  const isControlled = value !== undefined;
  const [uncontrolledDateTimeValue, setUncontrolledDateTimeValue] =
    useState<Date | null>(defaultValue || null);
  const dateTimeValue: Date | null = isControlled
    ? value
    : uncontrolledDateTimeValue;

  const handleDateChange = (newValue: Date) => {
    const newDateTime = new Date(dateTimeValue || INIT_DATE_TIME);
    newDateTime.setFullYear(newValue.getFullYear());
    newDateTime.setMonth(newValue.getMonth());
    newDateTime.setDate(newValue.getDate());
    if (!isControlled) setUncontrolledDateTimeValue(newDateTime);
    if (onChange) onChange(newDateTime);
  };

  const handleTimeChange = (newValue: Date | null) => {
    const newDateTime = new Date(dateTimeValue || INIT_DATE_TIME);
    if (newValue === null) {
      newDateTime.setHours(0, 0, 0, 0);
    } else {
      newDateTime.setHours(newValue.getHours());
      newDateTime.setMinutes(newValue.getMinutes());
      newDateTime.setSeconds(newValue.getSeconds());
    }
    if (!isControlled) setUncontrolledDateTimeValue(newDateTime);
    if (onChange) onChange(newDateTime);
  };

  return {
    dateTimeValue,
    handleDateChange,
    handleTimeChange
  };
};

export const useValidation = ({
  onErrorStatus
}: Pick<DateTimeFieldProps, 'onErrorStatus'>) => {
  const [validationError, setValidationError] =
    useState<DateTimeValidationError>({});
  const isValidationError = !!(validationError.date || validationError.time);

  const onDateFieldErrorStatus = useCallback(
    (error: boolean, errorReason?: DateValidationError) => {
      setValidationError((prev) => ({
        ...prev,
        date: error ? errorReason : undefined
      }));
    },
    []
  );

  const onTimeFieldErrorStatus = useCallback(
    (error: boolean, errorReason?: TimeValidationError) => {
      setValidationError((prev) => ({
        ...prev,
        time: error ? errorReason : undefined
      }));
    },
    []
  );

  useLayoutEffect(() => {
    onErrorStatus?.(isValidationError, validationError);
  }, [isValidationError, validationError, onErrorStatus]);

  return {
    isValidationError,
    onDateFieldErrorStatus,
    onTimeFieldErrorStatus
  };
};
