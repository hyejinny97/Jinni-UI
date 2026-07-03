import { DateCalendarProps } from './DateCalendar';
import { DateYearCalendarProps } from '@/components/DateYearCalendar';
import { DateMonthCalendarProps } from '@/components/DateMonthCalendar';
import { DateDayCalendarProps } from '@/components/DateDayCalendar';

export const disabledDatesInYearCalendar = (
  disabledDates: DateCalendarProps['disabledDates']
): DateYearCalendarProps['disabledDates'] => {
  if (!disabledDates || Array.isArray(disabledDates)) return;
  return ({ date }) => disabledDates({ date, unit: 'year' });
};

export const disabledDatesInMonthCalendar = (
  disabledDates: DateCalendarProps['disabledDates']
): DateMonthCalendarProps['disabledDates'] => {
  if (!disabledDates || Array.isArray(disabledDates)) return;
  return ({ date }) => disabledDates({ date, unit: 'month' });
};

export const disabledDatesInDayCalendar = (
  disabledDates: DateCalendarProps['disabledDates']
): DateDayCalendarProps['disabledDates'] => {
  if (!disabledDates || Array.isArray(disabledDates)) return disabledDates;
  return ({ date }) => disabledDates({ date, unit: 'day' });
};
