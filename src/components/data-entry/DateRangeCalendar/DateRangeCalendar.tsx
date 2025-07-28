import { useState, useMemo } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { DateOptions } from '@/components/data-entry/DateField';
import {
  YearProps,
  MonthProps,
  DayProps,
  getBaseCalendarType
} from '@/components/data-entry/Calendar';
import { RangeType } from '@/components/data-entry/DateRangeField';
import { useSelectedDateRange } from './DateRangeCalendar.hooks';
import { YearRangeCalendar } from './YearRangeCalendar';
import { VerticalMonthRangeCalendars } from './VerticalMonthRangeCalendars';
import { HorizontalMonthRangeCalendars } from './HorizontalMonthRangeCalendars';
import { VerticalDayRangeCalendars } from './VerticalDayRangeCalendars';
import { HorizontalDayRangeCalendars } from './HorizontalDayRangeCalendars';
import { dateToMonth } from '@/utils/date';
import { dateToDay } from '@/utils/date';

export type DateRangeCalendarProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'defaultValue' | 'onChange'
> & {
  defaultValue?: Partial<RangeType<Date>>;
  value?: RangeType<Date | null>;
  referenceDate?: Date;
  onChange?: (value: RangeType<Date | null>) => void;
  onYearChange?: (value: RangeType<Date | null>) => void;
  onMonthChange?: (value: RangeType<Date | null>) => void;
  onDayChange?: (value: RangeType<Date | null>) => void;
  locale?: string;
  options?: DateOptions;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Array<Date>;
  readOnly?: boolean;
  disabled?: boolean;
  yearsOrder?: 'asc' | 'dsc';
  showDaysOutsideCurrentMonth?: boolean;
  fixedWeekNumber?: number;
  displayWeekNumber?: boolean;
  renderDay?: (dayProps: Omit<DayProps, 'ref'>) => React.ReactNode;
  renderMonth?: (monthProps: Omit<MonthProps, 'ref'>) => React.ReactNode;
  renderYear?: (yearProps: Omit<YearProps, 'ref'>) => React.ReactNode;
  monthCalendarsOrientation?: 'vertical' | 'horizontal';
  dayCalendarsOrientation?: 'vertical' | 'horizontal';
  verticalMonthCalendars?: number;
  horizontalMonthCalendars?: 1 | 2 | 3;
  verticalDayCalendars?: number;
  horizontalDayCalendars?: 1 | 2 | 3;
};

const DateRangeCalendar = <T extends AsType = 'div'>(
  props: DateRangeCalendarProps<T>
) => {
  const {
    defaultValue,
    value,
    referenceDate,
    onChange,
    onYearChange,
    onMonthChange,
    onDayChange,
    locale,
    options,
    minDate,
    maxDate,
    disabledDates,
    readOnly = false,
    disabled = false,
    yearsOrder = 'asc',
    showDaysOutsideCurrentMonth = false,
    fixedWeekNumber,
    displayWeekNumber = false,
    renderDay,
    renderMonth,
    renderYear,
    monthCalendarsOrientation = 'horizontal',
    dayCalendarsOrientation = 'horizontal',
    verticalMonthCalendars = 5,
    horizontalMonthCalendars = 2,
    verticalDayCalendars = 5,
    horizontalDayCalendars = 2,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const baseCalendarType = useMemo(
    () => getBaseCalendarType({ locale, options }),
    [locale, options]
  );
  const { selectedDateRange, handleChange } = useSelectedDateRange({
    defaultValue,
    value,
    onChange
  });
  const todayDate = new Date();
  const [displayedDate, setDisplayedDate] = useState<Date>(
    selectedDateRange.start || referenceDate || todayDate
  );
  const newStyle = useStyle(style);

  const isLowerThan = ({
    baseDate,
    targetDate
  }: {
    baseDate: Date;
    targetDate: Date;
  }): boolean => {
    switch (baseCalendarType) {
      case 'year':
        return baseDate.getFullYear() > targetDate.getFullYear();
      case 'month':
        return dateToMonth(baseDate) > dateToMonth(targetDate);
      case 'day':
        return dateToDay(baseDate) > dateToDay(targetDate);
    }
  };
  const handleSelect = (newSelectedDate: Date) => {
    let newSelectedDateRange: RangeType<Date | null>;
    if (!selectedDateRange.start) {
      newSelectedDateRange = { ...selectedDateRange, start: newSelectedDate };
    } else if (!selectedDateRange.end) {
      if (
        isLowerThan({
          baseDate: selectedDateRange.start,
          targetDate: newSelectedDate
        })
      ) {
        newSelectedDateRange = { ...selectedDateRange, start: newSelectedDate };
      } else {
        newSelectedDateRange = { ...selectedDateRange, end: newSelectedDate };
      }
    } else {
      newSelectedDateRange = { start: newSelectedDate, end: null };
    }
    handleChange(newSelectedDateRange);
    switch (baseCalendarType) {
      case 'year':
        if (onYearChange) onYearChange(newSelectedDateRange);
        break;
      case 'month':
        if (onMonthChange) onMonthChange(newSelectedDateRange);
        break;
      case 'day': {
        if (onDayChange) onDayChange(newSelectedDateRange);
      }
    }
  };

  const getCommonProps = {
    locale,
    displayedDate,
    selectedDate: selectedDateRange,
    onSelect: handleSelect,
    minDate,
    maxDate,
    readOnly,
    disabled
  };

  let calendar: React.ReactNode;
  switch (baseCalendarType) {
    case 'year':
      calendar = (
        <YearRangeCalendar
          yearsOrder={yearsOrder}
          renderYear={renderYear}
          {...getCommonProps}
        />
      );
      break;
    case 'month':
      switch (monthCalendarsOrientation) {
        case 'horizontal':
          calendar = (
            <HorizontalMonthRangeCalendars
              monthCalendars={horizontalMonthCalendars}
              renderMonth={renderMonth}
              onPrevYear={(prevYear) => setDisplayedDate(prevYear)}
              onNextYear={(nextYear) => setDisplayedDate(nextYear)}
              {...getCommonProps}
            />
          );
          break;
        case 'vertical':
          calendar = (
            <VerticalMonthRangeCalendars
              monthCalendars={verticalMonthCalendars}
              renderMonth={renderMonth}
              {...getCommonProps}
            />
          );
      }
      break;
    case 'day':
      switch (dayCalendarsOrientation) {
        case 'horizontal':
          calendar = (
            <HorizontalDayRangeCalendars
              dayCalendars={horizontalDayCalendars}
              renderDay={renderDay}
              disabledDates={disabledDates}
              showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
              fixedWeekNumber={fixedWeekNumber}
              displayWeekNumber={displayWeekNumber}
              onPrevMonth={(prevMonth) => setDisplayedDate(prevMonth)}
              onNextMonth={(nextMonth) => setDisplayedDate(nextMonth)}
              {...getCommonProps}
            />
          );
          break;
        case 'vertical':
          calendar = (
            <VerticalDayRangeCalendars
              dayCalendars={verticalDayCalendars}
              renderDay={renderDay}
              disabledDates={disabledDates}
              showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
              fixedWeekNumber={fixedWeekNumber}
              displayWeekNumber={displayWeekNumber}
              {...getCommonProps}
            />
          );
      }
  }

  return (
    <Component
      className={cn('JinniDateRangeCalendar', className)}
      style={newStyle}
      {...rest}
    >
      {calendar}
    </Component>
  );
};

export default DateRangeCalendar;
