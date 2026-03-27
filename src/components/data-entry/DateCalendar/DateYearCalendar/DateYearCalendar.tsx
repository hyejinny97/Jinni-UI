import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { DateComponentProps } from '@/types/date-component';
import {
  YearCalendar,
  YearCalendarMainProps
} from '@/components/data-entry/YearCalendar';
import {
  CalendarHeader,
  CalendarHeaderProps
} from '@/components/data-entry/CalendarHeader';
import useStyle from '@/hooks/useStyle';
import { useDateValue } from './DateYearCalendar.hooks';
import { getLocaleYear } from '@/utils/date-component';

export type DateYearCalendarProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'defaultValue' | 'onChange'
> &
  Omit<DateComponentProps, 'disabledDates'> &
  YearCalendarMainProps & {
    referenceDate?: Date;
    renderCalendarHeader?: (
      calendarHeaderProps: CalendarHeaderProps
    ) => React.ReactNode;
  };

const DateYearCalendar = <T extends AsType = 'div'>(
  props: DateYearCalendarProps<T>
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
    renderYear,
    renderCalendarHeader = (calendarHeaderProps: CalendarHeaderProps) => (
      <CalendarHeader {...calendarHeaderProps} />
    ),
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const { selectedDate, displayedDate, onYearChange } = useDateValue({
    defaultValue,
    value,
    onChange,
    referenceDate
  });
  const newStyle = useStyle(style);

  const calendarHeaderProps = {
    children: getLocaleYear({ locale, options, date: displayedDate }),
    hidePrevButton: true,
    hideNextButton: true
  };
  const yearCalendarProps = {
    displayedDate,
    selectedDate,
    onYearChange,
    locale,
    minDate,
    maxDate,
    readOnly,
    disabled,
    yearsOrder,
    renderYear
  };

  return (
    <Component
      className={cn('JinniDateYearCalendar', className)}
      style={newStyle}
      {...rest}
    >
      {renderCalendarHeader(calendarHeaderProps)}
      <YearCalendar {...yearCalendarProps} />
    </Component>
  );
};

export default DateYearCalendar;
