'use client';

import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import {
  DateComponentProps,
  DisabledDatesWithUnitFnType
} from '@/types/date-component';
import CalendarHeader, {
  CalendarHeaderProps
} from '@/components/CalendarHeader';
import { YearCalendarMainProps } from '@/components/YearCalendar';
import { MonthCalendarMainProps } from '@/components/MonthCalendar';
import { DayCalendarMainProps } from '@/components/DayCalendar';
import DateYearCalendar, { DateYearCalendarProps } from '../DateYearCalendar';
import DateMonthCalendar, {
  DateMonthCalendarProps
} from '../DateMonthCalendar';
import DateDayCalendar, { DateDayCalendarProps } from '../DateDayCalendar';
import { useCalendarType, useDateValue } from './DateCalendar.hooks';
import { CalendarType } from '@/types/date-component';
import {
  disabledDatesInDayCalendar,
  disabledDatesInMonthCalendar,
  disabledDatesInYearCalendar
} from './DateCalendar.utils';

export type DateCalendarProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'defaultValue' | 'onChange'
> &
  DateComponentProps &
  YearCalendarMainProps &
  MonthCalendarMainProps &
  DayCalendarMainProps & {
    referenceDate?: Date;
    renderCalendarHeader?: (
      calendarHeaderProps: CalendarHeaderProps
    ) => React.ReactNode;
    onBaseCalendarTypeChange?: () => void;
    disabledDates?: Array<Date> | DisabledDatesWithUnitFnType;
  };

const DateCalendar = <T extends AsType = 'div'>(
  props: DateCalendarProps<T>
) => {
  const {
    defaultValue,
    value,
    onChange,
    locale,
    options,
    disabledDates,
    readOnly,
    disabled,
    referenceDate,
    yearsOrder,
    showDaysOutsideCurrentMonth,
    fixedWeekNumber,
    displayWeekNumber,
    renderYear,
    renderMonth,
    renderDay,
    renderCalendarHeader = (calendarHeaderProps: CalendarHeaderProps) => (
      <CalendarHeader {...calendarHeaderProps} />
    ),
    onBaseCalendarTypeChange,
    className,
    ...rest
  } = props;
  const {
    baseCalendarType,
    calendarType,
    changeToYearCalendar,
    changeToMonthCalendar,
    changeToBaseCalendar
  } = useCalendarType({ locale, options });
  const { selectedDate, onSelectDate } = useDateValue({
    defaultValue,
    value,
    onChange
  });

  const handleChange = (calendarType: CalendarType) => (newDate: Date) => {
    onSelectDate(newDate);
    changeToBaseCalendar();
    if (calendarType === baseCalendarType) onBaseCalendarTypeChange?.();
  };

  const commonProps = {
    className: cn('JinniDateCalendar', className),
    value: selectedDate,
    locale,
    options,
    readOnly,
    disabled,
    referenceDate,
    renderCalendarHeader,
    ...rest
  };
  const dateYearCalendarProps: DateYearCalendarProps = {
    ...commonProps,
    onChange: handleChange('year'),
    yearsOrder,
    renderYear,
    disabledDates: disabledDatesInYearCalendar(disabledDates)
  };
  const dateMonthCalendarProps: DateMonthCalendarProps = {
    ...commonProps,
    onChange: handleChange('month'),
    renderMonth,
    onYearClick: changeToYearCalendar,
    disabledDates: disabledDatesInMonthCalendar(disabledDates)
  };
  const dateDayCalendarProps: DateDayCalendarProps = {
    ...commonProps,
    onChange: handleChange('day'),
    showDaysOutsideCurrentMonth,
    fixedWeekNumber,
    displayWeekNumber,
    renderDay,
    onYearClick: changeToYearCalendar,
    onMonthClick: changeToMonthCalendar,
    disabledDates: disabledDatesInDayCalendar(disabledDates)
  };

  switch (calendarType) {
    case 'year':
      return <DateYearCalendar {...dateYearCalendarProps} />;
    case 'month':
      return <DateMonthCalendar {...dateMonthCalendarProps} />;
    case 'day':
      return <DateDayCalendar {...dateDayCalendarProps} />;
  }
};

export default DateCalendar;
