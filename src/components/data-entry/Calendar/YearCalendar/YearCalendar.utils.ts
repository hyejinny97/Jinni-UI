import { LocaleYearType } from './YearCalendar.types';

export const getTwoCenturyLocaleYears = (
  displayedDate: Date,
  locale?: string
): Array<LocaleYearType> => {
  const dateTimeFormat = new Intl.DateTimeFormat(locale, { year: 'numeric' });
  let year: Array<LocaleYearType> = [];
  const currentCentury = Math.floor(new Date().getFullYear() / 100) + 1;
  const startYear = (currentCentury - 2) * 100;
  const endYear = currentCentury * 100 - 1;
  for (let y = startYear; y <= endYear; y++) {
    const date = new Date(displayedDate);
    date.setFullYear(y);
    const parts = dateTimeFormat.formatToParts(date);
    const yearPart = parts.find((p) => p.type === 'year');
    if (yearPart) {
      year.push({ format: yearPart.value, value: date });
    }
  }
  return year;
};

export const isLowerYear = ({
  baseDate,
  targetDate
}: {
  baseDate?: Date;
  targetDate: Date;
}): boolean => {
  if (!baseDate) return false;
  const baseYear = baseDate.getFullYear();
  const targetYear = targetDate.getFullYear();
  return baseYear > targetYear;
};

export const isHigherYear = ({
  baseDate,
  targetDate
}: {
  baseDate?: Date;
  targetDate: Date;
}): boolean => {
  if (!baseDate) return false;
  const baseYear = baseDate.getFullYear();
  const targetYear = targetDate.getFullYear();
  return baseYear < targetYear;
};
