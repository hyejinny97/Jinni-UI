import './DateDayCalendar.scss';
import cn from 'classnames';
import { useMemo } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { DateComponentProps } from '@/types/date-component';
import {
  DayCalendar,
  DayCalendarMainProps
} from '@/components/data-entry/DayCalendar';
import {
  CalendarHeader,
  CalendarHeaderProps
} from '@/components/data-entry/CalendarHeader';
import useStyle from '@/hooks/useStyle';
import { useDateValue } from './DateDayCalendar.hooks';
import { getYearMonthDateTimeFormat } from '@/utils/date-component';
import { ButtonBase } from '@/components/general/ButtonBase';

export type DateDayCalendarProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'defaultValue' | 'onChange'
> &
  DateComponentProps &
  DayCalendarMainProps & {
    referenceDate?: Date;
    onYearClick?: () => void;
    onMonthClick?: () => void;
    renderCalendarHeader?: (
      calendarHeaderProps: CalendarHeaderProps
    ) => React.ReactNode;
  };

const DateDayCalendar = <T extends AsType = 'div'>(
  props: DateDayCalendarProps<T>
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
    showDaysOutsideCurrentMonth,
    fixedWeekNumber,
    displayWeekNumber,
    renderDay,
    onYearClick,
    onMonthClick,
    renderCalendarHeader = (calendarHeaderProps: CalendarHeaderProps) => (
      <CalendarHeader {...calendarHeaderProps} />
    ),
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const {
    selectedDate,
    displayedDate,
    onDayChange,
    goToPrevMonth,
    goToNextMonth
  } = useDateValue({
    defaultValue,
    value,
    onChange,
    referenceDate
  });
  const yearMonthDateTimeFormat = useMemo(
    () => getYearMonthDateTimeFormat({ locale, options }),
    [locale, options]
  );
  const yearMonthParts = yearMonthDateTimeFormat.formatToParts(displayedDate);
  const newStyle = useStyle(style);

  const calendarHeaderProps = {
    children: (
      <>
        {yearMonthParts.map((part, idx) => {
          const { type, value } = part;
          const hasBlank = type === 'literal' && value.includes(' ');
          return type === 'year' || type === 'month' ? (
            <ButtonBase
              key={type}
              className="JinniCalendarHeaderDatePart"
              onClick={type === 'year' ? onYearClick : onMonthClick}
            >
              {value}
            </ButtonBase>
          ) : (
            <span
              key={idx}
              className={cn('JinniCalendarHeaderDatePart', 'literal-type')}
            >
              {hasBlank ? value.replace(/\s/g, '\u00A0') : value}
            </span>
          );
        })}
      </>
    ),
    onPrevClick: goToPrevMonth,
    onNextClick: goToNextMonth
  };
  const dayCalendarProps = {
    displayedDate,
    selectedDate,
    onDayChange,
    locale,
    minDate,
    maxDate,
    disabledDates,
    readOnly,
    disabled,
    showDaysOutsideCurrentMonth,
    fixedWeekNumber,
    displayWeekNumber,
    renderDay
  };

  return (
    <Component
      className={cn('JinniDateDayCalendar', className)}
      style={newStyle}
      {...rest}
    >
      {renderCalendarHeader(calendarHeaderProps)}
      <DayCalendar {...dayCalendarProps} />
    </Component>
  );
};

export default DateDayCalendar;
