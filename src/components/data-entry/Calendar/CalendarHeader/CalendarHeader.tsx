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
    selectedDate?: Date | null;
    referenceDate?: Date;
    onYearClick?: () => void;
    onMonthClick?: () => void;
    onPrevMonth?: () => void;
    onNextMonth?: () => void;
  };

const CalendarHeader = <T extends AsType = 'div'>(
  props: CalendarHeaderProps<T>
) => {
  const {
    type,
    locale,
    options,
    selectedDate,
    referenceDate,
    onYearClick,
    onMonthClick,
    onPrevMonth,
    onNextMonth,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const todayDate = new Date();
  const dateParts = useMemo(
    () =>
      getDateParts({
        type,
        locale,
        options,
        date: selectedDate || referenceDate || todayDate
      }),
    [type, locale, options, selectedDate, referenceDate, todayDate]
  );
  const newStyle = useStyle(style);

  const isClickable = (
    partType: keyof Intl.DateTimeFormatPartTypesRegistry
  ) => {
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

  return (
    <Component
      className={cn('JinniCalendarHeader', type, className)}
      style={newStyle}
      {...rest}
    >
      {type === 'day' && (
        <ButtonBase
          className="JinniCalendarHeaderControlButton"
          onClick={onPrevMonth}
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
              className="JinniCalendarHeaderDatePart clickable"
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
          onClick={onNextMonth}
        >
          <ArrowRightIcon color="gray-500" />
        </ButtonBase>
      )}
    </Component>
  );
};

export default CalendarHeader;
