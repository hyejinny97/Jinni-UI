import { useState, useMemo, useRef, useLayoutEffect } from 'react';
import { YearCalendarProps } from './YearCalendar';
import {
  getTwoCenturyLocaleYears,
  isLowerYear,
  isHigherYear
} from './YearCalendar.utils';

type UseDateValueProps = Pick<
  YearCalendarProps,
  'defaultValue' | 'value' | 'onChange' | 'referenceDate'
>;

type UseYearItemsProps = Pick<
  YearCalendarProps,
  'locale' | 'minDate' | 'maxDate' | 'readOnly' | 'disabled' | 'yearsOrder'
> & {
  selectedDate: Date | null | undefined;
  displayedDate: Date;
  todayDate: Date;
  changeYear: (newValue: Date) => void;
};

type UseScrollProps = {
  displayedDate: Date;
};

export const useDateValue = ({
  defaultValue,
  value,
  onChange,
  referenceDate
}: UseDateValueProps) => {
  const isControlled = value !== undefined;
  const [uncontrolledSelectedDate, setUncontrolledSelectedDate] = useState<
    Date | undefined
  >(defaultValue);
  const selectedDate = isControlled ? value : uncontrolledSelectedDate;
  const todayDate = new Date();
  const displayedDate = selectedDate || referenceDate || todayDate;

  const changeYear = (newValue: Date) => {
    if (!isControlled) setUncontrolledSelectedDate(newValue);
    if (onChange) onChange(newValue);
  };

  return {
    selectedDate,
    displayedDate,
    todayDate,
    changeYear
  };
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
  todayDate,
  changeYear
}: UseYearItemsProps) => {
  const localeYears = useMemo(
    () => getTwoCenturyLocaleYears(displayedDate, locale),
    [displayedDate, locale]
  );

  const yearItems = useMemo(() => {
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
      onClick: () => changeYear(value)
    }));
  }, [
    localeYears,
    minDate,
    maxDate,
    readOnly,
    disabled,
    yearsOrder,
    selectedDate,
    todayDate,
    changeYear
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
        yearCalendarEl.scrollTo({
          top:
            element.offsetTop -
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
