import './MonthCalendar.scss';
import { Fragment } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Grid, GridProps } from '@/components/layout/Grid';
import { Month, MonthProps } from './Month';
import { DateComponentProps } from '@/types/date-component';
import { useDateValue, useMonthItems } from './MonthCalendar.hooks';

export type MonthMainProps = {
  referenceDate?: Date;
  renderMonth?: (monthProps: Omit<MonthProps, 'ref'>) => React.ReactNode;
};

export type MonthCalendarProps<T extends AsType = 'div'> = Omit<
  GridProps<T>,
  'children' | 'defaultValue' | 'onChange'
> &
  Omit<DateComponentProps, 'options' | 'disabledDates'> &
  MonthMainProps;

const MonthCalendar = <T extends AsType = 'div'>(
  props: MonthCalendarProps<T>
) => {
  const {
    defaultValue,
    value,
    onChange,
    locale,
    minDate,
    maxDate,
    readOnly,
    disabled,
    referenceDate,
    renderMonth = (monthProps: Omit<MonthProps, 'ref'>) => (
      <Month {...monthProps} />
    ),
    className,
    ...rest
  } = props;
  const { selectedDate, displayedDate, todayDate, changeMonth } = useDateValue({
    defaultValue,
    value,
    onChange,
    referenceDate
  });
  const { monthItems } = useMonthItems({
    locale,
    minDate,
    maxDate,
    readOnly,
    disabled,
    selectedDate,
    displayedDate,
    todayDate,
    changeMonth
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
