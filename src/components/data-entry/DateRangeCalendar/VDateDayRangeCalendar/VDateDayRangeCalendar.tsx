import './VDateDayRangeCalendar.scss';
import cn from 'classnames';
import { useState, useRef, useMemo } from 'react';
import { AsType } from '@/types/default-component-props';
import { DateRangeComponentProps } from '@/types/date-component';
import { DayCalendarMainProps } from '@/components/data-entry/DayCalendar';
import { DayRangeCalendar } from '@/components/data-entry/DayRangeCalendar';
import {
  CalendarHeader,
  CalendarHeaderProps
} from '@/components/data-entry/CalendarHeader';
import { useSelectedDate, useScroll } from './VDateDayRangeCalendar.hooks';
import { Stack, StackProps } from '@/components/layout/Stack';
import { Divider } from '@/components/layout/Divider';
import { getYearMonthDateTimeFormat } from '@/utils/date-component';

export type VDateDayRangeCalendarProps<T extends AsType = 'div'> = Omit<
  StackProps<T>,
  'defaultValue' | 'onChange' | 'children'
> &
  DateRangeComponentProps &
  Omit<DayCalendarMainProps, 'renderDay'> & {
    dayCalendars?: number;
    referenceDate?: Date;
    renderCalendarHeader?: (
      calendarHeaderProps: CalendarHeaderProps
    ) => React.ReactNode;
  };

const VDateDayRangeCalendar = <T extends AsType = 'div'>(
  props: VDateDayRangeCalendarProps<T>
) => {
  const {
    defaultValue,
    value,
    onChange,
    locale,
    options,
    minDate,
    maxDate,
    disabledDates,
    readOnly,
    disabled,
    showDaysOutsideCurrentMonth,
    fixedWeekNumber,
    displayWeekNumber,
    referenceDate,
    renderCalendarHeader = (calendarHeaderProps: CalendarHeaderProps) => (
      <CalendarHeader {...calendarHeaderProps} />
    ),
    dayCalendars = 5,
    className,
    ...rest
  } = props;
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const { selectedDate, onSelectDate } = useSelectedDate({
    defaultValue,
    value,
    onChange
  });
  const todayDate = new Date();
  const baseDisplayedDateRef = useRef<Date>(
    selectedDate.start || selectedDate.end || referenceDate || todayDate
  );
  const { dateDayRangeCalendarElRef } = useScroll({ baseDisplayedDateRef });
  const yearMonthDateTimeFormat = useMemo(
    () => getYearMonthDateTimeFormat({ locale, options }),
    [locale, options]
  );

  const getCalendarHeaderProps = (displayedDate: Date) => {
    return {
      children: yearMonthDateTimeFormat.format(displayedDate),
      hidePrevButton: true,
      hideNextButton: true
    };
  };
  const getDayRangeCalendarProps = (displayedDate: Date) => {
    return {
      displayedDate,
      selectedDate,
      onSelectDate,
      hoveredDate,
      onHoverDate: setHoveredDate,
      locale,
      minDate,
      maxDate,
      disabledDates,
      readOnly,
      disabled,
      showDaysOutsideCurrentMonth,
      fixedWeekNumber,
      displayWeekNumber
    };
  };

  return (
    <Stack
      ref={dateDayRangeCalendarElRef}
      className={cn('JinniVDateDayRangeCalendar', className)}
      divider={<Divider orientation="horizontal" />}
      {...rest}
    >
      {Array(dayCalendars)
        .fill(0)
        .map((_, idx) => {
          const baseDisplayedDate = baseDisplayedDateRef.current;
          const baseYear = baseDisplayedDate.getFullYear();
          const baseMonth = baseDisplayedDate.getMonth();
          const displayedDate = new Date(baseYear, baseMonth);
          const half = Math.floor(dayCalendars / 2);
          displayedDate.setMonth(baseMonth - half + idx);
          return (
            <div
              key={displayedDate.getTime()}
              className="JinniVDateDayRangeCalendarPart"
              data-value={displayedDate.toISOString()}
            >
              {renderCalendarHeader(getCalendarHeaderProps(displayedDate))}
              <DayRangeCalendar {...getDayRangeCalendarProps(displayedDate)} />
            </div>
          );
        })}
    </Stack>
  );
};

export default VDateDayRangeCalendar;
