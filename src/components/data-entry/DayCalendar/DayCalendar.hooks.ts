import { useState, useMemo } from 'react';
import { DayCalendarProps } from './DayCalendar';
import {
  getLocaleWeekDays,
  getLocaleDays,
  getWeekNumber,
  isSameDay,
  isHigherDay,
  isLowerDay
} from './DayCalendar.utils';
import {
  WeekDaysType,
  LocaleWeekDayType,
  DaysType,
  LocaleDayType
} from './DayCalendar.types';

type UseDateValueProps = Pick<
  DayCalendarProps,
  'defaultValue' | 'value' | 'onChange' | 'referenceDate'
>;

type UseWeekDayItemsProps = Pick<
  DayCalendarProps,
  'locale' | 'displayWeekNumber'
>;

type UseDayItemsProps = Pick<
  DayCalendarProps,
  | 'locale'
  | 'minDate'
  | 'maxDate'
  | 'disabledDates'
  | 'readOnly'
  | 'disabled'
  | 'displayWeekNumber'
  | 'fixedWeekNumber'
  | 'showDaysOutsideCurrentMonth'
> & {
  displayedDate: Date;
  selectedDate: Date | null | undefined;
  todayDate: Date;
  changeDay: (newValue: Date) => void;
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

  const changeDay = (newValue: Date) => {
    if (!isControlled) setUncontrolledSelectedDate(newValue);
    if (onChange) onChange(newValue);
  };

  return {
    selectedDate,
    displayedDate,
    todayDate,
    changeDay
  };
};

export const useWeekDayItems = ({
  locale,
  displayWeekNumber
}: UseWeekDayItemsProps) => {
  const localeWeekDays = useMemo<Array<LocaleWeekDayType>>(
    () => getLocaleWeekDays(locale),
    [locale]
  );

  const weekDayItems = useMemo<WeekDaysType>(
    () =>
      displayWeekNumber
        ? [{ type: 'week-number', format: '#' }, ...localeWeekDays]
        : localeWeekDays,
    [localeWeekDays, displayWeekNumber]
  );

  return { weekDayItems };
};

export const useDayItems = ({
  locale,
  minDate,
  maxDate,
  disabledDates,
  readOnly,
  disabled,
  displayWeekNumber,
  fixedWeekNumber,
  showDaysOutsideCurrentMonth,
  displayedDate,
  selectedDate,
  todayDate,
  changeDay
}: UseDayItemsProps) => {
  const year = displayedDate.getFullYear();
  const month = displayedDate.getMonth();

  const { firstDay, weekDayOfFirstDay, daysInMonth, weeks } = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const weekDayOfFirstDay = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const weeks =
      fixedWeekNumber || Math.ceil((weekDayOfFirstDay + daysInMonth) / 7);
    return {
      firstDay,
      weekDayOfFirstDay,
      daysInMonth,
      weeks
    };
  }, [year, month, fixedWeekNumber]);

  const localeDays = useMemo<Array<LocaleDayType>>(() => {
    return getLocaleDays({
      locale,
      displayedDate,
      startDay: showDaysOutsideCurrentMonth ? -weekDayOfFirstDay + 1 : 1,
      endDay: showDaysOutsideCurrentMonth
        ? weeks * 7 - weekDayOfFirstDay
        : daysInMonth
    });
  }, [
    locale,
    displayedDate,
    showDaysOutsideCurrentMonth,
    weekDayOfFirstDay,
    weeks,
    daysInMonth
  ]);

  const days = useMemo<DaysType>(() => {
    let items: DaysType = localeDays;
    if (!showDaysOutsideCurrentMonth) {
      const startEmptyDays = Array(weekDayOfFirstDay).fill({
        type: 'empty-day'
      });
      const endEmptyDays = Array(
        weeks * 7 - daysInMonth - weekDayOfFirstDay
      ).fill({ type: 'empty-day' });
      items = [...startEmptyDays, ...localeDays, ...endEmptyDays];
    }
    if (displayWeekNumber) {
      const firstWeekNumber = getWeekNumber(firstDay);
      const itemsWithWeekNumber = [...items]
        .map((day, idx) => {
          if (idx % 7 === 0) {
            return [
              {
                type: 'week-number',
                format: `${firstWeekNumber + Math.floor(idx / 7)}. `
              },
              day
            ];
          }
          return day;
        })
        .flat() as DaysType;
      items = itemsWithWeekNumber;
    }
    return items;
  }, [
    localeDays,
    showDaysOutsideCurrentMonth,
    displayWeekNumber,
    weekDayOfFirstDay,
    daysInMonth,
    firstDay,
    weeks
  ]);

  const dayItems = useMemo(() => {
    return days.map((day) => {
      switch (day.type) {
        case 'empty-day':
        case 'week-number':
          return day;
        case 'day':
        case 'outside-day': {
          const { type, format, value } = day;
          return {
            type,
            className: type,
            value,
            children: format,
            selected:
              !!selectedDate &&
              isSameDay({ baseDate: selectedDate, targetDate: value }),
            marked: isSameDay({ baseDate: todayDate, targetDate: value }),
            readOnly,
            disabled:
              disabled ||
              isLowerDay({ baseDate: minDate, targetDate: value }) ||
              isHigherDay({ baseDate: maxDate, targetDate: value }) ||
              (disabledDates &&
                disabledDates.some((disabledDate) =>
                  isSameDay({ baseDate: value, targetDate: disabledDate })
                )),
            disableRipple: type === 'outside-day',
            onClick: () => changeDay(value)
          };
        }
      }
    });
  }, [
    days,
    minDate,
    maxDate,
    disabledDates,
    readOnly,
    disabled,
    selectedDate,
    todayDate,
    changeDay
  ]);

  return { dayItems };
};
