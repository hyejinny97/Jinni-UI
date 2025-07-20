import './YearCalendar.scss';
import { useMemo, useLayoutEffect, useRef } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Grid, GridProps } from '@/components/layout/Grid';
import { getTwoCenturyLocaleYears } from './YearCalendar.utils';
import Year from './Year';

type YearCalendarProps<T extends AsType = 'div'> = Omit<
  GridProps<T>,
  'children' | 'onSelect'
> & {
  locale?: string;
  selectedDate?: Date | null;
  referenceDate?: Date;
  onSelect?: (selectedDate: Date) => void;
};

const YearCalendar = <T extends AsType = 'div'>(
  props: YearCalendarProps<T>
) => {
  const { locale, selectedDate, referenceDate, onSelect, className, ...rest } =
    props;
  const yearCalendarElRef = useRef<HTMLElement>();
  const yearsElRef = useRef<Array<HTMLElement>>([]);
  const localeYears = useMemo(() => getTwoCenturyLocaleYears(locale), [locale]);
  const todayDate = new Date();

  useLayoutEffect(() => {
    const yearCalendarEl = yearCalendarElRef.current;
    const yearsEl = yearsElRef.current;
    if (!yearCalendarEl || yearsEl.length === 0) return;
    const baseYear = (selectedDate || referenceDate || todayDate).getFullYear();
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
      {localeYears.map(({ format, value }) => {
        const year = value.getFullYear();
        const selected = !!selectedDate && selectedDate.getFullYear() === year;
        const marked = todayDate.getFullYear() === year;
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
          >
            {format}
          </Year>
        );
      })}
    </Grid>
  );
};

export default YearCalendar;
