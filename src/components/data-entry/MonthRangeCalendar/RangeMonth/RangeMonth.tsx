import './RangeMonth.scss';
import cn from 'classnames';
import { Month, MonthProps } from '@/components/data-entry/MonthCalendar';
import { RangeType } from '@/types/date-component';
import { Box } from '@/components/layout/Box';
import { lighten } from '@/utils/colorLuminance';
import useColor from '@/hooks/useColor';
import { dateToMonth } from '@/utils/date-component';
import { isNumber } from '@/utils/isNumber';

type RangeMonthProps = Omit<MonthProps, 'ref'> & {
  selectedDateValue: RangeType<Date | null>;
  handleSelect: (dateSelected: Date) => void;
  hoveredDateValue: Date | null;
  handleHover: (dateHovered: Date | null) => void;
};

const RangeMonth = (props: RangeMonthProps) => {
  const {
    value,
    actualMonth,
    color = 'primary',
    selectedDateValue,
    handleSelect,
    hoveredDateValue,
    handleHover,
    ...rest
  } = props;
  const { start, end } = selectedDateValue;
  const normalizedColor = useColor(color);
  const lightenColor = lighten(normalizedColor, 0.8);

  const month =
    isNumber(actualMonth) && value.getMonth() - 1 === actualMonth
      ? dateToMonth(value) - 1
      : dateToMonth(value);
  const startMonth = start && dateToMonth(start);
  const endMonth = end && dateToMonth(end);
  const hoveredMonth = hoveredDateValue && dateToMonth(hoveredDateValue);

  const isInSelectRange =
    startMonth && endMonth && startMonth <= month && month <= endMonth;
  const isStartSelected = month === startMonth;
  const isEndSelected = month === endMonth;
  const isSelected = isStartSelected || isEndSelected;

  const isInHoverRange =
    startMonth &&
    !endMonth &&
    hoveredMonth &&
    startMonth <= month &&
    month <= hoveredMonth;
  const isStartHovered = isInHoverRange && isStartSelected;
  const isEndHovered = isInHoverRange && month === hoveredMonth;

  return (
    <Box
      className="JinniRangeMonth"
      onMouseEnter={() => handleHover(value)}
      onMouseLeave={() => handleHover(null)}
      style={{ '--lighten-color': lightenColor }}
    >
      <Box
        className={cn('JinniMonthWrapper', {
          isInSelectRange,
          isStartSelected,
          isEndSelected
        })}
      >
        <div
          className={cn('JinniHoverEffect', {
            show: isInHoverRange,
            isStartHovered,
            isEndHovered
          })}
        />
        <Month
          {...rest}
          value={value}
          color={color}
          selected={isSelected}
          onClick={() => handleSelect(value)}
        />
      </Box>
    </Box>
  );
};

export default RangeMonth;
