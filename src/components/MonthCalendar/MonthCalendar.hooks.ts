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
  const localeMonths = useMemo(() => getLocaleMonths(locale), [locale]);

  const monthItems = useMemo(() => {
    const todayDate = new Date();
    return localeMonths.map(({ format, value }) => {
      const valueReflectingYear = new Date(value);
      valueReflectingYear.setFullYear(displayedDate.getFullYear());
      const valueReflectingYearDay = new Date(valueReflectingYear);
      valueReflectingYearDay.setDate(displayedDate.getDate());
      return {
        actualMonth: value.getMonth(),
        value: valueReflectingYearDay,
        children: format,
        selected:
          !!selectedDate &&
          isSameMonth({
            baseDate: selectedDate,
            targetDate: valueReflectingYear
          }),
        marked: isSameMonth({
          baseDate: todayDate,
          targetDate: valueReflectingYear
        }),
        readOnly,
        disabled:
          disabled ||
          isLowerMonth({
            baseDate: minDate,
            targetDate: valueReflectingYear
          }) ||
          isHigherMonth({
            baseDate: maxDate,
            targetDate: valueReflectingYear
          }),
        onClick: () => onMonthChange?.(valueReflectingYearDay)
      };
    });
  }, [
    localeMonths,
    displayedDate,
    minDate,
    maxDate,
    readOnly,
    disabled,
    selectedDate,
    onMonthChange
  ]);

  return { monthItems };
};
