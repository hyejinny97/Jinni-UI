import {
  YearDigitType,
  MonthDigitType,
  DateComponentProps
} from '@/types/date-component';
import { MONTH_DIGITS } from '@/constants/date-component';

type GetDatePartsProps = Pick<DateComponentProps, 'locale' | 'options'> & {
  displayedDate: Date;
};

export const getYearMonthParts = ({
  locale,
  options,
  displayedDate
}: GetDatePartsProps): Array<Intl.DateTimeFormatPart> => {
  const dateTimeFormat = new Intl.DateTimeFormat(locale, options);
  const baseDate = new Date(1970, 0, 1);
  const parts = dateTimeFormat.formatToParts(baseDate);
  const yearPart = parts.find((part) => part.type === 'year');
  const monthPart = parts.find((part) => part.type === 'month');

  const yearType: YearDigitType =
    yearPart && yearPart.value.length === 2 ? '2-digit' : 'numeric';
  const monthType: MonthDigitType =
    (monthPart &&
      MONTH_DIGITS.find(
        (digit) =>
          new Intl.DateTimeFormat(locale, { month: digit })
            .formatToParts(baseDate)
            .find((part) => part.type === 'month')?.value === monthPart.value
      )) ||
    'long';

  return new Intl.DateTimeFormat(locale, {
    year: yearType,
    month: monthType
  }).formatToParts(displayedDate);
};
