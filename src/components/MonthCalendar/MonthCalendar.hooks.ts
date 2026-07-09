import { useMemo } from 'react';
import { MonthCalendarProps } from './MonthCalendar';
import { getLocaleMonths, isSameMonth } from './MonthCalendar.utils';

type UseMonthItemsProps = Pick<
  MonthCalendarProps,
  | 'locale'
  | 'readOnly'
  | 'disabled'
  | 'selectedDate'
  | 'displayedDate'
  | 'onMonthChange'
  | 'disabledDates'
>;

export const useMonthItems = ({
  locale,
  readOnly,
  disabled,
  selectedDate,
  displayedDate,
  onMonthChange,
  disabledDates
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
        disabled: disabled || disabledDates?.({ date: valueReflectingYearDay }),
        onClick: () => onMonthChange?.(valueReflectingYearDay)
      };
    });
  }, [
    localeMonths,
    displayedDate,
    readOnly,
    disabled,
    selectedDate,
    onMonthChange,
    disabledDates
  ]);

  return { monthItems };
};
