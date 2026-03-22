import { useMemo } from 'react';
import { MonthCalendarProps } from './MonthCalendar';
import {
  getLocaleMonths,
  isLowerMonth,
  isHigherMonth,
  isSameMonth
} from './MonthCalendar.utils';

type UseMonthItemsProps = Pick<
  MonthCalendarProps,
  | 'locale'
  | 'minDate'
  | 'maxDate'
  | 'readOnly'
  | 'disabled'
  | 'selectedDate'
  | 'displayedDate'
  | 'onMonthChange'
>;

export const useMonthItems = ({
  locale,
  minDate,
  maxDate,
  readOnly,
  disabled,
  selectedDate,
  displayedDate,
  onMonthChange
}: UseMonthItemsProps) => {
  const localeMonths = useMemo(
    () => getLocaleMonths(displayedDate, locale),
    [displayedDate, locale]
  );

  const monthItems = useMemo(() => {
    const todayDate = new Date();
    return localeMonths.map(({ format, value }) => ({
      value,
      children: format,
      selected:
        !!selectedDate &&
        isSameMonth({ baseDate: selectedDate, targetDate: value }),
      marked: isSameMonth({ baseDate: todayDate, targetDate: value }),
      readOnly,
      disabled:
        disabled ||
        isLowerMonth({ baseDate: minDate, targetDate: value }) ||
        isHigherMonth({ baseDate: maxDate, targetDate: value }),
      onClick: () => onMonthChange?.(value)
    }));
  }, [
    localeMonths,
    minDate,
    maxDate,
    readOnly,
    disabled,
    selectedDate,
    onMonthChange
  ]);

  return { monthItems };
};
