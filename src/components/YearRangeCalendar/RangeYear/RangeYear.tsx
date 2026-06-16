import './RangeYear.scss';
import { useMemo } from 'react';
import cn from 'classnames';
import { YearCalendarProps } from '@/components/YearCalendar';
import Year, { YearProps } from '@/components/Year';
import { RangeType } from '@/types/date-component';
import Box from '@/components/Box';
import { lighten, darken } from '@/utils/colorLuminance';
import useColor from '@/hooks/useColor';
import useJinni from '@/hooks/useJinni';
import { getCloserToWhiteOrBlack } from '@/utils/colorLuminance';

type RangeYearProps = Omit<YearProps, 'ref'> &
  Pick<YearCalendarProps, 'yearsOrder'> & {
    selectedDateValue: RangeType<Date | null>;
    handleSelect: (dateSelected: Date) => void;
    hoveredDateValue: Date | null;
    handleHover: (dateHovered: Date | null) => void;
  };

const RangeYear = (props: RangeYearProps) => {
  const {
    value,
    color = 'primary',
    yearsOrder = 'asc',
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

  const year = value.getFullYear();
  const startYear = selectedDateValue.start?.getFullYear();
  const endYear = selectedDateValue.end?.getFullYear();
  const hoveredYear = hoveredDateValue?.getFullYear();

  const isInSelectRange =
    startYear && endYear && startYear <= year && year <= endYear;
  const isStartSelected = year === startYear;
  const isEndSelected = year === endYear;
  const isSelected = isStartSelected || isEndSelected;

  const isInHoverRange =
    startYear &&
    !endYear &&
    hoveredYear &&
    startYear <= year &&
    year <= hoveredYear;
  const isStartHovered = isInHoverRange && isStartSelected;
  const isEndHovered = isInHoverRange && year === hoveredYear;

  return (
    <Box
      className="JinniRangeYear"
      onMouseEnter={() => handleHover(value)}
      onMouseLeave={() => handleHover(null)}
      style={{
        '--selected-range-bg-color': selectedRangeBgColor,
        '--selected-range-text-color': contrastColor
      }}
    >
      <Box
        className={cn('JinniYearWrapper', yearsOrder, {
          isInSelectRange,
          isStartSelected,
          isEndSelected
        })}
      >
        <div
          className={cn('JinniHoverEffect', yearsOrder, {
            show: isInHoverRange,
            isStartHovered,
            isEndHovered
          })}
        />
        <Year
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

export default RangeYear;
