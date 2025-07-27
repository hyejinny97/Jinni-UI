import './VerticalMonthRangeCalendars.scss';
import { useState, useRef, useLayoutEffect } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Box } from '@/components/layout/Box';
import {
  MonthRangeCalendar,
  MonthRangeCalendarProps
} from '../MonthRangeCalendar';

type VerticalMonthRangeCalendarsProps<T extends AsType = 'div'> =
  MonthRangeCalendarProps<T> & {
    monthCalendars?: number;
  };

const VerticalMonthRangeCalendars = <T extends AsType = 'div'>(
  props: VerticalMonthRangeCalendarsProps<T>
) => {
  const {
    monthCalendars = 5,
    displayedDate,
    className,
    as: Component = 'div',
    ...rest
  } = props;
  const verticalMonthRangeCalendarsElRef = useRef<HTMLDivElement>(null);
  const monthRangeCalendarContainersElRef = useRef<
    Array<{ element: HTMLElement; year: Date }>
  >([]);
  const [hoveredMonth, setHoveredMonth] = useState<Date | null>(null);

  useLayoutEffect(() => {
    const verticalMonthRangeCalendarsEl =
      verticalMonthRangeCalendarsElRef.current;
    const monthRangeCalendarContainersEl =
      monthRangeCalendarContainersElRef.current;
    if (
      !verticalMonthRangeCalendarsEl ||
      monthRangeCalendarContainersEl.length === 0
    )
      return;
    const baseYear = displayedDate.getFullYear();
    for (let { element, year } of monthRangeCalendarContainersEl) {
      if (year.getFullYear() === baseYear) {
        verticalMonthRangeCalendarsEl.scrollTo({
          top: element.offsetTop
        });
        break;
      }
    }
  }, []);

  const years = Array.from({ length: monthCalendars }, (_, i) => {
    const date = new Date(displayedDate);
    const baseYear = displayedDate.getFullYear();
    const half = Math.floor(monthCalendars / 2);
    date.setFullYear(baseYear - half + i);
    return date;
  });

  return (
    <div
      ref={verticalMonthRangeCalendarsElRef}
      className={cn('JinniVerticalMonthRangeCalendars', className)}
    >
      {years.map((year) => (
        <div
          key={year.getTime()}
          className={cn('JinniMonthRangeCalendarContainer', className)}
          ref={(element) => {
            if (element) {
              monthRangeCalendarContainersElRef.current.push({ element, year });
            }
          }}
        >
          <Box className="JinniMonthRangeCalendarHeader">
            {year.getFullYear()}
          </Box>
          <MonthRangeCalendar
            displayedDate={year}
            hoveredMonth={hoveredMonth}
            onHover={setHoveredMonth}
            {...rest}
          />
        </div>
      ))}
    </div>
  );
};

export default VerticalMonthRangeCalendars;
