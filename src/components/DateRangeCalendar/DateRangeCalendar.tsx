'use client';

import cn from 'classnames';
import { useMemo } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import {
  DateRangeComponentProps,
  RangeDisabledDatesFnType
} from '@/types/date-component';
import { YearCalendarMainProps } from '@/components/YearCalendar';
import { MonthCalendarMainProps } from '@/components/MonthCalendar';
import { DayCalendarMainProps } from '@/components/DayCalendar';
import DateYearRangeCalendar, {
  DateYearRangeCalendarProps
} from '../DateYearRangeCalendar';
import HDateMonthRangeCalendar, {
  HDateMonthRangeCalendarProps
} from '../HDateMonthRangeCalendar';
import VDateMonthRangeCalendar, {
  VDateMonthRangeCalendarProps
} from '../VDateMonthRangeCalendar';
import HDateDayRangeCalendar, {
  HDateDayRangeCalendarProps
} from '../HDateDayRangeCalendar';
import VDateDayRangeCalendar, {
  VDateDayRangeCalendarProps
} from '../VDateDayRangeCalendar';
import { CalendarHeaderProps } from '@/components/CalendarHeader';
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
    disabledDates?: Array<Date> | RangeDisabledDatesFnType;
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
    readOnly,
    disabled,
    referenceDate,
    renderCalendarHeader,
    ...rest
  };
  const dateYearRangeCalendarProps: DateYearRangeCalendarProps = {
    ...commonProps,
    yearsOrder,
    disabledDates: Array.isArray(disabledDates) ? undefined : disabledDates
  };
  const dateMonthRangeCalendarProps = {
    ...commonProps,
    disabledDates: Array.isArray(disabledDates) ? undefined : disabledDates
  };
  const hDateMonthRangeCalendarProps: HDateMonthRangeCalendarProps = {
    ...dateMonthRangeCalendarProps,
    monthCalendars: monthCalendars as 1 | 2 | 3 | undefined
  };
  const vDateMonthRangeCalendarProps: VDateMonthRangeCalendarProps = {
    ...dateMonthRangeCalendarProps,
    monthCalendars: monthCalendars as number | undefined
  };
  const dateDayRangeCalendarProps = {
    ...commonProps,
    showDaysOutsideCurrentMonth,
    fixedWeekNumber,
    displayWeekNumber,
    disabledDates
  };
  const hDateDayRangeCalendarProps: HDateDayRangeCalendarProps = {
    ...dateDayRangeCalendarProps,
    dayCalendars: dayCalendars as 1 | 2 | 3 | undefined
  };
  const vDateDayRangeCalendarProps: VDateDayRangeCalendarProps = {
    ...dateDayRangeCalendarProps,
    dayCalendars: dayCalendars as number | undefined
  };

  switch (baseCalendarType) {
    case 'year':
      return <DateYearRangeCalendar {...dateYearRangeCalendarProps} />;
    case 'month': {
      switch (monthCalendarsOrientation) {
        case 'horizontal':
          return <HDateMonthRangeCalendar {...hDateMonthRangeCalendarProps} />;
        case 'vertical':
          return <VDateMonthRangeCalendar {...vDateMonthRangeCalendarProps} />;
      }
      break;
    }
    case 'day': {
      switch (dayCalendarsOrientation) {
        case 'horizontal':
          return <HDateDayRangeCalendar {...hDateDayRangeCalendarProps} />;
        case 'vertical':
          return <VDateDayRangeCalendar {...vDateDayRangeCalendarProps} />;
      }
    }
  }
};

export default DateRangeCalendar;
