'use client';

import './MonthRangeCalendar.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import MonthCalendar, { MonthCalendarProps } from '@/components/MonthCalendar';
import { MonthProps } from '@/components/Month';
import {
  RangeDisabledDatesFnType,
  RangeFieldType,
  RangeType
} from '@/types/date-component';
import {
  useSelectedDateValue,
  useHoveredDateValue
} from './MonthRangeCalendar.hooks';
import RangeMonth from './RangeMonth';

export type MonthRangeCalendarProps<T extends AsType = 'div'> = Omit<
  MonthCalendarProps<T>,
  'selectedDate' | 'onMonthChange' | 'renderMonth' | 'disabledDates'
> & {
  selectedDate?: RangeType<Date | null>;
  onSelectDate?: (
    newSelectedDate: RangeType<Date | null>,
    selectedDate?: Date
  ) => void;
  hoveredDate?: Date | null;
  onHoverDate?: (newHoveredDate: Date | null) => void;
  disabledDates?: RangeDisabledDatesFnType;
};

const MonthRangeCalendar = <T extends AsType = 'div'>(
  props: MonthRangeCalendarProps<T>
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

  const renderRangeMonth = (yearProps: Omit<MonthProps, 'ref'>) => {
    return (
      <RangeMonth
        selectedDateValue={selectedDateValue}
        handleSelect={handleSelect}
        hoveredDateValue={hoveredDateValue}
        handleHover={handleHover}
        {...yearProps}
      />
    );
  };

  return (
    <MonthCalendar
      className={cn('JinniMonthRangeCalendar', className)}
      spacing={0}
      renderMonth={renderRangeMonth}
      {...(disabledDates && {
        disabledDates: ({ date }) => disabledDates({ date, rangeField })
      })}
      {...(rest as MonthCalendarProps<T>)}
    />
  );
};

export default MonthRangeCalendar;
