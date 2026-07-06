'use client';

import './DayRangeCalendar.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import DayCalendar, { DayCalendarProps } from '@/components/DayCalendar';
import { DayProps } from '@/components/Day';
import {
  RangeDisabledDatesFnType,
  RangeFieldType,
  RangeType
} from '@/types/date-component';
import {
  useSelectedDateValue,
  useHoveredDateValue
} from './DayRangeCalendar.hooks';
import RangeDay from './RangeDay';

export type DayRangeCalendarProps<T extends AsType = 'div'> = Omit<
  DayCalendarProps<T>,
  'selectedDate' | 'onDayChange' | 'renderDay' | 'disabledDates'
> & {
  selectedDate?: RangeType<Date | null>;
  onSelectDate?: (
    newSelectedDate: RangeType<Date | null>,
    selectedDate?: Date
  ) => void;
  hoveredDate?: Date | null;
  onHoverDate?: (newHoveredDate: Date | null) => void;
  disabledDates?: Array<Date> | RangeDisabledDatesFnType;
};

const DayRangeCalendar = <T extends AsType = 'div'>(
  props: DayRangeCalendarProps<T>
) => {
  const {
    selectedDate,
    onSelectDate,
    hoveredDate,
    onHoverDate,
    disabledDates,
    className,
    ...rest
  } = props;
  const { selectedDateValue, handleSelect } = useSelectedDateValue({
    selectedDate,
    onSelectDate
  });
  const { hoveredDateValue, handleHover } = useHoveredDateValue({
    hoveredDate,
    onHoverDate
  });
  const rangeField: RangeFieldType =
    selectedDateValue.start && !selectedDateValue.end ? 'end' : 'start';

  const renderRangeDay = (yearProps: Omit<DayProps, 'ref'>) => {
    return (
      <RangeDay
        selectedDateValue={selectedDateValue}
        handleSelect={handleSelect}
        hoveredDateValue={hoveredDateValue}
        handleHover={handleHover}
        {...yearProps}
      />
    );
  };

  return (
    <DayCalendar
      className={cn('JinniDayRangeCalendar', className)}
      renderDay={renderRangeDay}
      disabledDates={
        !disabledDates || Array.isArray(disabledDates)
          ? disabledDates
          : ({ date }) => disabledDates({ date, rangeField })
      }
      {...(rest as DayCalendarProps<T>)}
    />
  );
};

export default DayRangeCalendar;
