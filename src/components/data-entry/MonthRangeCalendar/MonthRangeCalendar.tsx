import './MonthRangeCalendar.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import {
  MonthCalendar,
  MonthCalendarProps,
  MonthProps
} from '@/components/data-entry/MonthCalendar';
import { RangeType } from '@/types/date-component';
import {
  useSelectedDateValue,
  useHoveredDateValue
} from './MonthRangeCalendar.hooks';
import { RangeMonth } from './RangeMonth';

export type MonthRangeCalendarProps<T extends AsType = 'div'> = Omit<
  MonthCalendarProps<T>,
  'selectedDate' | 'onMonthChange' | 'renderMonth'
> & {
  selectedDate?: RangeType<Date | null>;
  onSelectDate?: (
    newSelectedDate: RangeType<Date | null>,
    selectedDate?: Date
  ) => void;
  hoveredDate?: Date | null;
  onHoverDate?: (newHoveredDate: Date | null) => void;
};

const MonthRangeCalendar = <T extends AsType = 'div'>(
  props: MonthRangeCalendarProps<T>
) => {
  const {
    selectedDate,
    onSelectDate,
    hoveredDate,
    onHoverDate,
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
      {...rest}
    />
  );
};

export default MonthRangeCalendar;
