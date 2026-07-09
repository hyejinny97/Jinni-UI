'use client';

import './DateYearRangeCalendar.scss';
import cn from 'classnames';
import { useMemo } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import {
  DateRangeComponentProps,
  RangeDisabledDatesFnType
} from '@/types/date-component';
import { YearCalendarMainProps } from '@/components/YearCalendar';
import YearRangeCalendar from '@/components/YearRangeCalendar';
import CalendarHeader, {
  CalendarHeaderProps
} from '@/components/CalendarHeader';
import useStyle from '@/hooks/useStyle';
import { useDateValue } from './DateYearRangeCalendar.hooks';
import { getYearDateTimeFormat } from '@/utils/date-component';

export type DateYearRangeCalendarProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'defaultValue' | 'onChange'
> &
  DateRangeComponentProps &
  Omit<YearCalendarMainProps, 'renderYear'> & {
    referenceDate?: Date;
    renderCalendarHeader?: (
      calendarHeaderProps: CalendarHeaderProps
    ) => React.ReactNode;
    disabledDates?: RangeDisabledDatesFnType;
  };

const DateYearRangeCalendar = <T extends AsType = 'div'>(
  props: DateYearRangeCalendarProps<T>
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
    referenceDate,
    renderCalendarHeader = (calendarHeaderProps: CalendarHeaderProps) => (
      <CalendarHeader {...calendarHeaderProps} />
    ),
    className,
    style,
    as,
    ...rest
  } = props;
  const Component = (as ?? 'div') as React.ElementType;
  const { selectedDate, displayedDate, onSelectDate } = useDateValue({
    defaultValue,
    value,
    onChange,
    referenceDate
  });
  const yearDateTimeFormat = useMemo(
    () => getYearDateTimeFormat({ locale, options }),
    [locale, options]
  );
  const startLocaleYear =
    selectedDate.start && yearDateTimeFormat.format(selectedDate.start);
  const endLocaleYear =
    selectedDate.end && yearDateTimeFormat.format(selectedDate.end);
  const newStyle = useStyle(style);

  const calendarHeaderProps = {
    children: (
      <>
        <span className="start-year">{startLocaleYear}</span>
        <span>-</span>
        <span className="end-year">{endLocaleYear}</span>
      </>
    ),
    hidePrevButton: true,
    hideNextButton: true
  };
  const yearRangeCalendarProps = {
    displayedDate,
    selectedDate,
    onSelectDate,
    locale,
    disabledDates,
    readOnly,
    disabled,
    yearsOrder
  };

  return (
    <Component
      className={cn('JinniDateYearRangeCalendar', className)}
      style={newStyle}
      {...rest}
    >
      {renderCalendarHeader(calendarHeaderProps)}
      <YearRangeCalendar {...yearRangeCalendarProps} />
    </Component>
  );
};

export default DateYearRangeCalendar;
