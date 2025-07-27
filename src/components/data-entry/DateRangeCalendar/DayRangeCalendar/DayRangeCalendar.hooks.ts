import { useState } from 'react';
import { DayRangeCalendarProps } from './DayRangeCalendar';

export const useHoveredDay = ({
  hoveredDay,
  onHover
}: Pick<DayRangeCalendarProps, 'hoveredDay' | 'onHover'>) => {
  const isControlled = hoveredDay !== undefined;
  const [uncontrolledHoveredDay, setUncontrolledHoveredDay] =
    useState<Date | null>(null);

  const handleHover = (hoveredDay: Date | null) => {
    if (!isControlled) setUncontrolledHoveredDay(hoveredDay);
    if (onHover) onHover(hoveredDay);
  };

  return {
    hoveredDayValue: isControlled ? hoveredDay : uncontrolledHoveredDay,
    handleHover
  };
};
