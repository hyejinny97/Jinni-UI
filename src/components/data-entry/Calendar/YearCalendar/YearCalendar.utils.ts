import { LocaleYearType } from './YearCalendar.types';

export const getTwoCenturyLocaleYears = (
  dateTimeFormat: Intl.DateTimeFormat
): Array<LocaleYearType> => {
  let year: Array<LocaleYearType> = [];
  const currentCentury = Math.floor(new Date().getFullYear() / 100) + 1;
  const startYear = (currentCentury - 2) * 100;
  const endYear = currentCentury * 100 - 1;
  for (let y = startYear; y <= endYear; y++) {
    const date = new Date(`${y}`);
    const parts = dateTimeFormat.formatToParts(date);
    const yearPart = parts.find((p) => p.type === 'year');
    if (yearPart) {
      year.push({ format: yearPart.value, value: date });
    }
  }
  return year;
};
