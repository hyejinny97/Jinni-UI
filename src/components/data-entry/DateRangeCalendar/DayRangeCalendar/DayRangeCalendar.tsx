import './DayRangeCalendar.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import {
  DayCalendar,
  Day,
  DayCalendarProps,
  DayProps
} from '@/components/data-entry/Calendar';
import { RangeType } from '@/components/data-entry/DateRangeField';
import { Box } from '@/components/layout/Box';
import { lighten } from '@/utils/colorLuminance';
import { dateToDay } from '@/utils/date';
import { useHoveredDay } from './DayRangeCalendar.hooks';

export type DayRangeCalendarProps<T extends AsType = 'div'> = Omit<
  DayCalendarProps<T>,
  'selectedDate'
> & {
  selectedDate?: RangeType<Date | null>;
  hoveredDay?: Date | null;
  onHover?: (hoveredDay: Date | null) => void;
};

const DayRangeCalendar = <T extends AsType = 'div'>(
  props: DayRangeCalendarProps<T>
) => {
  const {
    renderDay,
    displayedDate,
    selectedDate,
    hoveredDay,
    onHover,
    showDaysOutsideCurrentMonth,
    displayWeekNumber,
    className,
    as: Component = 'div',
    ...rest
  } = props;
  const monthLastDay = new Date(
    displayedDate.getFullYear(),
    displayedDate.getMonth() + 1,
    0
  ).getDate();
  const { hoveredDayValue, handleHover } = useHoveredDay({
    hoveredDay,
    onHover
  });

  const isSelected = (day: Date): boolean => {
    if (!selectedDate) return false;
    const { start, end } = selectedDate;
    return (
      (!!start && dateToDay(start) === dateToDay(day)) ||
      (!!end && dateToDay(end) === dateToDay(day))
    );
  };
  const isBetweenSelectedDates = (day: Date): boolean => {
    if (!selectedDate || !selectedDate.start || !selectedDate.end) return false;
    const { start, end } = selectedDate;
    const targetDay = dateToDay(day);
    return dateToDay(start) <= targetDay && targetDay <= dateToDay(end);
  };
  const isBetweenStartAndHoveredDate = (day: Date): boolean => {
    if (selectedDate?.start && !selectedDate.end && hoveredDayValue) {
      const { start } = selectedDate;
      const targetDay = dateToDay(day);
      return (
        dateToDay(start) <= targetDay && targetDay <= dateToDay(hoveredDayValue)
      );
    }
    return false;
  };

  return (
    <DayCalendar
      className="JinniDayRangeCalendar"
      displayedDate={displayedDate}
      showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
      displayWeekNumber={displayWeekNumber}
      renderDay={
        renderDay
          ? renderDay
          : (dayProps: DayProps) => {
              const { day, color = 'primary', ref, ...rest } = dayProps;
              const showDashBorder = isBetweenStartAndHoveredDate(day);
              const currentDay = dateToDay(day);
              return (
                <Box
                  key={day.getTime()}
                  ref={ref}
                  className={cn('GridItem', {
                    startDate:
                      selectedDate?.start &&
                      dateToDay(selectedDate.start) === currentDay,
                    endDate:
                      selectedDate?.end &&
                      dateToDay(selectedDate.end) === currentDay,
                    firstDay:
                      !showDaysOutsideCurrentMonth && day.getDate() === 1,
                    lastDay:
                      !showDaysOutsideCurrentMonth &&
                      monthLastDay === day.getDate(),
                    lastDashBorder:
                      showDashBorder &&
                      hoveredDayValue &&
                      dateToDay(hoveredDayValue) === currentDay,
                    displayWeekNumber
                  })}
                  onMouseEnter={() => handleHover(day)}
                  onMouseLeave={() => handleHover(null)}
                >
                  <Box
                    className={cn('DayContainer', {
                      dimmedBackground: isBetweenSelectedDates(day),
                      showDashBorder
                    })}
                    style={{ '--dim-color': lighten(color, 0.8) }}
                  >
                    <Day {...rest} day={day} selected={isSelected(day)} />
                  </Box>
                </Box>
              );
            }
      }
      {...rest}
    />
  );
};

export default DayRangeCalendar;
