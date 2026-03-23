import { TOKENS } from './TimeField.constants';
import { KEY_TIME_PARTS } from '@/constants/time-component';
import { KeyTimePartType } from '@/types/time-component';
import { is2Digit } from '@/utils/dateTimeFormat';

export const findHourTokenType = (localeHourValues: Array<string>) => {
  const is2DigitType = is2Digit(localeHourValues);
  let tokenHourCycle;
  if (localeHourValues.length === 12) {
    tokenHourCycle = localeHourValues[0] === '12' ? 'h12' : 'h11';
  } else {
    tokenHourCycle = localeHourValues[0] === '24' ? 'h24' : 'h23';
  }
  for (const [token, value] of Object.entries(TOKENS)) {
    if (value.type !== 'hour') continue;
    const matchDigit = is2DigitType
      ? value.digit === '2-digit'
      : value.digit === 'numeric';
    const matchHourCycle = tokenHourCycle === value.hourCycle;
    if (matchDigit && matchHourCycle) return token;
  }
  throw new Error(`hour token type을 찾을 수 없습니다.`);
};

export const findMinuteTokenType = (localeMinuteValues: Array<string>) => {
  const is2DigitType = is2Digit(localeMinuteValues);
  for (const [token, value] of Object.entries(TOKENS)) {
    if (value.type !== 'minute') continue;
    const matchDigit = is2DigitType
      ? value.digit === '2-digit'
      : value.digit === 'numeric';
    if (matchDigit) return token;
  }
  throw new Error(`minute token type을 찾을 수 없습니다.`);
};

export const findSecondTokenType = (localeSecondValues: Array<string>) => {
  const is2DigitType = is2Digit(localeSecondValues);
  for (const [token, value] of Object.entries(TOKENS)) {
    if (value.type !== 'second') continue;
    const matchDigit = is2DigitType
      ? value.digit === '2-digit'
      : value.digit === 'numeric';
    if (matchDigit) return token;
  }
  throw new Error(`second token type을 찾을 수 없습니다.`);
};

export const findDayPeriodTokenType = (dayPeriodValue: string) => {
  const lettersCase =
    dayPeriodValue.toLocaleUpperCase() === dayPeriodValue ? 'upper' : 'lower';
  for (const [token, value] of Object.entries(TOKENS)) {
    if (value.type !== 'dayPeriod') continue;
    const matchCase = lettersCase === value.case;
    if (matchCase) return token;
  }
  throw new Error(`dayPeriod token type을 찾을 수 없습니다.`);
};

export const isKeyTimePart = (
  type: keyof Intl.DateTimeFormatPartTypesRegistry
): type is KeyTimePartType => KEY_TIME_PARTS.some((part) => part === type);
