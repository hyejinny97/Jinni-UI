import './HDateDayRangeCalendar.scss';
import cn from 'classnames';
import { useState, useMemo } from 'react';
import { AsType } from '@/types/default-component-props';
import { DateRangeComponentProps } from '@/types/date-component';
import { DayCalendarMainProps } from '@/components/data-entry/DayCalendar';
import { DayRangeCalendar } from '@/components/data-entry/DayRangeCalendar';
import {
  CalendarHeader,
  CalendarHeaderProps
} from '@/components/data-entry/CalendarHeader';
import {
  useSelectedDate,
  useDisplayedDate
} from './HDateDayRangeCalendar.hooks';
import { Stack, StackProps } from '@/components/layout/Stack';
import { Divider } from '@/components/layout/Divider';
import { getYearMonthDateTimeFormat } from '@/utils/date-component';

export type HDateDayRangeCalendarProps<T extends AsType = 'div'> = Omit<
  StackProps<T>,
  'defaultValue' | 'onChange' | 'children'
> &
  DateRangeComponentProps &
  Omit<DayCalendarMainProps, 'renderDay'> & {
    dayCalendars?: 1 | 2 | 3;
    referenceDate?: Date;
    renderCalendarHeader?: (
      calendarHeaderProps: CalendarHeaderProps
    ) => React.ReactNode;
  };

const HDateDayRangeCalendar = <T extends AsType = 'div'>(
  props: HDateDayRangeCalendarProps<T>
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
    dayCalendars = 2,
    className,
    ...rest
  } = props;
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const { selectedDate, onSelectDate } = useSelectedDate({
    defaultValue,
    value,
    onChange
  });
  const { baseDisplayedDate, goToPrevMonth, goToNextMonth } = useDisplayedDate({
    selectedDate,
    referenceDate
  });
  const yearMonthDateTimeFormat = useMemo(
    () => getYearMonthDateTimeFormat({ locale, options }),
    [locale, options]
  );

  const getCalendarHeaderProps = (calendarIdx: number, displayedDate: Date) => {
    return {
      children: yearMonthDateTimeFormat.format(displayedDate),
      hidePrevButton: calendarIdx > 0,
      hideNextButton: calendarIdx < dayCalendars - 1,
      onPrevClick: goToPrevMonth,
      onNextClick: goToNextMonth
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
      className={cn('JinniHDateDayRangeCalendar', className)}
      direction="row"
      divider={<Divider orientation="vertical" />}
      spacing={10}
      {...rest}
    >
      {Array(dayCalendars)
        .fill(0)
        .map((_, idx) => {
          const baseYear = baseDisplayedDate.getFullYear();
          const baseMonth = baseDisplayedDate.getMonth();
          const displayedDate = new Date(baseYear, baseMonth + idx);
          return (
            <div
              key={displayedDate.getTime()}
              className="JinniHDateDayRangeCalendarWrapper"
            >
              {renderCalendarHeader(getCalendarHeaderProps(idx, displayedDate))}
              <DayRangeCalendar {...getDayRangeCalendarProps(displayedDate)} />
            </div>
          );
        })}
    </Stack>
  );
};

export default HDateDayRangeCalendar;
