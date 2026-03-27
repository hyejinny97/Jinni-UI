import { useState } from 'react';
import { DayRangeCalendarProps } from './DayRangeCalendar';
import { RangeType } from '@/types/date-component';
import { dateToDay } from '@/utils/date-component';

type UseSelectedDateValueProps = Pick<
  DayRangeCalendarProps,
  'selectedDate' | 'onSelectDate'
>;

type UseHoveredDateValueProps = Pick<
  DayRangeCalendarProps,
  'hoveredDate' | 'onHoverDate'
>;

export const useSelectedDateValue = ({
  selectedDate,
  onSelectDate
}: UseSelectedDateValueProps) => {
  const isControlled = selectedDate !== undefined;
  const [unControlledDate, setUnControlledDate] = useState<
    RangeType<Date | null>
  >({ start: null, end: null });
  const selectedDateValue: RangeType<Date | null> = isControlled
    ? selectedDate
    : unControlledDate;
  const { start, end } = selectedDateValue;

  const handleSelect = (dateSelected: Date) => {
    const newSelectedDate = { ...selectedDateValue };
    if (start && !end && dateToDay(start) <= dateToDay(dateSelected)) {
      newSelectedDate.end = dateSelected;
    } else if (!start && end && dateToDay(dateSelected) <= dateToDay(end)) {
      newSelectedDate.start = dateSelected;
    } else {
      newSelectedDate.start = dateSelected;
      newSelectedDate.end = null;
    }

    if (!isControlled) setUnControlledDate(newSelectedDate);
    if (onSelectDate) onSelectDate(newSelectedDate);
  };

  return { selectedDateValue, handleSelect };
};

export const useHoveredDateValue = ({
  hoveredDate,
  onHoverDate
}: UseHoveredDateValueProps) => {
  const isControlled = hoveredDate !== undefined;
  const [unControlledDate, setUnControlledDate] = useState<Date | null>(null);
  const hoveredDateValue: Date | null = isControlled
    ? hoveredDate
    : unControlledDate;

  const handleHover = (dateHovered: Date | null) => {
    if (!isControlled) setUnControlledDate(dateHovered);
    if (onHoverDate) onHoverDate(dateHovered);
  };

  return { hoveredDateValue, handleHover };
};
