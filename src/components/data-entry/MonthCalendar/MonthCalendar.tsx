import './MonthCalendar.scss';
import { Fragment } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Grid, GridProps } from '@/components/layout/Grid';
import { Month, MonthProps } from './Month';
import { DateComponentProps } from '@/types/date-component';
import { useMonthItems } from './MonthCalendar.hooks';

export type MonthCalendarMainProps = {
  renderMonth?: (monthProps: Omit<MonthProps, 'ref'>) => React.ReactNode;
};

export type MonthCalendarProps<T extends AsType = 'div'> = Omit<
  GridProps<T>,
  'children' | 'defaultValue' | 'onChange'
> &
  Omit<
    DateComponentProps,
    'options' | 'disabledDates' | 'defaultValue' | 'value' | 'onChange'
  > &
  MonthCalendarMainProps & {
    displayedDate: Date;
    selectedDate?: Date | null;
    onMonthChange?: (newDate: Date) => void;
  };

const MonthCalendar = <T extends AsType = 'div'>(
  props: MonthCalendarProps<T>
) => {
  const {
    displayedDate,
    selectedDate,
    onMonthChange,
    locale,
    minDate,
    maxDate,
    readOnly,
    disabled,
    renderMonth = (monthProps: Omit<MonthProps, 'ref'>) => (
      <Month {...monthProps} />
    ),
    className,
    ...rest
  } = props;
  const { monthItems } = useMonthItems({
    locale,
    minDate,
    maxDate,
    readOnly,
    disabled,
    selectedDate,
    displayedDate,
    onMonthChange
  });

  return (
    <Grid
      className={cn('JinniMonthCalendar', className)}
      columns={3}
      spacing={10}
      {...rest}
    >
      {monthItems.map((itemProps) => (
        <Fragment key={itemProps.value.getTime()}>
          {renderMonth(itemProps)}
        </Fragment>
      ))}
    </Grid>
  );
};

export default MonthCalendar;
