import './YearCalendar.scss';
import { useMemo, useLayoutEffect, useRef } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Grid, GridProps } from '@/components/layout/Grid';
import {
  getTwoCenturyLocaleYears,
  isLowerYear,
  isHigherYear
} from './YearCalendar.utils';
import Year, { YearProps } from './Year';

export type YearCalendarProps<T extends AsType = 'div'> = Omit<
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
  yearsOrder?: 'asc' | 'dsc';
  renderYear?: (yearProps: Omit<YearProps, 'ref'>) => React.ReactNode;
};

const YearCalendar = <T extends AsType = 'div'>(
  props: YearCalendarProps<T>
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
    yearsOrder = 'asc',
    renderYear = (yearProps: Omit<YearProps, 'ref'>, key: number) => (
      <Year key={key} {...yearProps} />
    ),
    className,
    ...rest
  } = props;
  const yearCalendarElRef = useRef<HTMLElement>();
  const yearsElRef = useRef<Array<{ element: HTMLElement; year: Date }>>([]);
  const localeYears = useMemo(
    () => getTwoCenturyLocaleYears(displayedDate, locale),
    [displayedDate, locale]
  );
  const todayDate = new Date();
  const sortedLocaleYears = useMemo(
    () => (yearsOrder === 'dsc' ? [...localeYears].reverse() : localeYears),
    [localeYears, yearsOrder]
  );

  useLayoutEffect(() => {
    const yearCalendarEl = yearCalendarElRef.current;
    const yearsEl = yearsElRef.current;
    if (!yearCalendarEl || yearsEl.length === 0) return;
    const baseYear = displayedDate.getFullYear();
    for (let { element, year } of yearsEl) {
      if (year.getFullYear() === baseYear) {
        yearCalendarEl.scrollTo({
          top:
            element.offsetTop -
            yearCalendarEl.clientHeight / 2 +
            element.clientHeight / 2
        });
        break;
      }
    }
  }, []);

  return (
    <Grid
      ref={yearCalendarElRef}
      className={cn('JinniYearCalendar', className)}
      columns={3}
      spacing={10}
      {...rest}
    >
      {sortedLocaleYears.map(({ format, value }) => {
        const year = value.getFullYear();
        const selected = !!selectedDate && selectedDate.getFullYear() === year;
        const marked = todayDate.getFullYear() === year;
        const isDisabled =
          disabled ||
          isLowerYear({ baseDate: minDate, targetDate: value }) ||
          isHigherYear({ baseDate: maxDate, targetDate: value });
        const yearProps = {
          year: value,
          children: format,
          ref: (element: HTMLElement | null) => {
            if (element) {
              yearsElRef.current.push({ element, year: value });
            }
          },
          selected,
          marked,
          onClick: () => onSelect && onSelect(value),
          readOnly,
          disabled: isDisabled
        };
        return renderYear(yearProps, value.getTime());
      })}
    </Grid>
  );
};

export default YearCalendar;
