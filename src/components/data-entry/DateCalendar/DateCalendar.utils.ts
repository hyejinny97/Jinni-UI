import { CALENDARS } from './DateCalendar.constants';
import { CalendarType } from './DateCalendar.types';
import { DateOptions } from '@/types/date-component';

export const getBaseCalendarType = ({
  locale,
  options
}: {
  locale?: string;
  options?: DateOptions;
}): CalendarType => {
  const dateTimeFormat = new Intl.DateTimeFormat(locale, options);
  const dateParts = dateTimeFormat.formatToParts();
  const datePartTypes = new Set(dateParts.map((part) => part.type));
  for (const calendarType of CALENDARS) {
    if (datePartTypes.has(calendarType)) {
      return calendarType;
    }
  }
  throw new Error('Calendar Type을 찾을 수 없습니다.');
};
