import { LocaleMonthType } from './MonthCalendar.types';

export const getLocaleMonths = (
  year: number,
  locale?: string
): Array<LocaleMonthType> => {
  const dateTimeFormat = new Intl.DateTimeFormat(locale, { month: 'short' });
  let month: Array<LocaleMonthType> = [];
  for (let m = 0; m < 12; m++) {
    const date = new Date(year, m);
    const parts = dateTimeFormat.formatToParts(date);
    const monthPart = parts.find((p) => p.type === 'month');
    if (monthPart) {
      month.push({ format: monthPart.value, value: date });
    }
  }
  return month;
};
