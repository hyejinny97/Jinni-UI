import './MonthRangeCalendar.scss';
import { useState, useRef, useLayoutEffect } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import {
  MonthCalendar,
  Month,
  MonthCalendarProps,
  MonthProps
} from '@/components/data-entry/Calendar';
import { RangeType } from '@/components/data-entry/DateRangeField';
import { Box } from '@/components/layout/Box';
import { lighten } from '@/utils/colorLuminance';
import { dateToMonth } from './MonthRangeCalendar.utils';

type MonthRangeCalendarProps<T extends AsType = 'div'> = Omit<
  MonthCalendarProps<T>,
  'selectedDate'
> & {
  selectedDate?: RangeType<Date | null>;
  monthCalendars?: number;
};

const MonthRangeCalendar = <T extends AsType = 'div'>(
  props: MonthRangeCalendarProps<T>
) => {
  const {
    renderMonth,
    selectedDate,
    displayedDate,
    monthCalendars = 5,
    className,
    as: Component = 'div',
    ...rest
  } = props;
  const monthRangeCalendarContainerElRef = useRef<HTMLDivElement>(null);
  const monthRangeCalendarsElRef = useRef<
    Array<{ element: HTMLElement; year: Date }>
  >([]);
  const [hoveredMonth, setHoveredMonth] = useState<Date | null>(null);

  useLayoutEffect(() => {
    const monthRangeCalendarContainerEl =
      monthRangeCalendarContainerElRef.current;
    const monthRangeCalendarsEl = monthRangeCalendarsElRef.current;
    if (!monthRangeCalendarContainerEl || monthRangeCalendarsEl.length === 0)
      return;
    const baseYear = displayedDate.getFullYear();
    for (let { element, year } of monthRangeCalendarsEl) {
      if (year.getFullYear() === baseYear) {
        monthRangeCalendarContainerEl.scrollTo({
          top: element.offsetTop
        });
        break;
      }
    }
  }, []);

  const isSelected = (month: Date): boolean => {
    if (!selectedDate) return false;
    const { start, end } = selectedDate;
    return (
      (!!start && dateToMonth(start) === dateToMonth(month)) ||
      (!!end && dateToMonth(end) === dateToMonth(month))
    );
  };
  const isBetweenSelectedDates = (month: Date): boolean => {
    if (!selectedDate || !selectedDate.start || !selectedDate.end) return false;
    const { start, end } = selectedDate;
    const targetMonth = dateToMonth(month);
    return dateToMonth(start) <= targetMonth && targetMonth <= dateToMonth(end);
  };
  const isBetweenStartAndHoveredDate = (month: Date): boolean => {
    if (selectedDate?.start && !selectedDate.end && hoveredMonth) {
      const { start } = selectedDate;
      const targetMonth = dateToMonth(month);
      return (
        dateToMonth(start) <= targetMonth &&
        targetMonth <= dateToMonth(hoveredMonth)
      );
    }
    return false;
  };

  const years = Array.from({ length: monthCalendars }, (_, i) => {
    const date = new Date(displayedDate);
    const baseYear = displayedDate.getFullYear();
    const half = Math.floor(monthCalendars / 2);
    date.setFullYear(baseYear - half + i);
    return date;
  });

  return (
    <div
      ref={monthRangeCalendarContainerElRef}
      className={cn('JinniMonthRangeCalendarContainer', className)}
    >
      {years.map((year) => (
        <div
          key={year.getTime()}
          ref={(element) => {
            if (element) {
              monthRangeCalendarsElRef.current.push({ element, year });
            }
          }}
        >
          <Box className="JinniMonthRangeCalendarHeader">
            {year.getFullYear()}
          </Box>
          <MonthCalendar
            className="JinniMonthRangeCalendar"
            spacing={0}
            displayedDate={year}
            renderMonth={(monthProps: MonthProps) => {
              const { month, color = 'primary', ref, ...rest } = monthProps;
              const showDashBorder = isBetweenStartAndHoveredDate(month);
              const currentMonth = dateToMonth(month);
              return (
                <Box
                  key={month.getTime()}
                  ref={ref}
                  className={cn('GridItem', {
                    startDate:
                      selectedDate?.start &&
                      dateToMonth(selectedDate.start) === currentMonth,
                    endDate:
                      selectedDate?.end &&
                      dateToMonth(selectedDate.end) === currentMonth,
                    lastDashBorder:
                      showDashBorder &&
                      hoveredMonth &&
                      dateToMonth(hoveredMonth) === currentMonth
                  })}
                  onMouseEnter={() => setHoveredMonth(month)}
                  onMouseLeave={() => setHoveredMonth(null)}
                >
                  <Box
                    className={cn('MonthContainer', {
                      dimmedBackground: isBetweenSelectedDates(month),
                      showDashBorder
                    })}
                    style={{ '--dim-color': lighten(color, 0.8) }}
                  >
                    <Month
                      {...rest}
                      month={month}
                      selected={isSelected(month)}
                    />
                  </Box>
                </Box>
              );
            }}
            {...rest}
          />
        </div>
      ))}
    </div>
  );
};

export default MonthRangeCalendar;
