import { useState, useMemo } from 'react';
import { CalendarType } from './DateCalendar.types';
import { DateCalendarProps } from './DateCalendar';
import { getBaseCalendarType } from './DateCalendar.utils';

type UseCalendarTypeProps = Pick<DateCalendarProps, 'locale' | 'options'>;

type UseDateValueProps = Pick<
  DateCalendarProps,
  'defaultValue' | 'value' | 'onChange'
>;

export const useCalendarType = ({ locale, options }: UseCalendarTypeProps) => {
  const baseCalendarType = useMemo<CalendarType>(
    () => getBaseCalendarType({ locale, options }),
    [locale, options]
  );
  const [calendarType, setCalendarType] =
    useState<CalendarType>(baseCalendarType);

  const changeToYearCalendar = () => {
    setCalendarType('year');
  };
  const changeToMonthCalendar = () => {
    setCalendarType('month');
  };
  const changeToBaseCalendar = () => {
    setCalendarType(baseCalendarType);
  };

  return {
    baseCalendarType,
    calendarType,
    changeToYearCalendar,
    changeToMonthCalendar,
    changeToBaseCalendar
  };
};

export const useDateValue = ({
  defaultValue,
  value,
  onChange
}: UseDateValueProps) => {
  const isControlled = value !== undefined;
  const [uncontrolledSelectedDate, setUncontrolledSelectedDate] = useState<
    Date | undefined
  >(defaultValue);
  const selectedDate = isControlled ? value : uncontrolledSelectedDate;

  const onSelectDate = (newValue: Date) => {
    if (!isControlled) setUncontrolledSelectedDate(newValue);
    if (onChange) onChange(newValue);
  };

  return {
    selectedDate,
    onSelectDate
  };
};
