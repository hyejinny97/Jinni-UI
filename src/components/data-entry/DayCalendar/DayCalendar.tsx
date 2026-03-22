import './DayCalendar.scss';
import { Fragment } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Stack, StackProps } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Day, DayProps } from './Day';
import { DateComponentProps } from '@/types/date-component';
import { useWeekDayItems, useDayItems } from './DayCalendar.hooks';

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
  };

const DayCalendar = <T extends AsType = 'div'>(props: DayCalendarProps<T>) => {
  const {
    displayedDate,
    selectedDate,
    onDayChange,
    locale,
    minDate,
    maxDate,
    disabledDates,
    readOnly,
    disabled,
    showDaysOutsideCurrentMonth,
    fixedWeekNumber,
    displayWeekNumber,
    renderDay = (dayProps: Omit<DayProps, 'ref'>) => <Day {...dayProps} />,
    className,
    ...rest
  } = props;
  const { weekDayItems } = useWeekDayItems({ locale, displayWeekNumber });
  const { dayItems } = useDayItems({
    locale,
    minDate,
    maxDate,
    disabledDates,
    readOnly,
    disabled,
    displayWeekNumber,
    fixedWeekNumber,
    showDaysOutsideCurrentMonth,
    displayedDate,
    selectedDate,
    onDayChange
  });
  const gridColumns = displayWeekNumber ? 8 : 7;

  return (
    <Stack className={cn('JinniDayCalendar', className)} spacing={4} {...rest}>
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
