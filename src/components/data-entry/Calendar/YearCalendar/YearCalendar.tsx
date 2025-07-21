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
import Year from './Year';

type YearCalendarProps<T extends AsType = 'div'> = Omit<
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
    className,
    ...rest
  } = props;
  const yearCalendarElRef = useRef<HTMLElement>();
  const yearsElRef = useRef<Array<HTMLElement>>([]);
  const localeYears = useMemo(
    () => getTwoCenturyLocaleYears(displayedDate, locale),
    [displayedDate, locale]
  );
  const todayDate = new Date();

  useLayoutEffect(() => {
    const yearCalendarEl = yearCalendarElRef.current;
    const yearsEl = yearsElRef.current;
    if (!yearCalendarEl || yearsEl.length === 0) return;
    const baseYear = displayedDate.getFullYear();
    for (let element of yearsEl) {
      if (Number(element.dataset.year) === baseYear) {
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
      {localeYears.map(({ format, value }, idx) => {
        const year = value.getFullYear();
        const selected = !!selectedDate && selectedDate.getFullYear() === year;
        const marked = todayDate.getFullYear() === year;
        const isDisabled =
          disabled ||
          isLowerYear({ baseDate: minDate, targetDate: value }) ||
          isHigherYear({ baseDate: maxDate, targetDate: value });
        return (
          <Year
            key={format}
            ref={(element) => {
              if (element) {
                yearsElRef.current.push(element);
              }
            }}
            selected={selected}
            marked={marked}
            data-year={year}
            onClick={() => onSelect && onSelect(value)}
            readOnly={readOnly}
            disabled={isDisabled}
            style={{ order: yearsOrder === 'dsc' ? 200 - idx : undefined }}
          >
            {format}
          </Year>
        );
      })}
    </Grid>
  );
};

export default YearCalendar;
