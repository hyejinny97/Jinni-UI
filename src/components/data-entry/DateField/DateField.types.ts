import {
  TOKENS,
  YEAR_DIGITS,
  MONTH_DIGITS,
  DAY_DIGITS,
  KEY_DATE_PARTS,
  YEAR_TOKENS,
  MONTH_TOKENS,
  DAY_TOKENS
} from './DateField.constants';

export type DateObjectType = {
  year?: string;
  month?: string;
  day?: string;
};

export type KeyDatePartType = (typeof KEY_DATE_PARTS)[number];

export type TokensType = keyof typeof TOKENS;

export type YearDigitTypes = (typeof YEAR_DIGITS)[number];
export type MonthDigitTypes = (typeof MONTH_DIGITS)[number];
export type DayDigitTypes = (typeof DAY_DIGITS)[number];

export type YearTokensTypes = (typeof YEAR_TOKENS)[number];
export type MonthTokensTypes = (typeof MONTH_TOKENS)[number];
export type DayTokensTypes = (typeof DAY_TOKENS)[number];
