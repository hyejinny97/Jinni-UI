import { useState } from 'react';
import { DateTimeRangePickerProps } from './DateTimeRangePicker';
import { RangeType, RangeFieldType } from '@/types/date-time-component';

type UseDateTimeRangeValueProps = Pick<
  DateTimeRangePickerProps,
  'defaultValue' | 'value' | 'onChange'
>;

const INIT_DEFAULT_VALUE = { start: null, end: null };
const INIT_DATE_TIME = new Date();
INIT_DATE_TIME.setHours(0, 0, 0, 0);

export const useDateTimeRangeValue = ({
  defaultValue,
  value,
  onChange
}: UseDateTimeRangeValueProps) => {
  const isControlled = value !== undefined;
  const [uncontrolledDateTimeRange, setUncontrolledDateTimeRange] = useState<
    RangeType<Date | null>
  >(defaultValue || INIT_DEFAULT_VALUE);
  const dateTimeRangeValue: RangeType<Date | null> = isControlled
    ? value
    : uncontrolledDateTimeRange;

  const setNewDate = ({
    baseDate,
    targetDate
  }: {
    baseDate?: Date | null;
    targetDate?: Date | null;
  }): Date | undefined => {
    if (!targetDate) return;
    const newDateTime = new Date(baseDate || INIT_DATE_TIME);
    newDateTime.setFullYear(targetDate.getFullYear());
    newDateTime.setMonth(targetDate.getMonth());
    newDateTime.setDate(targetDate.getDate());
    return newDateTime;
  };

  const setNewTime = ({
    baseDate,
    targetDate
  }: {
    baseDate?: Date | null;
    targetDate: Date | null;
  }): Date => {
    const newDateTime = new Date(baseDate || INIT_DATE_TIME);
    if (targetDate === null) {
      newDateTime.setHours(0, 0, 0, 0);
    } else {
      newDateTime.setHours(targetDate.getHours());
      newDateTime.setMinutes(targetDate.getMinutes());
      newDateTime.setSeconds(targetDate.getSeconds());
    }
    return newDateTime;
  };

  const handleDateTimeRangeChange = (newValue: RangeType<Date | null>) => {
    if (!isControlled) setUncontrolledDateTimeRange(newValue);
    if (onChange) onChange(newValue);
  };

  const handleDateRangeChange = (newValue: RangeType<Date | null>) => {
    handleDateTimeRangeChange({
      start: setNewDate({
        baseDate: dateTimeRangeValue.start,
        targetDate: newValue.start
      }),
      end: setNewDate({
        baseDate: dateTimeRangeValue.end,
        targetDate: newValue.end
      })
    });
  };

  const handleTimeChange =
    (rangeField: RangeFieldType) => (newValue: Date | null) => {
      handleDateTimeRangeChange({
        ...dateTimeRangeValue,
        [rangeField]: setNewTime({
          baseDate: dateTimeRangeValue[rangeField],
          targetDate: newValue
        })
      });
    };

  return {
    dateTimeRangeValue,
    handleDateTimeRangeChange,
    handleDateRangeChange,
    handleTimeChange
  };
};
