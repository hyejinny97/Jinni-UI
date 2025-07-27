import './MonthRangeCalendar.scss';
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
import { useHoveredMonth } from './MonthRangeCalendar.hooks';

export type MonthRangeCalendarProps<T extends AsType = 'div'> = Omit<
  MonthCalendarProps<T>,
  'selectedDate'
> & {
  selectedDate?: RangeType<Date | null>;
  hoveredMonth?: Date | null;
  onHover?: (hoveredMonth: Date | null) => void;
};

const MonthRangeCalendar = <T extends AsType = 'div'>(
  props: MonthRangeCalendarProps<T>
) => {
  const {
    renderMonth,
    selectedDate,
    hoveredMonth,
    onHover,
    className,
    as: Component = 'div',
    ...rest
  } = props;
  const { hoveredMonthValue, handleHover } = useHoveredMonth({
    hoveredMonth,
    onHover
  });

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
    if (selectedDate?.start && !selectedDate.end && hoveredMonthValue) {
      const { start } = selectedDate;
      const targetMonth = dateToMonth(month);
      return (
        dateToMonth(start) <= targetMonth &&
        targetMonth <= dateToMonth(hoveredMonthValue)
      );
    }
    return false;
  };

  return (
    <MonthCalendar
      className="JinniMonthRangeCalendar"
      spacing={0}
      renderMonth={
        renderMonth
          ? renderMonth
          : (monthProps: MonthProps) => {
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
                      hoveredMonthValue &&
                      dateToMonth(hoveredMonthValue) === currentMonth
                  })}
                  onMouseEnter={() => handleHover(month)}
                  onMouseLeave={() => handleHover(null)}
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
            }
      }
      {...rest}
    />
  );
};

export default MonthRangeCalendar;
