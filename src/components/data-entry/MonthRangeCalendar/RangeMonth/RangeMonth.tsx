import './RangeMonth.scss';
import { useMemo } from 'react';
import cn from 'classnames';
import { Month, MonthProps } from '@/components/data-entry/MonthCalendar';
import { RangeType } from '@/types/date-component';
import { Box } from '@/components/layout/Box';
import { lighten, darken } from '@/utils/colorLuminance';
import useColor from '@/hooks/useColor';
import { dateToMonth } from '@/utils/date-component';
import { isNumber } from '@/utils/isNumber';
import useJinni from '@/hooks/useJinni';
import { getCloserToWhiteOrBlack } from '@/utils/colorLuminance';

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
      style={{
        '--selected-range-bg-color': selectedRangeBgColor,
        '--selected-range-text-color': contrastColor
      }}
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

export default RangeMonth;
