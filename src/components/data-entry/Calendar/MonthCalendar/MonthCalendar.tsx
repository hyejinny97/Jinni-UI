import './MonthCalendar.scss';
import { useMemo } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Grid, GridProps } from '@/components/layout/Grid';
import { getLocaleMonths } from './MonthCalendar.utils';
import Month from './Month';

type MonthCalendarProps<T extends AsType = 'div'> = Omit<
  GridProps<T>,
  'children' | 'onSelect'
> & {
  locale?: string;
  selectedDate?: Date | null;
  referenceDate?: Date;
  onSelect?: (selectedDate: Date) => void;
};

const MonthCalendar = <T extends AsType = 'div'>(
  props: MonthCalendarProps<T>
) => {
  const { locale, selectedDate, referenceDate, onSelect, className, ...rest } =
    props;
  const todayDate = new Date();
  const year = (selectedDate || referenceDate || todayDate).getFullYear();
  const localeMonths = useMemo(
    () => getLocaleMonths(year, locale),
    [year, locale]
  );

  return (
    <Grid
      className={cn('JinniMonthCalendar', className)}
      columns={3}
      spacing={10}
      {...rest}
    >
      {localeMonths.map(({ format, value }) => {
        const month = value.getMonth();
        const selected = !!selectedDate && selectedDate.getMonth() === month;
        const marked = todayDate.getMonth() === month;
        return (
          <Month
            key={format}
            selected={selected}
            marked={marked}
            onClick={() => onSelect && onSelect(value)}
          >
            {format}
          </Month>
        );
      })}
    </Grid>
  );
};

export default MonthCalendar;
