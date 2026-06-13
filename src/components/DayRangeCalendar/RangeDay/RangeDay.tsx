import './RangeDay.scss';
import { useMemo } from 'react';
import cn from 'classnames';
import Day, { DayProps } from '@/components/Day';
import { RangeType } from '@/types/date-component';
import { Box } from '@/components/layout/Box';
import { lighten, darken } from '@/utils/colorLuminance';
import useColor from '@/hooks/useColor';
import { dateToDay } from '@/utils/date-component';
import useJinni from '@/hooks/useJinni';
import { getCloserToWhiteOrBlack } from '@/utils/colorLuminance';

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
  const { theme } = useJinni();
  const normalizedColor = useColor(color);
  const selectedRangeBgColor = useMemo(() => {
    return theme === 'light'
      ? lighten(normalizedColor, 0.8)
      : darken(normalizedColor, 0.8);
  }, [theme, normalizedColor]);
  const contrastColor = useMemo(() => {
    const closerColor = getCloserToWhiteOrBlack(selectedRangeBgColor);
    return closerColor === 'white' ? 'black' : 'white';
  }, [selectedRangeBgColor]);

  const { start, end } = selectedDateValue;
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

  return (
    <Box
      className="JinniRangeDay"
      onMouseEnter={() => handleHover(value)}
      onMouseLeave={() => handleHover(null)}
      style={{
        '--selected-range-bg-color': selectedRangeBgColor,
        '--selected-range-text-color': contrastColor
      }}
    >
      <Box
        className={cn('JinniDayWrapper', {
          isInSelectRange,
          isStartSelected,
          isEndSelected,
          isSunday,
          isSaturday
        })}
      >
        <div
          className={cn('JinniHoverEffect', {
            show: isInHoverRange,
            isStartHovered,
            isEndHovered,
            isSunday,
            isSaturday
          })}
        />
        <Day
          {...rest}
          value={value}
          color={color}
          selected={isSelected}
          onClick={() => handleSelect(value)}
          {...(isInSelectRange &&
            !isSelected && {
              overlayColor: contrastColor,
              rippleColor: contrastColor
            })}
        />
      </Box>
    </Box>
  );
};

export default RangeDay;
