import './YearCalendar.scss';
import { Fragment } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Grid, GridProps } from '@/components/layout/Grid';
import { Year, YearProps } from './Year';
import { DateComponentProps } from '@/types/date-component';
import { useDateValue, useYearItems, useScroll } from './YearCalendar.hooks';

export type YearMainProps = {
  referenceDate?: Date;
  yearsOrder?: 'asc' | 'dsc';
  renderYear?: (yearProps: Omit<YearProps, 'ref'>) => React.ReactNode;
};

export type YearCalendarProps<T extends AsType = 'div'> = Omit<
  GridProps<T>,
  'children' | 'defaultValue' | 'onChange'
> &
  Omit<DateComponentProps, 'options' | 'disabledDates'> &
  YearMainProps;

const YearCalendar = <T extends AsType = 'div'>(
  props: YearCalendarProps<T>
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
    yearsOrder = 'asc',
    renderYear = (yearProps: Omit<YearProps, 'ref'>) => <Year {...yearProps} />,
    className,
    ...rest
  } = props;
  const { selectedDate, displayedDate, todayDate, changeYear } = useDateValue({
    defaultValue,
    value,
    onChange,
    referenceDate
  });
  const { yearItems } = useYearItems({
    locale,
    minDate,
    maxDate,
    readOnly,
    disabled,
    yearsOrder,
    selectedDate,
    displayedDate,
    todayDate,
    changeYear
  });
  const { yearCalendarElRef } = useScroll({ displayedDate });

  return (
    <Grid
      ref={yearCalendarElRef}
      className={cn('JinniYearCalendar', className)}
      columns={3}
      spacing={10}
      {...rest}
    >
      {yearItems.map((itemProps) => (
        <Fragment key={itemProps.value.getTime()}>
          {renderYear(itemProps)}
        </Fragment>
      ))}
    </Grid>
  );
};

export default YearCalendar;
