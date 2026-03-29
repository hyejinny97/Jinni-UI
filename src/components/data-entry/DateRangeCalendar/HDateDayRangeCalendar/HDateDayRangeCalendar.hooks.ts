import { useState } from 'react';
import { HDateDayRangeCalendarProps } from './HDateDayRangeCalendar';
import { RangeType } from '@/types/date-component';

type UseSelectedDateProps = Pick<
  HDateDayRangeCalendarProps,
  'defaultValue' | 'value' | 'onChange'
>;

type UseDisplayedDateProps = Pick<
  HDateDayRangeCalendarProps,
  'referenceDate'
> & {
  selectedDate: RangeType<Date | null>;
};

export const useSelectedDate = ({
  defaultValue,
  value,
  onChange
}: UseSelectedDateProps) => {
  const isControlled = value !== undefined;
  const [uncontrolledSelectedDate, setUncontrolledSelectedDate] = useState<
    RangeType<Date | null>
  >(defaultValue || { start: null, end: null });
  const selectedDate: RangeType<Date | null> = isControlled
    ? value
    : uncontrolledSelectedDate;

  const onSelectDate = (newValue: RangeType<Date | null>) => {
    if (!isControlled) setUncontrolledSelectedDate(newValue);
    if (onChange) onChange(newValue);
  };

  return {
    selectedDate,
    onSelectDate
  };
};

export const useDisplayedDate = ({
  selectedDate,
  referenceDate
}: UseDisplayedDateProps) => {
  const todayDate = new Date();
  const [baseDisplayedDate, setBaseDisplayedDate] = useState<Date>(
    selectedDate.start || selectedDate.end || referenceDate || todayDate
  );

  const goToPrevMonth = () => {
    setBaseDisplayedDate((prev) => {
      const currentYear = prev.getFullYear();
      const currentMonth = prev.getMonth();
      return new Date(currentYear, currentMonth - 1);
    });
  };
  const goToNextMonth = () => {
    setBaseDisplayedDate((prev) => {
      const currentYear = prev.getFullYear();
      const currentMonth = prev.getMonth();
      return new Date(currentYear, currentMonth + 1);
    });
  };

  return {
    baseDisplayedDate,
    goToPrevMonth,
    goToNextMonth
  };
};
