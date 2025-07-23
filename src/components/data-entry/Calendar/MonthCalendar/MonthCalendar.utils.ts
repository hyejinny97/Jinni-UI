import { LocaleMonthType } from './MonthCalendar.types';

export const getLocaleMonths = (
  displayedDate: Date,
  locale?: string
): Array<LocaleMonthType> => {
  const dateTimeFormat = new Intl.DateTimeFormat(locale, { month: 'short' });
  let month: Array<LocaleMonthType> = [];
  for (let m = 0; m < 12; m++) {
    const date = new Date(displayedDate);
    date.setMonth(m);
    const parts = dateTimeFormat.formatToParts(date);
    const monthPart = parts.find((p) => p.type === 'month');
    if (monthPart) {
      month.push({ format: monthPart.value, value: date });
    }
  }
  return month;
};

export const isLowerMonth = ({
  baseDate,
  targetDate
}: {
  baseDate?: Date;
  targetDate: Date;
}): boolean => {
  if (!baseDate) return false;
  const baseYear = baseDate.getFullYear();
  const baseMonth = baseDate.getMonth();
  const targetYear = targetDate.getFullYear();
  const targetMonth = targetDate.getMonth();
  return baseYear === targetYear && baseMonth > targetMonth;
};

export const isHigherMonth = ({
  baseDate,
  targetDate
}: {
  baseDate?: Date;
  targetDate: Date;
}): boolean => {
  if (!baseDate) return false;
  const baseYear = baseDate.getFullYear();
  const baseMonth = baseDate.getMonth();
  const targetYear = targetDate.getFullYear();
  const targetMonth = targetDate.getMonth();
  return baseYear === targetYear && baseMonth < targetMonth;
};
