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
    ...rest
  } = props;
  const {
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

  const commonProps = {
    value: selectedDate,
    onChange: (newDate: Date) => {
      changeToBaseCalendar();
      onSelectDate(newDate);
    },
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
    yearsOrder,
    renderYear
  };
  const dateMonthCalendarProps = {
    ...commonProps,
    renderMonth,
    onYearClick: changeToYearCalendar
  };
  const dateDayCalendarProps = {
    ...commonProps,
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
