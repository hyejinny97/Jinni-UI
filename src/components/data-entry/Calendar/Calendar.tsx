import './Calendar.scss';
import { useState, useMemo } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { DateOptions } from '@/components/data-entry/DateField';
import { useSelectedDate } from './Calendar.hooks';
import { getBaseCalendarType } from './Calendar.utils';
import { CalendarHeader, CalendarType } from './CalendarHeader';
import { DayCalendar } from './DayCalendar';
import { MonthCalendar } from './MonthCalendar';
import { YearCalendar } from './YearCalendar';

export type CalendarProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'defaultValue' | 'onChange'
> & {
  defaultValue?: Date;
  value?: Date | null;
  referenceDate?: Date;
  onChange?: (value: Date) => void;
  onYearChange?: (value: Date) => void;
  onMonthChange?: (value: Date) => void;
  onDayChange?: (value: Date) => void;
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
};

const Calendar = <T extends AsType = 'div'>(props: CalendarProps<T>) => {
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
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const baseCalendarType = useMemo(
    () => getBaseCalendarType({ locale, options }),
    [locale, options]
  );
  const [displayedCalendarType, setDisplayedCalendarType] =
    useState<CalendarType>(baseCalendarType);
  const { selectedDate, handleChange } = useSelectedDate({
    defaultValue,
    value,
    onChange
  });
  const todayDate = new Date();
  const [displayedDate, setDisplayedDate] = useState<Date>(
    selectedDate || referenceDate || todayDate
  );
  const newStyle = useStyle(style);

  const handleSelect =
    (calendarType: CalendarType) => (newSelectedDate: Date) => {
      handleChange(newSelectedDate);
      setDisplayedCalendarType(baseCalendarType);
      setDisplayedDate(newSelectedDate);
      switch (calendarType) {
        case 'year':
          if (onYearChange) onYearChange(newSelectedDate);
          break;
        case 'month':
          if (onMonthChange) onMonthChange(newSelectedDate);
          break;
        case 'day': {
          if (onDayChange) onDayChange(newSelectedDate);
        }
      }
    };

  const getCommonProps = (calendarType: CalendarType) => ({
    locale,
    displayedDate,
    selectedDate,
    onSelect: handleSelect(calendarType),
    minDate,
    maxDate,
    readOnly,
    disabled
  });

  return (
    <Component
      className={cn('JinniCalendar', className)}
      style={newStyle}
      {...rest}
    >
      <CalendarHeader
        type={displayedCalendarType}
        displayedDate={displayedDate}
        locale={locale}
        options={options}
        onPrevMonth={setDisplayedDate}
        onNextMonth={setDisplayedDate}
        onYearClick={() => setDisplayedCalendarType('year')}
        onMonthClick={() => setDisplayedCalendarType('month')}
        readOnly={readOnly}
        disabled={disabled}
      />
      {displayedCalendarType === 'year' && (
        <YearCalendar {...getCommonProps('year')} yearsOrder={yearsOrder} />
      )}
      {displayedCalendarType === 'month' && (
        <MonthCalendar {...getCommonProps('month')} />
      )}
      {displayedCalendarType === 'day' && (
        <DayCalendar
          {...getCommonProps('day')}
          disabledDates={disabledDates}
          showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
          fixedWeekNumber={fixedWeekNumber}
          displayWeekNumber={displayWeekNumber}
        />
      )}
    </Component>
  );
};

export default Calendar;
