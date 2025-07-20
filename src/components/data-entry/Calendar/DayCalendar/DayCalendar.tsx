import './DayCalendar.scss';
import { useMemo } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Grid, GridProps } from '@/components/layout/Grid';
import {
  getLocaleDays,
  getLocaleWeekDays,
  isSameDay
} from './DayCalendar.utils';
import Day from './Day';

type DayCalendarProps<T extends AsType = 'div'> = Omit<
  GridProps<T>,
  'children' | 'onSelect'
> & {
  locale?: string;
  selectedDate?: Date | null;
  referenceDate?: Date;
  onSelect?: (selectedDate: Date) => void;
};

const DayCalendar = <T extends AsType = 'div'>(props: DayCalendarProps<T>) => {
  const { locale, selectedDate, referenceDate, onSelect, className, ...rest } =
    props;
  const todayDate = new Date();
  const year = (selectedDate || referenceDate || todayDate).getFullYear();
  const month = (selectedDate || referenceDate || todayDate).getMonth();
  const localeWeekDays = useMemo(() => getLocaleWeekDays(locale), [locale]);
  const localeDays = useMemo(
    () => getLocaleDays(year, month, locale),
    [year, month, locale]
  );
  const weekDayOfFirstDay = localeDays[0].value.getDay();

  return (
    <div className={cn('JinniDayCalendar', className)} {...rest}>
      <Grid className="JinniWeekDayContainer" columns={7} spacing={5}>
        {localeWeekDays.map((weekDay) => (
          <span key={weekDay} className="JinniWeekDay">
            {weekDay}
          </span>
        ))}
      </Grid>
      <Grid columns={7} spacing={5}>
        {Array(weekDayOfFirstDay)
          .fill(0)
          .map((_, idx) => (
            <span key={`no-day-${idx}`} className="no-day" />
          ))}
        {localeDays.map(({ format, value }) => {
          const selected = !!selectedDate && isSameDay(value, selectedDate);
          const marked = isSameDay(value, todayDate);
          return (
            <Day
              key={format}
              selected={selected}
              marked={marked}
              onClick={() => onSelect && onSelect(value)}
            >
              {format}
            </Day>
          );
        })}
      </Grid>
    </div>
  );
};

export default DayCalendar;
