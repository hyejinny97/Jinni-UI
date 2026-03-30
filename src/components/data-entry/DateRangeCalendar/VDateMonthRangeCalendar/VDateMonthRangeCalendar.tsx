import './VDateMonthRangeCalendar.scss';
import cn from 'classnames';
import { useState, useRef, useMemo } from 'react';
import { AsType } from '@/types/default-component-props';
import { DateRangeComponentProps } from '@/types/date-component';
import { MonthCalendarMainProps } from '@/components/data-entry/MonthCalendar';
import { MonthRangeCalendar } from '@/components/data-entry/MonthRangeCalendar';
import {
  CalendarHeader,
  CalendarHeaderProps
} from '@/components/data-entry/CalendarHeader';
import { useSelectedDate, useScroll } from './VDateMonthRangeCalendar.hooks';
import { Stack, StackProps } from '@/components/layout/Stack';
import { Divider } from '@/components/layout/Divider';
import { getYearDateTimeFormat } from '@/utils/date-component';

export type VDateMonthRangeCalendarProps<T extends AsType = 'div'> = Omit<
  StackProps<T>,
  'defaultValue' | 'onChange' | 'children'
> &
  Omit<DateRangeComponentProps, 'disabledDates'> &
  Omit<MonthCalendarMainProps, 'renderMonth'> & {
    monthCalendars?: number;
    referenceDate?: Date;
    renderCalendarHeader?: (
      calendarHeaderProps: CalendarHeaderProps
    ) => React.ReactNode;
  };

const VDateMonthRangeCalendar = <T extends AsType = 'div'>(
  props: VDateMonthRangeCalendarProps<T>
) => {
  const {
    defaultValue,
    value,
    onChange,
    locale,
    options,
    minDate,
    maxDate,
    readOnly,
    disabled,
    referenceDate,
    renderCalendarHeader = (calendarHeaderProps: CalendarHeaderProps) => (
      <CalendarHeader {...calendarHeaderProps} />
    ),
    monthCalendars = 5,
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
  const { dateMonthRangeCalendarElRef } = useScroll({ baseDisplayedDateRef });
  const yearDateTimeFormat = useMemo(
    () => getYearDateTimeFormat({ locale, options }),
    [locale, options]
  );

  const getCalendarHeaderProps = (displayedDate: Date) => {
    return {
      children: yearDateTimeFormat.format(displayedDate),
      hidePrevButton: true,
      hideNextButton: true
    };
  };
  const getMonthRangeCalendarProps = (displayedDate: Date) => {
    return {
      displayedDate,
      selectedDate,
      onSelectDate,
      hoveredDate,
      onHoverDate: setHoveredDate,
      locale,
      minDate,
      maxDate,
      readOnly,
      disabled
    };
  };

  return (
    <Stack
      ref={dateMonthRangeCalendarElRef}
      className={cn('JinniVDateMonthRangeCalendar', className)}
      divider={<Divider orientation="horizontal" />}
      {...rest}
    >
      {Array(monthCalendars)
        .fill(0)
        .map((_, idx) => {
          const baseDisplayedDate = baseDisplayedDateRef.current;
          const baseYear = baseDisplayedDate.getFullYear();
          const displayedDate = new Date(baseDisplayedDate);
          const half = Math.floor(monthCalendars / 2);
          displayedDate.setFullYear(baseYear - half + idx);
          return (
            <div
              key={displayedDate.getFullYear()}
              className="JinniVDateMonthRangeCalendarPart"
              data-value={displayedDate.toISOString()}
            >
              {renderCalendarHeader(getCalendarHeaderProps(displayedDate))}
              <MonthRangeCalendar
                {...getMonthRangeCalendarProps(displayedDate)}
              />
            </div>
          );
        })}
    </Stack>
  );
};

export default VDateMonthRangeCalendar;
