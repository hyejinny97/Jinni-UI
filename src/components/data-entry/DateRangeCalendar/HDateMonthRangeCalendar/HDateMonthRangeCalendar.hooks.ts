import { useState } from 'react';
import { HDateMonthRangeCalendarProps } from './HDateMonthRangeCalendar';
import { RangeType } from '@/types/date-component';

type UseSelectedDateProps = Pick<
  HDateMonthRangeCalendarProps,
  'defaultValue' | 'value' | 'onChange'
>;

type UseDisplayedDateProps = Pick<
  HDateMonthRangeCalendarProps,
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

  const goToPrevYear = () => {
    setBaseDisplayedDate((prev) => {
      const currentYear = prev.getFullYear();
      const newDate = new Date(prev);
      newDate.setFullYear(currentYear - 1);
      return newDate;
    });
  };
  const goToNextYear = () => {
    setBaseDisplayedDate((prev) => {
      const currentYear = prev.getFullYear();
      const newDate = new Date(prev);
      newDate.setFullYear(currentYear + 1);
      return newDate;
    });
  };

  return {
    baseDisplayedDate,
    goToPrevYear,
    goToNextYear
  };
};
