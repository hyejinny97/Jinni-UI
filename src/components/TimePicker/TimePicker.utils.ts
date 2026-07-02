import {
  DisabledTimesFnType,
  DisabledTimesWithUnitFnType
} from '@/types/time-component';
import { isDisabledTimesWithUnitFn } from '@/utils/time-component';

export const disabledTimesInTimeField = (
  disabledTimes: Array<Date> | DisabledTimesFnType | DisabledTimesWithUnitFnType
): Array<Date> | DisabledTimesFnType => {
  if (
    !Array.isArray(disabledTimes) &&
    isDisabledTimesWithUnitFn(disabledTimes)
  ) {
    return ({ time }: { time: Date }) =>
      disabledTimes({ time, unit: 'hour' }) ||
      disabledTimes({ time, unit: 'minute' }) ||
      disabledTimes({ time, unit: 'second' });
  }
  return disabledTimes;
};
