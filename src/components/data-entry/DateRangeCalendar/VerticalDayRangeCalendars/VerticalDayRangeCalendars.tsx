import './VerticalDayRangeCalendars.scss';
import { useState, useRef, useLayoutEffect } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Box } from '@/components/layout/Box';
import { DayRangeCalendar, DayRangeCalendarProps } from '../DayRangeCalendar';
import { dateToMonth } from '@/utils/date';

type VerticalDayRangeCalendarsProps<T extends AsType = 'div'> =
  DayRangeCalendarProps<T> & {
    dayCalendars?: number;
  };

const VerticalDayRangeCalendars = <T extends AsType = 'div'>(
  props: VerticalDayRangeCalendarsProps<T>
) => {
  const {
    dayCalendars = 5,
    displayedDate,
    locale,
    className,
    as: Component = 'div',
    ...rest
  } = props;
  const verticalDayRangeCalendarsElRef = useRef<HTMLDivElement>(null);
  const dayRangeCalendarContainersElRef = useRef<
    Array<{ element: HTMLElement; month: Date }>
  >([]);
  const [hoveredDay, setHoveredDay] = useState<Date | null>(null);
  const dateTimeFormat = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short'
  });

  useLayoutEffect(() => {
    const verticalDayRangeCalendarsEl = verticalDayRangeCalendarsElRef.current;
    const dayRangeCalendarContainersEl =
      dayRangeCalendarContainersElRef.current;
    if (
      !verticalDayRangeCalendarsEl ||
      dayRangeCalendarContainersEl.length === 0
    )
      return;
    const baseMonth = dateToMonth(displayedDate);
    for (let { element, month } of dayRangeCalendarContainersEl) {
      if (dateToMonth(month) === baseMonth) {
        verticalDayRangeCalendarsEl.scrollTo({
          top: element.offsetTop
        });
        break;
      }
    }
  }, []);

  const months = Array.from({ length: dayCalendars }, (_, i) => {
    const date = new Date(displayedDate);
    const baseMonth = displayedDate.getMonth();
    const half = Math.floor(dayCalendars / 2);
    date.setMonth(baseMonth - half + i);
    return date;
  });

  return (
    <div
      ref={verticalDayRangeCalendarsElRef}
      className={cn('JinniVerticalDayRangeCalendars', className)}
    >
      {months.map((month) => (
        <div
          key={month.getTime()}
          className={cn('JinniDayRangeCalendarContainer', className)}
          ref={(element) => {
            if (element) {
              dayRangeCalendarContainersElRef.current.push({ element, month });
            }
          }}
        >
          <Box className="JinniDayRangeCalendarHeader">
            {dateTimeFormat.format(month)}
          </Box>
          <DayRangeCalendar
            displayedDate={month}
            hoveredDay={hoveredDay}
            onHover={setHoveredDay}
            {...rest}
          />
        </div>
      ))}
    </div>
  );
};

export default VerticalDayRangeCalendars;
