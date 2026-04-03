import './YearRangeCalendar.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import {
  YearCalendar,
  YearCalendarProps,
  YearProps
} from '@/components/data-entry/YearCalendar';
import { RangeType } from '@/types/date-component';
import {
  useSelectedDateValue,
  useHoveredDateValue
} from './YearRangeCalendar.hooks';
import { RangeYear } from './RangeYear';

export type YearRangeCalendarProps<T extends AsType = 'div'> = Omit<
  YearCalendarProps<T>,
  'selectedDate' | 'onYearChange' | 'renderYear'
> & {
  selectedDate?: RangeType<Date | null>;
  onSelectDate?: (
    newSelectedDate: RangeType<Date | null>,
    selectedDate?: Date
  ) => void;
  hoveredDate?: Date | null;
  onHoverDate?: (newHoveredDate: Date | null) => void;
};

const YearRangeCalendar = <T extends AsType = 'div'>(
  props: YearRangeCalendarProps<T>
) => {
  const {
    yearsOrder,
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

  const renderRangeYear = (yearProps: Omit<YearProps, 'ref'>) => {
    return (
      <RangeYear
        yearsOrder={yearsOrder}
        selectedDateValue={selectedDateValue}
        handleSelect={handleSelect}
        hoveredDateValue={hoveredDateValue}
        handleHover={handleHover}
        {...yearProps}
      />
    );
  };

  return (
    <YearCalendar
      className={cn('JinniYearRangeCalendar', className)}
      spacing={0}
      yearsOrder={yearsOrder}
      renderYear={renderRangeYear}
      {...rest}
    />
  );
};

export default YearRangeCalendar;
