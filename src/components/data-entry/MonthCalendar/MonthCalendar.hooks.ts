import { useState, useMemo } from 'react';
import { MonthCalendarProps } from './MonthCalendar';
import {
  getLocaleMonths,
  isLowerMonth,
  isHigherMonth,
  isSameMonth
} from './MonthCalendar.utils';

type UseDateValueProps = Pick<
  MonthCalendarProps,
  'defaultValue' | 'value' | 'onChange' | 'referenceDate'
>;

type UseMonthItemsProps = Pick<
  MonthCalendarProps,
  'locale' | 'minDate' | 'maxDate' | 'readOnly' | 'disabled'
> & {
  selectedDate: Date | null | undefined;
  displayedDate: Date;
  todayDate: Date;
  changeMonth: (newValue: Date) => void;
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

  const changeMonth = (newValue: Date) => {
    if (!isControlled) setUncontrolledSelectedDate(newValue);
    if (onChange) onChange(newValue);
  };

  return {
    selectedDate,
    displayedDate,
    todayDate,
    changeMonth
  };
};

export const useMonthItems = ({
  locale,
  minDate,
  maxDate,
  readOnly,
  disabled,
  selectedDate,
  displayedDate,
  todayDate,
  changeMonth
}: UseMonthItemsProps) => {
  const localeMonths = useMemo(
    () => getLocaleMonths(displayedDate, locale),
    [displayedDate, locale]
  );

  const monthItems = useMemo(() => {
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
      onClick: () => changeMonth(value)
    }));
  }, [
    localeMonths,
    minDate,
    maxDate,
    readOnly,
    disabled,
    selectedDate,
    todayDate,
    changeMonth
  ]);

  return { monthItems };
};
