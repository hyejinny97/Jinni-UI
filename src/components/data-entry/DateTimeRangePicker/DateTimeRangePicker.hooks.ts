import { useState, useMemo } from 'react';
import { DateTimeRangePickerProps } from './DateTimeRangePicker';
import {
  RangeType,
  DateTimeRangeValidationError
} from '@/components/data-entry/DateTimeRangeField';

const INIT_DEFAULT_VALUE = { start: null, end: null };

export const useDateTimeRangeValue = ({
  defaultValue,
  value,
  onChange
}: Pick<DateTimeRangePickerProps, 'defaultValue' | 'value' | 'onChange'>) => {
  const isControlled = value !== undefined;
  const [uncontrolledDateTimeRangeValue, setUncontrolledDateTimeRangeValue] =
    useState<RangeType<Date | null>>({
      ...INIT_DEFAULT_VALUE,
      ...defaultValue
    });
  const dateTimeRangeValue = isControlled
    ? value
    : uncontrolledDateTimeRangeValue;
  const INIT_DATE_TIME = useMemo(() => {
    const dateTime = new Date();
    dateTime.setHours(0);
    dateTime.setMinutes(0);
    dateTime.setSeconds(0);
    dateTime.setMilliseconds(0);
    return dateTime;
  }, []);

  const changeDateInDateTimeValue = (
    dateTimeValue: Date | null,
    date: Date
  ): Date => {
    const newDateTime =
      dateTimeValue === null ? INIT_DATE_TIME : new Date(dateTimeValue);
    newDateTime.setFullYear(date.getFullYear());
    newDateTime.setMonth(date.getMonth());
    newDateTime.setDate(date.getDate());
    return newDateTime;
  };

  const handleDateTimeRangeChange = (
    newValue: RangeType<Date | null>,
    validationError?: DateTimeRangeValidationError
  ) => {
    if (!isControlled) setUncontrolledDateTimeRangeValue(newValue);
    if (onChange) onChange(newValue, validationError);
  };

  const handleDateRangeChange = (newValue: RangeType<Date | null>) => {
    const startDateTimeValue = dateTimeRangeValue['start'];
    const endDateTimeValue = dateTimeRangeValue['end'];
    const { start: newStartDate, end: newEndDate } = newValue;
    handleDateTimeRangeChange({
      start:
        newStartDate &&
        changeDateInDateTimeValue(startDateTimeValue, newStartDate),
      end: newEndDate && changeDateInDateTimeValue(endDateTimeValue, newEndDate)
    });
  };

  const handleTimeChange =
    (dateTimeFieldPosition: keyof RangeType<any> | undefined) =>
    (newValue: Date) => {
      if (!dateTimeFieldPosition) return;
      const dateTimeValue = dateTimeRangeValue[dateTimeFieldPosition];
      const newDateTime =
        dateTimeValue === null ? INIT_DATE_TIME : new Date(dateTimeValue);
      newDateTime.setHours(newValue.getHours());
      newDateTime.setMinutes(newValue.getMinutes());
      newDateTime.setSeconds(newValue.getSeconds());
      handleDateTimeRangeChange({
        ...dateTimeRangeValue,
        [dateTimeFieldPosition]: newDateTime
      });
    };

  return {
    dateTimeRangeValue,
    handleDateTimeRangeChange,
    handleDateRangeChange,
    handleTimeChange
  };
};
