import { TOKENS } from './TimeField.constants';

export type TokensType = keyof typeof TOKENS;

export type TimeObjectType = {
  hour?: string;
  minute?: string;
  second?: string;
  dayPeriod?: string;
};
