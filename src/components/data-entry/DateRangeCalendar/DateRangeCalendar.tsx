import cn from 'classnames';
import { useMemo } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { DateRangeComponentProps } from '@/types/date-component';
import { YearCalendarMainProps } from '@/components/data-entry/YearCalendar';
import { MonthCalendarMainProps } from '@/components/data-entry/MonthCalendar';
import { DayCalendarMainProps } from '@/components/data-entry/DayCalendar';
import { DateYearRangeCalendar } from './DateYearRangeCalendar';
import { HDateMonthRangeCalendar } from './HDateMonthRangeCalendar';
import { VDateMonthRangeCalendar } from './VDateMonthRangeCalendar';
import { HDateDayRangeCalendar } from './HDateDayRangeCalendar';
import { VDateDayRangeCalendar } from './VDateDayRangeCalendar';
import { CalendarHeaderProps } from '@/components/data-entry/CalendarHeader';
import { getBaseCalendarType } from '@/utils/date-component';

type Orientation = 'horizontal' | 'vertical';

export type DateRangeCalendarProps<
  T extends AsType = 'div',
  MonthOrientation extends Orientation = 'horizontal',
  DayOrientation extends Orientation = 'horizontal'
> = Omit<DefaultComponentProps<T>, 'defaultValue' | 'onChange'> &
  DateRangeComponentProps &
  Omit<YearCalendarMainProps, 'renderYear'> &
  Omit<MonthCalendarMainProps, 'renderMonth'> &
  Omit<DayCalendarMainProps, 'renderDay'> & {
    monthCalendarsOrientation?: MonthOrientation;
    dayCalendarsOrientation?: DayOrientation;
    monthCalendars?: MonthOrientation extends 'horizontal' ? 1 | 2 | 3 : number;
    dayCalendars?: DayOrientation extends 'horizontal' ? 1 | 2 | 3 : number;
    referenceDate?: Date;
    renderCalendarHeader?: (
      calendarHeaderProps: CalendarHeaderProps
    ) => React.ReactNode;
  };

const DateRangeCalendar = <
  T extends AsType = 'div',
  MonthOrientation extends Orientation = 'horizontal',
  DayOrientation extends Orientation = 'horizontal'
>(
  props: DateRangeCalendarProps<T, MonthOrientation, DayOrientation>
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
    yearsOrder,
    showDaysOutsideCurrentMonth,
    fixedWeekNumber,
    displayWeekNumber,
    monthCalendarsOrientation = 'horizontal',
    dayCalendarsOrientation = 'horizontal',
    monthCalendars,
    dayCalendars,
    referenceDate,
    renderCalendarHeader,
    className,
    ...rest
  } = props;
  const baseCalendarType = useMemo(
    () => getBaseCalendarType({ locale, options }),
    [locale, options]
  );

  const commonProps = {
    className: cn('JinniDateRangeCalendar', className),
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
    renderCalendarHeader,
    ...rest
  };
  const dateYearRangeCalendarProps = {
    ...commonProps,
    yearsOrder
  };
  const dateMonthRangeCalendarProps = {
    ...commonProps
  };
  const dateDayRangeCalendarProps = {
    ...commonProps,
    disabledDates,
    showDaysOutsideCurrentMonth,
    fixedWeekNumber,
    displayWeekNumber
  };

  switch (baseCalendarType) {
    case 'year':
      return <DateYearRangeCalendar {...dateYearRangeCalendarProps} />;
    case 'month': {
      switch (monthCalendarsOrientation) {
        case 'horizontal':
          return (
            <HDateMonthRangeCalendar
              monthCalendars={monthCalendars as 1 | 2 | 3 | undefined}
              {...dateMonthRangeCalendarProps}
            />
          );
        case 'vertical':
          return (
            <VDateMonthRangeCalendar
              monthCalendars={monthCalendars as number | undefined}
              {...dateMonthRangeCalendarProps}
            />
          );
      }
      break;
    }
    case 'day': {
      switch (dayCalendarsOrientation) {
        case 'horizontal':
          return (
            <HDateDayRangeCalendar
              dayCalendars={dayCalendars as 1 | 2 | 3 | undefined}
              {...dateDayRangeCalendarProps}
            />
          );
        case 'vertical':
          return (
            <VDateDayRangeCalendar
              dayCalendars={dayCalendars as number | undefined}
              {...dateDayRangeCalendarProps}
            />
          );
      }
    }
  }
};

export default DateRangeCalendar;
