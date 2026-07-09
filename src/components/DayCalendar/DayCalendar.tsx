'use client';

import './DayCalendar.scss';
import { Fragment } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import Stack, { StackProps } from '@/components/Stack';
import Grid from '@/components/Grid';
import Day, { DayProps } from '../Day';
import {
  DateComponentProps,
  DisabledDatesFnType
} from '@/types/date-component';
import { useWeekDayItems, useDayItems } from './DayCalendar.hooks';
import useJinni from '@/hooks/useJinni';

export type DayCalendarMainProps = {
  showDaysOutsideCurrentMonth?: boolean;
  fixedWeekNumber?: number;
  displayWeekNumber?: boolean;
  renderDay?: (dayProps: Omit<DayProps, 'ref'>) => React.ReactNode;
};

export type DayCalendarProps<T extends AsType = 'div'> = Omit<
  StackProps<T>,
  'children' | 'defaultValue' | 'onChange'
> &
  Omit<DateComponentProps, 'options' | 'defaultValue' | 'value' | 'onChange'> &
  DayCalendarMainProps & {
    displayedDate: Date;
    selectedDate?: Date | null;
    onDayChange?: (newDate: Date) => void;
    disabledDates?: Array<Date> | DisabledDatesFnType;
  };

const DayCalendar = <T extends AsType = 'div'>(props: DayCalendarProps<T>) => {
  const {
    displayedDate,
    selectedDate,
    onDayChange,
    locale,
    disabledDates,
    readOnly,
    disabled,
    showDaysOutsideCurrentMonth,
    fixedWeekNumber,
    displayWeekNumber,
    renderDay = (dayProps: Omit<DayProps, 'ref'>) => <Day {...dayProps} />,
    className,
    style,
    ...rest
  } = props;
  const { theme } = useJinni();
  const { weekDayItems } = useWeekDayItems({ locale, displayWeekNumber });
  const { dayItems } = useDayItems({
    locale,
    readOnly,
    disabled,
    displayWeekNumber,
    fixedWeekNumber,
    showDaysOutsideCurrentMonth,
    displayedDate,
    selectedDate,
    onDayChange,
    disabledDates
  });
  const gridColumns = displayWeekNumber ? 8 : 7;

  return (
    <Stack
      className={cn('JinniDayCalendar', className)}
      spacing={4}
      style={{
        '--week-number-color': theme === 'light' ? 'gray-300' : 'gray-700',
        '--outside-day-color': theme === 'light' ? 'gray-400' : 'gray-600',
        ...style
      }}
      {...(rest as StackProps<T>)}
    >
      <Grid className="JinniWeekDayContainer" columns={gridColumns} spacing={4}>
        {weekDayItems.map(({ type, format }, idx) => (
          <span key={`${format}/${idx}`} className={cn('JinniWeekDay', type)}>
            {format}
          </span>
        ))}
      </Grid>
      <Grid className="JinniDayContainer" columns={gridColumns} spacing={4}>
        {dayItems.map((day, idx) => {
          switch (day.type) {
            case 'day':
            case 'outside-day': {
              const { type, ...rest } = day;
              return (
                <Fragment key={`${type}-${day.value.getTime()}`}>
                  {renderDay(rest)}
                </Fragment>
              );
            }
            case 'empty-day':
              return <span key={`empty-day-${idx}`} className="empty-day" />;
            case 'week-number':
              return (
                <span key={`week-number-${idx}`} className="week-number">
                  {day.format}
                </span>
              );
          }
        })}
      </Grid>
    </Stack>
  );
};

export default DayCalendar;
