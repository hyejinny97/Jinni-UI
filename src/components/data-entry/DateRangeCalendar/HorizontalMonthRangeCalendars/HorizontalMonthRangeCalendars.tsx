import './HorizontalMonthRangeCalendars.scss';
import { useState } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Stack } from '@/components/layout/Stack';
import { Divider } from '@/components/layout/Divider';
import {
  MonthRangeCalendar,
  MonthRangeCalendarProps
} from '../MonthRangeCalendar';
import { DateRangeCalendarHeader } from '../DateRangeCalendarHeader';

type HorizontalMonthRangeCalendarsProps<T extends AsType = 'div'> =
  MonthRangeCalendarProps<T> & {
    monthCalendars?: 1 | 2 | 3;
    onPrevYear?: (prevYear: Date) => void;
    onNextYear?: (nextYear: Date) => void;
  };

const HorizontalMonthRangeCalendars = <T extends AsType = 'div'>(
  props: HorizontalMonthRangeCalendarsProps<T>
) => {
  const {
    monthCalendars = 2,
    displayedDate,
    onPrevYear,
    onNextYear,
    locale,
    readOnly,
    disabled,
    className,
    as: Component = 'div',
    ...rest
  } = props;
  const [hoveredMonth, setHoveredMonth] = useState<Date | null>(null);

  const commonProps = {
    locale,
    readOnly,
    disabled
  };

  const handlePrev = () => {
    if (!onPrevYear) return;
    const year = displayedDate.getFullYear();
    const prevYear = new Date(displayedDate);
    prevYear.setFullYear(year - 1);
    onPrevYear(prevYear);
  };
  const handleNext = () => {
    if (!onNextYear) return;
    const year = displayedDate.getFullYear();
    const prevYear = new Date(displayedDate);
    prevYear.setFullYear(year + 1);
    onNextYear(prevYear);
  };

  return (
    <Stack
      className={cn('JinniHorizontalMonthRangeCalendars', className)}
      direction="row"
      divider={<Divider orientation="vertical" />}
      spacing={10}
    >
      {Array(monthCalendars)
        .fill(0)
        .map((_, idx) => {
          const year = displayedDate.getFullYear() + idx;
          const newDisplayDate = new Date(displayedDate);
          newDisplayDate.setFullYear(year);
          return (
            <div
              className="JinniHorizontalDayRangeCalendarContainer"
              key={year}
            >
              <DateRangeCalendarHeader
                type="month"
                displayedDate={newDisplayDate}
                hidePrevButton={idx > 0}
                hideNextButton={idx < monthCalendars - 1}
                onPrev={handlePrev}
                onNext={handleNext}
                {...commonProps}
              />
              <MonthRangeCalendar
                hoveredMonth={hoveredMonth}
                onHover={setHoveredMonth}
                displayedDate={newDisplayDate}
                {...commonProps}
                {...rest}
              />
            </div>
          );
        })}
    </Stack>
  );
};

export default HorizontalMonthRangeCalendars;
