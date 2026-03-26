import './RangeYear.scss';
import cn from 'classnames';
import {
  Year,
  YearProps,
  YearCalendarProps
} from '@/components/data-entry/YearCalendar';
import { RangeType } from '@/types/date-component';
import { Box } from '@/components/layout/Box';
import { lighten } from '@/utils/colorLuminance';
import useColor from '@/hooks/useColor';

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
  const normalizedColor = useColor(color);
  const lightenColor = lighten(normalizedColor, 0.8);

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
      style={{ '--lighten-color': lightenColor }}
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
        />
      </Box>
    </Box>
  );
};

export default RangeYear;
