import './HDateMonthRangeCalendar.scss';
import cn from 'classnames';
import { useState, useMemo } from 'react';
import { AsType } from '@/types/default-component-props';
import { DateRangeComponentProps } from '@/types/date-component';
import { MonthCalendarMainProps } from '@/components/data-entry/MonthCalendar';
import { MonthRangeCalendar } from '@/components/data-entry/MonthRangeCalendar';
import {
  CalendarHeader,
  CalendarHeaderProps
} from '@/components/data-entry/CalendarHeader';
import {
  useSelectedDate,
  useDisplayedDate
} from './HDateMonthRangeCalendar.hooks';
import { Stack, StackProps } from '@/components/layout/Stack';
import { Divider } from '@/components/layout/Divider';
import { getYearDateTimeFormat } from '@/utils/date-component';

export type HDateMonthRangeCalendarProps<T extends AsType = 'div'> = Omit<
  StackProps<T>,
  'defaultValue' | 'onChange' | 'children'
> &
  Omit<DateRangeComponentProps, 'disabledDates'> &
  Omit<MonthCalendarMainProps, 'renderMonth'> & {
    monthCalendars?: 1 | 2 | 3;
    referenceDate?: Date;
    renderCalendarHeader?: (
      calendarHeaderProps: CalendarHeaderProps
    ) => React.ReactNode;
  };

const HDateMonthRangeCalendar = <T extends AsType = 'div'>(
  props: HDateMonthRangeCalendarProps<T>
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
    monthCalendars = 2,
    className,
    ...rest
  } = props;
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const { selectedDate, onSelectDate } = useSelectedDate({
    defaultValue,
    value,
    onChange
  });
  const { baseDisplayedDate, goToPrevYear, goToNextYear } = useDisplayedDate({
    selectedDate,
    referenceDate
  });
  const yearDateTimeFormat = useMemo(
    () => getYearDateTimeFormat({ locale, options }),
    [locale, options]
  );

  const getCalendarHeaderProps = (calendarIdx: number, displayedDate: Date) => {
    return {
      children: yearDateTimeFormat.format(displayedDate),
      hidePrevButton: calendarIdx > 0,
      hideNextButton: calendarIdx < monthCalendars - 1,
      onPrevClick: goToPrevYear,
      onNextClick: goToNextYear
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
      className={cn('JinniHDateMonthRangeCalendar', className)}
      direction="row"
      divider={<Divider orientation="vertical" />}
      spacing={10}
      {...rest}
    >
      {Array(monthCalendars)
        .fill(0)
        .map((_, idx) => {
          const baseYear = baseDisplayedDate.getFullYear();
          const displayedDate = new Date(baseDisplayedDate);
          displayedDate.setFullYear(baseYear + idx);
          return (
            <div key={displayedDate.getFullYear()}>
              {renderCalendarHeader(getCalendarHeaderProps(idx, displayedDate))}
              <MonthRangeCalendar
                {...getMonthRangeCalendarProps(displayedDate)}
              />
            </div>
          );
        })}
    </Stack>
  );
};

export default HDateMonthRangeCalendar;
