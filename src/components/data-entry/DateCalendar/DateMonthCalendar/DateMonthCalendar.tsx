import './DateMonthCalendar.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { DateComponentProps } from '@/types/date-component';
import {
  MonthCalendar,
  MonthCalendarMainProps
} from '@/components/data-entry/MonthCalendar';
import {
  CalendarHeader,
  CalendarHeaderProps
} from '@/components/data-entry/CalendarHeader';
import useStyle from '@/hooks/useStyle';
import { useDateValue } from './DateMonthCalendar.hooks';
import { getYearMonthParts } from './DateMonthCalendar.utils';
import { ButtonBase } from '@/components/general/ButtonBase';

export type DateMonthCalendarProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'defaultValue' | 'onChange'
> &
  Omit<DateComponentProps, 'disabledDates'> &
  MonthCalendarMainProps & {
    onYearClick?: () => void;
    renderCalendarHeader?: (
      calendarHeaderProps: CalendarHeaderProps
    ) => React.ReactNode;
  };

const DateMonthCalendar = <T extends AsType = 'div'>(
  props: DateMonthCalendarProps<T>
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
    renderMonth,
    onYearClick,
    renderCalendarHeader = (calendarHeaderProps: CalendarHeaderProps) => (
      <CalendarHeader {...calendarHeaderProps} />
    ),
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const { selectedDate, displayedDate, changeMonth } = useDateValue({
    defaultValue,
    value,
    onChange,
    referenceDate
  });
  const yearMonthParts = getYearMonthParts({ locale, options, displayedDate });
  const newStyle = useStyle(style);

  const calendarHeaderProps = {
    children: (
      <>
        {yearMonthParts.map((part, idx) => {
          const { type, value } = part;
          const hasBlank = type === 'literal' && value.includes(' ');
          return type === 'year' ? (
            <ButtonBase
              key={type}
              className="JinniCalendarHeaderDatePart"
              onClick={onYearClick}
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
    hidePrevButton: true,
    hideNextButton: true
  };
  const monthCalendarProps = {
    value: selectedDate,
    onChange: changeMonth,
    locale,
    minDate,
    maxDate,
    readOnly,
    disabled,
    referenceDate,
    renderMonth
  };

  return (
    <Component
      className={cn('JinniDateMonthCalendar', className)}
      style={newStyle}
      {...rest}
    >
      {renderCalendarHeader(calendarHeaderProps)}
      <MonthCalendar {...monthCalendarProps} />
    </Component>
  );
};

export default DateMonthCalendar;
