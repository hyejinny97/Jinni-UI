import './HorizontalDayRangeCalendars.scss';
import { useState } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Stack } from '@/components/layout/Stack';
import { Divider } from '@/components/layout/Divider';
import { DayRangeCalendar, DayRangeCalendarProps } from '../DayRangeCalendar';
import { DateRangeCalendarHeader } from '../DateRangeCalendarHeader';

type HorizontalDayRangeCalendarsProps<T extends AsType = 'div'> =
  DayRangeCalendarProps<T> & {
    dayCalendars?: 1 | 2 | 3;
    onPrevMonth?: (prevMonth: Date) => void;
    onNextMonth?: (nextMonth: Date) => void;
  };

const HorizontalDayRangeCalendars = <T extends AsType = 'div'>(
  props: HorizontalDayRangeCalendarsProps<T>
) => {
  const {
    dayCalendars = 2,
    displayedDate,
    onPrevMonth,
    onNextMonth,
    locale,
    readOnly,
    disabled,
    className,
    as: Component = 'div',
    ...rest
  } = props;
  const [hoveredDay, setHoveredDay] = useState<Date | null>(null);

  const commonProps = {
    locale,
    readOnly,
    disabled
  };

  const handlePrev = () => {
    if (!onPrevMonth) return;
    const month = displayedDate.getMonth();
    const prevMonth = new Date(displayedDate);
    prevMonth.setMonth(month - 1);
    onPrevMonth(prevMonth);
  };
  const handleNext = () => {
    if (!onNextMonth) return;
    const month = displayedDate.getMonth();
    const nextMonth = new Date(displayedDate);
    nextMonth.setMonth(month + 1);
    onNextMonth(nextMonth);
  };

  return (
    <Stack
      className={cn('JinniHorizontalDayRangeCalendars', className)}
      direction="row"
      divider={<Divider orientation="vertical" />}
    >
      {Array(dayCalendars)
        .fill(0)
        .map((_, idx) => {
          const month = displayedDate.getMonth() + idx;
          const newDisplayDate = new Date(displayedDate);
          newDisplayDate.setMonth(month);
          return (
            <div
              className="JinniHorizontalDayRangeCalendarContainer"
              key={month}
            >
              <DateRangeCalendarHeader
                type="day"
                displayedDate={newDisplayDate}
                hidePrevButton={idx > 0}
                hideNextButton={idx < dayCalendars - 1}
                onPrev={handlePrev}
                onNext={handleNext}
                {...commonProps}
              />
              <DayRangeCalendar
                hoveredDay={hoveredDay}
                onHover={setHoveredDay}
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

export default HorizontalDayRangeCalendars;
