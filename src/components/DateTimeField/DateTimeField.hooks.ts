import { useState, useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import { DateTimeFieldProps } from './DateTimeField';
import { TimeValidationError } from '@/types/time-component';
import { DateTimeValidationError } from '@/types/date-time-component';
import { useIsControlled } from '@/hooks/useIsControlled';
import { isSameArrayElements } from './DateTimeField.utils';

type UseDateTimeValueProps = Pick<
  DateTimeFieldProps,
  'defaultValue' | 'value' | 'onChange'
>;

type UseValidationProps = Pick<
  DateTimeFieldProps,
  'onErrorStatus' | 'disabledDateTimes'
> & {
  dateTimeValue: Date | null;
};

const INIT_DATE_TIME = new Date();
INIT_DATE_TIME.setHours(0, 0, 0, 0);

export const useDateTimeValue = ({
  defaultValue,
  value,
  onChange
}: UseDateTimeValueProps) => {
  const isControlled = useIsControlled(value);
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
  dateTimeValue,
  disabledDateTimes,
  onErrorStatus
}: UseValidationProps) => {
  const prevValidationErrorRef = useRef<DateTimeValidationError[] | undefined>(
    undefined
  );
  const [timeStepError, setTimeStepError] = useState<boolean>(false);

  const onTimeFieldErrorStatus = useCallback(
    (error: boolean, errorReason?: TimeValidationError) => {
      setTimeStepError(error && errorReason === 'timeStep');
    },
    []
  );

  const isDisabled = useCallback(
    (dateTime: Date | null): boolean => {
      if (dateTime === null || !disabledDateTimes) return false;
      if (Array.isArray(disabledDateTimes)) {
        return disabledDateTimes.some(
          (disabledDateTime) =>
            disabledDateTime.getTime() === dateTime.getTime()
        );
      }
      return disabledDateTimes({ dateTime });
    },
    [disabledDateTimes]
  );

  const validationError: DateTimeValidationError[] | undefined = useMemo(() => {
    const resultSet: Set<DateTimeValidationError> = new Set();
    if (timeStepError) resultSet.add('timeStep');
    else resultSet.delete('timeStep');
    if (isDisabled(dateTimeValue)) resultSet.add('disabledDateTime');
    else resultSet.delete('disabledDateTime');

    const result: DateTimeValidationError[] | undefined =
      resultSet.size === 0 ? undefined : Array.from(resultSet);
    const prevValidationError = prevValidationErrorRef.current;
    const noDiff =
      (!result && !prevValidationError) ||
      (Array.isArray(result) &&
        Array.isArray(prevValidationError) &&
        isSameArrayElements(result, prevValidationError));

    if (noDiff) {
      return prevValidationError;
    } else {
      prevValidationErrorRef.current = result;
      return result;
    }
  }, [timeStepError, dateTimeValue, isDisabled]);
  const isValidationError = !!validationError && validationError.length > 0;

  useLayoutEffect(() => {
    onErrorStatus?.(isValidationError, validationError);
  }, [isValidationError, validationError, onErrorStatus]);

  return {
    isValidationError,
    onTimeFieldErrorStatus
  };
};
