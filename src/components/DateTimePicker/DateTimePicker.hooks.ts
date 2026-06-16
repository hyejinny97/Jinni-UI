import { useState } from 'react';
import { DateTimePickerProps } from './DateTimePicker';

type UseDateTimeValueProps = Pick<
  DateTimePickerProps,
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

  const handleDateTimeChange = (newValue: Date | null) => {
    if (!isControlled) setUncontrolledDateTimeValue(newValue);
    if (onChange) onChange(newValue);
  };

  const handleDateChange = (newValue: Date) => {
    const newDateTime = new Date(dateTimeValue || INIT_DATE_TIME);
    newDateTime.setFullYear(newValue.getFullYear());
    newDateTime.setMonth(newValue.getMonth());
    newDateTime.setDate(newValue.getDate());
    handleDateTimeChange(newDateTime);
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
    handleDateTimeChange(newDateTime);
  };

  return {
    dateTimeValue,
    handleDateTimeChange,
    handleDateChange,
    handleTimeChange
  };
};
