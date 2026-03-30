import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { DateComponentProps } from '@/types/date-component';
import {
  CalendarHeader,
  CalendarHeaderProps
} from '@/components/data-entry/CalendarHeader';
import { YearCalendarMainProps } from '@/components/data-entry/YearCalendar';
import { MonthCalendarMainProps } from '@/components/data-entry/MonthCalendar';
import { DayCalendarMainProps } from '@/components/data-entry/DayCalendar';
import { DateYearCalendar } from './DateYearCalendar';
import { DateMonthCalendar } from './DateMonthCalendar';
import { DateDayCalendar } from './DateDayCalendar';
import { useCalendarType, useDateValue } from './DateCalendar.hooks';
import { CalendarType } from '@/types/date-component';

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
    minDate,
    maxDate,
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
    value: selectedDate,
    locale,
    options,
    minDate,
    maxDate,
    readOnly,
    disabled,
    referenceDate,
    renderCalendarHeader,
    ...rest
  };
  const dateYearCalendarProps = {
    ...commonProps,
    onChange: handleChange('year'),
    yearsOrder,
    renderYear
  };
  const dateMonthCalendarProps = {
    ...commonProps,
    onChange: handleChange('month'),
    renderMonth,
    onYearClick: changeToYearCalendar
  };
  const dateDayCalendarProps = {
    ...commonProps,
    onChange: handleChange('day'),
    disabledDates,
    showDaysOutsideCurrentMonth,
    fixedWeekNumber,
    displayWeekNumber,
    renderDay,
    onYearClick: changeToYearCalendar,
    onMonthClick: changeToMonthCalendar
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
