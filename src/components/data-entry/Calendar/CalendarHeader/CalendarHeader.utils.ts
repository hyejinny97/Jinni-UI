import { CalendarHeaderProps } from './CalendarHeader';
import {
  MONTH_DIGITS,
  getLocaleMonthValues,
  YearDigitTypes,
  MonthDigitTypes
} from '@/components/data-entry/DateField';

const DEFAULT_YEAR_OPTION: YearDigitTypes = 'numeric';
const DEFAULT_MONTH_OPTION: MonthDigitTypes = 'long';

export const getDateParts = ({
  type,
  locale,
  options,
  date
}: Pick<CalendarHeaderProps, 'type' | 'locale' | 'options'> & {
  date: Date;
}): Array<Intl.DateTimeFormatPart> => {
  const dateTimeFormat = new Intl.DateTimeFormat(locale, options);

  let yearType: YearDigitTypes = DEFAULT_YEAR_OPTION;
  let monthType: MonthDigitTypes = DEFAULT_MONTH_OPTION;
  dateTimeFormat.formatToParts().forEach((part) => {
    switch (part.type) {
      case 'year':
        yearType = part.value.length === 2 ? '2-digit' : 'numeric';
        return;
      case 'month': {
        const localeMonthValues = getLocaleMonthValues(dateTimeFormat);
        const monthDigit = MONTH_DIGITS.find((digit) => {
          const targetLocaleMonthValues = getLocaleMonthValues(
            new Intl.DateTimeFormat(locale, { month: digit })
          );
          return targetLocaleMonthValues.every((val) =>
            localeMonthValues.includes(val)
          );
        });
        if (monthDigit) {
          monthType = monthDigit;
        }
      }
    }
  });

  if (type === 'year') {
    return new Intl.DateTimeFormat(locale, { year: yearType }).formatToParts(
      date
    );
  } else {
    return new Intl.DateTimeFormat(locale, {
      year: yearType,
      month: monthType
    }).formatToParts(date);
  }
};
