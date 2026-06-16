import { useMemo, useRef, useLayoutEffect } from 'react';
import { YearCalendarProps } from './YearCalendar';
import {
  getTwoCenturyLocaleYears,
  isLowerYear,
  isHigherYear
} from './YearCalendar.utils';

type UseYearItemsProps = Pick<
  YearCalendarProps,
  | 'locale'
  | 'minDate'
  | 'maxDate'
  | 'readOnly'
  | 'disabled'
  | 'yearsOrder'
  | 'selectedDate'
  | 'displayedDate'
  | 'onYearChange'
>;

type UseScrollProps = {
  displayedDate: Date;
};

export const useYearItems = ({
  locale,
  minDate,
  maxDate,
  readOnly,
  disabled,
  yearsOrder,
  selectedDate,
  displayedDate,
  onYearChange
}: UseYearItemsProps) => {
  const localeYears = useMemo(
    () => getTwoCenturyLocaleYears(displayedDate, locale),
    [displayedDate, locale]
  );

  const yearItems = useMemo(() => {
    const todayDate = new Date();
    const sortedLocaleYears =
      yearsOrder === 'dsc' ? [...localeYears].reverse() : localeYears;
    return sortedLocaleYears.map(({ format, value }) => ({
      value,
      children: format,
      selected:
        !!selectedDate && selectedDate.getFullYear() === value.getFullYear(),
      marked: todayDate.getFullYear() === value.getFullYear(),
      readOnly,
      disabled:
        disabled ||
        isLowerYear({ baseDate: minDate, targetDate: value }) ||
        isHigherYear({ baseDate: maxDate, targetDate: value }),
      onClick: () => onYearChange?.(value)
    }));
  }, [
    localeYears,
    minDate,
    maxDate,
    readOnly,
    disabled,
    yearsOrder,
    selectedDate,
    onYearChange
  ]);

  return { yearItems };
};

export const useScroll = ({ displayedDate }: UseScrollProps) => {
  const yearCalendarElRef = useRef<HTMLElement>();
  const displayedDateYear = useMemo(
    () => displayedDate.getFullYear(),
    [displayedDate]
  );

  useLayoutEffect(() => {
    const yearCalendarEl = yearCalendarElRef.current;
    if (!yearCalendarEl) return;

    const yearElList =
      yearCalendarEl.querySelectorAll<HTMLElement>('.JinniYear');

    for (const element of yearElList) {
      const { value } = element.dataset;
      if (value && new Date(value).getFullYear() === displayedDateYear) {
        const offsetTop =
          element.getBoundingClientRect().top -
          yearCalendarEl.getBoundingClientRect().top +
          yearCalendarEl.scrollTop;
        yearCalendarEl.scrollTo({
          top:
            offsetTop -
            yearCalendarEl.clientHeight / 2 +
            element.clientHeight / 2
        });
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { yearCalendarElRef };
};
