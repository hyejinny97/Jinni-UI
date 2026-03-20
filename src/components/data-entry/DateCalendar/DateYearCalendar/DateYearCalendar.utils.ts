import { DateYearCalendarProps } from './DateYearCalendar';
import { YearDigitType } from '@/types/date-component';

type GetLocaleYearProps = Pick<DateYearCalendarProps, 'locale' | 'options'> & {
  displayedDate: Date;
};

export const getLocaleYear = ({
  locale,
  options,
  displayedDate
}: GetLocaleYearProps): string => {
  const dateTimeFormat = new Intl.DateTimeFormat(locale, options);
  const yearPart = dateTimeFormat
    .formatToParts()
    .find((part) => part.type === 'year');
  const yearType: YearDigitType =
    yearPart && yearPart.value.length === 2 ? '2-digit' : 'numeric';
  return new Intl.DateTimeFormat(locale, { year: yearType }).format(
    displayedDate
  );
};
