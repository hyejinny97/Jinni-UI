import './RangeDay.scss';
import cn from 'classnames';
import { Day, DayProps } from '@/components/data-entry/DayCalendar';
import { RangeType } from '@/types/date-component';
import { Box } from '@/components/layout/Box';
import { lighten } from '@/utils/colorLuminance';
import useColor from '@/hooks/useColor';
import { dateToDay, getLastDay } from '@/utils/date-component';

type RangeDayProps = Omit<DayProps, 'ref'> & {
  selectedDateValue: RangeType<Date | null>;
  handleSelect: (dateSelected: Date) => void;
  hoveredDateValue: Date | null;
  handleHover: (dateHovered: Date | null) => void;
};

const RangeDay = (props: RangeDayProps) => {
  const {
    value,
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

  const day = dateToDay(value);
  const startDay = start && dateToDay(start);
  const endDay = end && dateToDay(end);
  const hoveredDay = hoveredDateValue && dateToDay(hoveredDateValue);

  const isInSelectRange =
    startDay && endDay && startDay <= day && day <= endDay;
  const isStartSelected = day === startDay;
  const isEndSelected = day === endDay;
  const isSelected = isStartSelected || isEndSelected;

  const isInHoverRange =
    startDay && !endDay && hoveredDay && startDay <= day && day <= hoveredDay;
  const isStartHovered = isInHoverRange && isStartSelected;
  const isEndHovered = isInHoverRange && day === hoveredDay;

  const isSunday = value.getDay() === 0;
  const isSaturday = value.getDay() === 6;
  const isFirstDay = value.getDate() === 1;
  const isLastDay = value.getDate() === getLastDay(value);

  return (
    <Box
      className="JinniRangeDay"
      onMouseEnter={() => handleHover(value)}
      onMouseLeave={() => handleHover(null)}
      style={{ '--lighten-color': lightenColor }}
    >
      <Box
        className={cn('JinniDayWrapper', {
          isInSelectRange,
          isStartSelected,
          isEndSelected,
          isSunday,
          isSaturday,
          isFirstDay,
          isLastDay
        })}
      >
        <div
          className={cn('JinniHoverEffect', {
            show: isInHoverRange,
            isStartHovered,
            isEndHovered,
            isSunday,
            isSaturday,
            isFirstDay,
            isLastDay
          })}
        />
        <Day
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

export default RangeDay;
