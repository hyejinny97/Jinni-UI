import './YearRangeCalendar.scss';
import { useState } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import {
  YearCalendar,
  Year,
  YearCalendarProps,
  YearProps
} from '@/components/data-entry/Calendar';
import { RangeType } from '@/components/data-entry/DateRangeField';
import { Box } from '@/components/layout/Box';
import { lighten } from '@/utils/colorLuminance';
import useColor from '@/hooks/useColor';

type YearRangeCalendarProps<T extends AsType = 'div'> = Omit<
  YearCalendarProps<T>,
  'selectedDate'
> & {
  selectedDate?: RangeType<Date | null>;
  disableHoverRangeEffect?: boolean;
};

const YearRangeCalendar = <T extends AsType = 'div'>(
  props: YearRangeCalendarProps<T>
) => {
  const {
    renderYear,
    selectedDate,
    yearsOrder,
    disableHoverRangeEffect,
    className,
    ...rest
  } = props;
  const [hoveredYear, setHoveredYear] = useState<Date | null>(null);

  const isSelected = (year: Date): boolean => {
    if (!selectedDate) return false;
    return (
      selectedDate.start?.getFullYear() === year.getFullYear() ||
      selectedDate.end?.getFullYear() === year.getFullYear()
    );
  };
  const isBetweenSelectedDates = (year: Date): boolean => {
    if (!selectedDate || !selectedDate.start || !selectedDate.end) return false;
    return (
      selectedDate.start.getFullYear() <= year.getFullYear() &&
      year.getFullYear() <= selectedDate.end.getFullYear()
    );
  };
  const isBetweenStartAndHoveredDate = (year: Date): boolean => {
    if (selectedDate?.start && !selectedDate.end && hoveredYear) {
      return (
        selectedDate.start.getFullYear() <= year.getFullYear() &&
        year.getFullYear() <= hoveredYear.getFullYear()
      );
    }
    return false;
  };

  const CustomYear = (yearProps: YearProps) => {
    const { year, color = 'primary', ref, ...rest } = yearProps;
    const normalizedColor = useColor(color);
    const showDashBorder =
      !disableHoverRangeEffect && isBetweenStartAndHoveredDate(year);
    return (
      <Box
        key={year.getTime()}
        ref={ref}
        className={cn('GridItem', yearsOrder, {
          startDate: selectedDate?.start?.getFullYear() === year.getFullYear(),
          endDate: selectedDate?.end?.getFullYear() === year.getFullYear(),
          lastDashBorder:
            showDashBorder && hoveredYear?.getFullYear() === year.getFullYear()
        })}
        onMouseEnter={() => setHoveredYear(year)}
        onMouseLeave={() => setHoveredYear(null)}
      >
        <Box
          className={cn('YearContainer', {
            dimmedBackground: isBetweenSelectedDates(year),
            showDashBorder
          })}
          style={{ '--dim-color': lighten(normalizedColor, 0.8) }}
        >
          <Year {...rest} year={year} selected={isSelected(year)} />
        </Box>
      </Box>
    );
  };

  return (
    <YearCalendar
      id="JinniYearRangeCalendar"
      className={cn('JinniYearRangeCalendar', className)}
      spacing={0}
      yearsOrder={yearsOrder}
      renderYear={renderYear ? renderYear : CustomYear}
      {...rest}
    />
  );
};

export default YearRangeCalendar;
