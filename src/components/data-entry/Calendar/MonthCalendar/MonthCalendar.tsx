import './MonthCalendar.scss';
import { useMemo } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Grid, GridProps } from '@/components/layout/Grid';
import {
  getLocaleMonths,
  isLowerMonth,
  isHigherMonth
} from './MonthCalendar.utils';
import Month from './Month';

type MonthCalendarProps<T extends AsType = 'div'> = Omit<
  GridProps<T>,
  'children' | 'onSelect'
> & {
  locale?: string;
  displayedDate: Date;
  selectedDate?: Date | null;
  onSelect?: (selectedDate: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  readOnly?: boolean;
  disabled?: boolean;
};

const MonthCalendar = <T extends AsType = 'div'>(
  props: MonthCalendarProps<T>
) => {
  const {
    locale,
    displayedDate,
    selectedDate,
    onSelect,
    minDate,
    maxDate,
    readOnly = false,
    disabled = false,
    className,
    ...rest
  } = props;
  const todayDate = new Date();
  const localeMonths = useMemo(
    () => getLocaleMonths(displayedDate, locale),
    [displayedDate, locale]
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
        const isDisabled =
          disabled ||
          isLowerMonth({ baseDate: minDate, targetDate: value }) ||
          isHigherMonth({ baseDate: maxDate, targetDate: value });
        return (
          <Month
            key={format}
            selected={selected}
            marked={marked}
            onClick={() => onSelect && onSelect(value)}
            readOnly={readOnly}
            disabled={isDisabled}
          >
            {format}
          </Month>
        );
      })}
    </Grid>
  );
};

export default MonthCalendar;
