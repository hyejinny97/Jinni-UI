import './YearCalendar.scss';
import { Fragment } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Grid, GridProps } from '@/components/layout/Grid';
import { Year, YearProps } from './Year';
import { DateComponentProps } from '@/types/date-component';
import { useYearItems, useScroll } from './YearCalendar.hooks';

export type YearCalendarMainProps = {
  yearsOrder?: 'asc' | 'dsc';
  renderYear?: (yearProps: Omit<YearProps, 'ref'>) => React.ReactNode;
};

export type YearCalendarProps<T extends AsType = 'div'> = Omit<
  GridProps<T>,
  'children' | 'defaultValue' | 'onChange'
> &
  Omit<
    DateComponentProps,
    'options' | 'disabledDates' | 'defaultValue' | 'value' | 'onChange'
  > &
  YearCalendarMainProps & {
    displayedDate: Date;
    selectedDate?: Date | null;
    onYearChange?: (newDate: Date) => void;
  };

const YearCalendar = <T extends AsType = 'div'>(
  props: YearCalendarProps<T>
) => {
  const {
    displayedDate,
    selectedDate,
    onYearChange,
    locale,
    minDate,
    maxDate,
    readOnly,
    disabled,
    yearsOrder = 'asc',
    renderYear = (yearProps: Omit<YearProps, 'ref'>) => <Year {...yearProps} />,
    className,
    ...rest
  } = props;
  const { yearItems } = useYearItems({
    locale,
    minDate,
    maxDate,
    readOnly,
    disabled,
    yearsOrder,
    selectedDate,
    displayedDate,
    onYearChange
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
