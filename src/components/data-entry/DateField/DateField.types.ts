import {
  TOKENS,
  YEAR_DIGITS,
  MONTH_DIGITS,
  DAY_DIGITS,
  KEY_DATE_PARTS
} from './DateField.constants';

export type ValidationError = 'minDate' | 'maxDate' | 'disabledDate';
export type DateOptions =
  | {
      dateStyle: 'short' | 'medium';
    }
  | {
      year?: 'numeric' | '2-digit';
      month?: 'numeric' | '2-digit' | 'long' | 'short';
      day?: 'numeric' | '2-digit';
    };
export type DateObjectType = {
  year?: string;
  month?: string;
  day?: string;
};
export type TokensType = keyof typeof TOKENS;
export type YearDigitTypes = (typeof YEAR_DIGITS)[number];
export type MonthDigitTypes = (typeof MONTH_DIGITS)[number];
export type DayDigitTypes = (typeof DAY_DIGITS)[number];
export type KeyDatePartType = (typeof KEY_DATE_PARTS)[number];
