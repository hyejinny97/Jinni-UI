import './CalendarHeader.scss';
import { useMemo } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { DateOptions } from '@/components/data-entry/DateField';
import { CalendarType } from './CalendarHeader.types';
import { getDateParts } from './CalendarHeader.utils';
import { ButtonBase } from '@/components/general/ButtonBase';
import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';

export type CalendarHeaderProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    type: CalendarType;
    locale?: string;
    options?: DateOptions;
    displayedDate: Date;
    onYearClick?: () => void;
    onMonthClick?: () => void;
    onPrevMonth?: (prevMonth: Date) => void;
    onNextMonth?: (nextMonth: Date) => void;
    readOnly?: boolean;
    disabled?: boolean;
  };

const CalendarHeader = <T extends AsType = 'div'>(
  props: CalendarHeaderProps<T>
) => {
  const {
    type,
    locale,
    options,
    displayedDate,
    onYearClick,
    onMonthClick,
    onPrevMonth,
    onNextMonth,
    readOnly = false,
    disabled = false,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const dateParts = useMemo(
    () =>
      getDateParts({
        type,
        locale,
        options,
        date: displayedDate
      }),
    [type, locale, options, displayedDate]
  );
  const newStyle = useStyle(style);

  const isClickable = (
    partType: keyof Intl.DateTimeFormatPartTypesRegistry
  ) => {
    if (disabled || readOnly) return;
    if (type === 'month' && partType === 'year') {
      return true;
    }
    if (type === 'day' && ['year', 'month'].includes(partType)) {
      return true;
    }
    return false;
  };
  const handlePartClick = (
    partType: keyof Intl.DateTimeFormatPartTypesRegistry
  ) => {
    if (partType === 'year' && onYearClick) onYearClick();
    else if (partType === 'month' && onMonthClick) onMonthClick();
  };
  const handlePrevMonthClick = () => {
    const prevMonth = new Date(displayedDate);
    prevMonth.setMonth(displayedDate.getMonth() - 1);
    prevMonth.setDate(1);
    if (onPrevMonth) onPrevMonth(prevMonth);
  };
  const handleNextMonthClick = () => {
    const nextMonth = new Date(displayedDate);
    nextMonth.setMonth(displayedDate.getMonth() + 1);
    nextMonth.setDate(1);
    if (onNextMonth) onNextMonth(nextMonth);
  };

  return (
    <Component
      className={cn('JinniCalendarHeader', type, className)}
      style={newStyle}
      {...rest}
    >
      {type === 'day' && (
        <ButtonBase
          className="JinniCalendarHeaderControlButton"
          onClick={handlePrevMonthClick}
        >
          <ArrowLeftIcon color="gray-500" />
        </ButtonBase>
      )}
      <div>
        {dateParts.map((part, idx) => {
          const hasBlank = part.type === 'literal' && part.value.includes(' ');
          return isClickable(part.type) ? (
            <ButtonBase
              key={part.type}
              className="JinniCalendarHeaderDatePart"
              onClick={() => handlePartClick(part.type)}
            >
              {part.value}
            </ButtonBase>
          ) : (
            <div key={idx} className="JinniCalendarHeaderDatePart">
              {hasBlank ? part.value.replace(' ', '\u00A0') : part.value}
            </div>
          );
        })}
      </div>
      {type === 'day' && (
        <ButtonBase
          className="JinniCalendarHeaderControlButton"
          onClick={handleNextMonthClick}
        >
          <ArrowRightIcon color="gray-500" />
        </ButtonBase>
      )}
    </Component>
  );
};

export default CalendarHeader;
