import { useState } from 'react';
import { MonthRangeCalendarProps } from './MonthRangeCalendar';

export const useHoveredMonth = ({
  hoveredMonth,
  onHover
}: Pick<MonthRangeCalendarProps, 'hoveredMonth' | 'onHover'>) => {
  const isControlled = hoveredMonth !== undefined;
  const [uncontrolledHoveredMonth, setUncontrolledHoveredMonth] =
    useState<Date | null>(null);

  const handleHover = (hoveredMonth: Date | null) => {
    if (!isControlled) setUncontrolledHoveredMonth(hoveredMonth);
    if (onHover) onHover(hoveredMonth);
  };

  return {
    hoveredMonthValue: isControlled ? hoveredMonth : uncontrolledHoveredMonth,
    handleHover
  };
};
