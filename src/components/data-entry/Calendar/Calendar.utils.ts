import { CalendarType } from './CalendarHeader';
import { DateOptions } from '@/types/date-component';

const CALENDAR_TYPE_PRIORITY = ['day', 'month', 'year'] as const;

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
  for (let calendarType of CALENDAR_TYPE_PRIORITY) {
    if (datePartTypes.has(calendarType)) {
      return calendarType;
    }
  }
  throw new Error('Calendar Type을 찾을 수 없습니다.');
};
