import { isObject } from '@/utils/isObject';
import { isNumber } from '@/utils/isNumber';
import { TimeStepManualType } from '@/types/time-component';

export const dateToSeconds = (date: Date) => {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return hour * 3600 + minute * 60 + second;
};

export const isTimeStepManualType = (
  timeStep: unknown
): timeStep is TimeStepManualType =>
  isObject(timeStep) &&
  Object.entries(timeStep).every(
    ([key, value]) =>
      ['hour', 'minute', 'second'].includes(key) && isNumber(value)
  );
