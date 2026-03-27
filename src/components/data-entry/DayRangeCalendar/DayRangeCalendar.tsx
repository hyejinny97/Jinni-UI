import './DayRangeCalendar.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import {
  DayCalendar,
  DayCalendarProps,
  DayProps
} from '@/components/data-entry/DayCalendar';
import { RangeType } from '@/types/date-component';
import {
  useSelectedDateValue,
  useHoveredDateValue
} from './DayRangeCalendar.hooks';
import { RangeDay } from './RangeDay';

export type DayRangeCalendarProps<T extends AsType = 'div'> = Omit<
  DayCalendarProps<T>,
  'selectedDate' | 'onDayChange' | 'renderDay'
> & {
  selectedDate?: RangeType<Date | null>;
  onSelectDate?: (newSelectedDate: RangeType<Date | null>) => void;
  hoveredDate?: Date | null;
  onHoverDate?: (newHoveredDate: Date | null) => void;
};

const DayRangeCalendar = <T extends AsType = 'div'>(
  props: DayRangeCalendarProps<T>
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
      {...rest}
    />
  );
};

export default DayRangeCalendar;
