import { TOKENS, KEY_TIME_PARTS } from './TimeField.constants';

export type ValidationError =
  | 'minTime'
  | 'maxTime'
  | 'disabledTime'
  | 'timeStep';
type Tokens = typeof TOKENS;
export type TokensType = keyof Tokens;
export type KeyTimePartType = (typeof KEY_TIME_PARTS)[number];
export type TimeObjectType = {
  hour?: string;
  minute?: string;
  second?: string;
  dayPeriod?: string;
};
export type TimeStepManualType = {
  hour: number;
  minute: number;
  second: number;
};
