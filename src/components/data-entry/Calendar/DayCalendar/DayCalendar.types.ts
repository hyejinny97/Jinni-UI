export type LocaleDayType = {
  type: 'day' | 'outside-day';
  format: string;
  value: Date;
};
export type DaysType = Array<
  | { type: 'week-number'; format: string }
  | { type: 'empty-day' }
  | LocaleDayType
>;
export type LocaleWeekDayType = {
  type: 'weekday';
  format: string;
};
export type WeekDaysType = Array<
  { type: 'week-number'; format: string } | LocaleWeekDayType
>;
