'use client';

import './YearCalendar.scss';
import { Fragment } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import Grid, { GridProps } from '@/components/Grid';
import Year, { YearProps } from '../Year';
import {
  DateComponentProps,
  DisabledDatesFnType
} from '@/types/date-component';
import { useYearItems, useScroll } from './YearCalendar.hooks';

export type YearCalendarMainProps = {
  yearsOrder?: 'asc' | 'dsc';
  renderYear?: (yearProps: Omit<YearProps, 'ref'>) => React.ReactNode;
};

export type YearCalendarProps<T extends AsType = 'div'> = Omit<
  GridProps<T>,
  'children' | 'defaultValue' | 'onChange'
> &
  Omit<DateComponentProps, 'options' | 'defaultValue' | 'value' | 'onChange'> &
  YearCalendarMainProps & {
    displayedDate: Date;
    selectedDate?: Date | null;
    onYearChange?: (newDate: Date) => void;
    disabledDates?: DisabledDatesFnType;
  };

const YearCalendar = <T extends AsType = 'div'>(
  props: YearCalendarProps<T>
) => {
  const {
    displayedDate,
    selectedDate,
    onYearChange,
    locale,
    disabledDates,
    readOnly,
    disabled,
    yearsOrder = 'asc',
    renderYear = (yearProps: Omit<YearProps, 'ref'>) => <Year {...yearProps} />,
    className,
    ...rest
  } = props;
  const { yearItems } = useYearItems({
    locale,
    readOnly,
    disabled,
    yearsOrder,
    selectedDate,
    displayedDate,
    onYearChange,
    disabledDates
  });
  const { yearCalendarElRef } = useScroll({ displayedDate });

  return (
    <Grid
      ref={yearCalendarElRef}
      className={cn('JinniYearCalendar', className)}
      columns={3}
      spacing={10}
      {...(rest as GridProps<T>)}
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
