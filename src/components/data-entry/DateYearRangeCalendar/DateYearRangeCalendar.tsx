import './DateYearRangeCalendar.scss';
import cn from 'classnames';
import { useMemo } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { DateRangeComponentProps } from '@/types/date-component';
import { YearCalendarMainProps } from '@/components/data-entry/YearCalendar';
import { YearRangeCalendar } from '@/components/data-entry/YearRangeCalendar';
import {
  CalendarHeader,
  CalendarHeaderProps
} from '@/components/data-entry/CalendarHeader';
import useStyle from '@/hooks/useStyle';
import { useDateValue } from './DateYearRangeCalendar.hooks';
import { getYearDateTimeFormat } from '@/utils/date-component';

export type DateYearRangeCalendarProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'defaultValue' | 'onChange'
> &
  Omit<DateRangeComponentProps, 'disabledDates'> &
  Omit<YearCalendarMainProps, 'renderYear'> & {
    referenceDate?: Date;
    renderCalendarHeader?: (
      calendarHeaderProps: CalendarHeaderProps
    ) => React.ReactNode;
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
    minDate,
    maxDate,
    readOnly,
    disabled,
    yearsOrder,
    referenceDate,
    renderCalendarHeader = (calendarHeaderProps: CalendarHeaderProps) => (
      <CalendarHeader {...calendarHeaderProps} />
    ),
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
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
    minDate,
    maxDate,
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
