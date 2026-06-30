import {
  DisabledTimesFnType,
  DisabledTimesWithUnitFnType
} from '@/types/time-component';
import { isDisabledTimesWithUnitFnType } from '@/utils/time-component';

export const disabledTimesInTimeField = (
  disabledTimes: Array<Date> | DisabledTimesFnType | DisabledTimesWithUnitFnType
): Array<Date> | DisabledTimesFnType => {
  if (
    !Array.isArray(disabledTimes) &&
    isDisabledTimesWithUnitFnType(disabledTimes)
  ) {
    return ({ time }: { time: Date }) =>
      disabledTimes({ time, unit: 'hour' }) ||
      disabledTimes({ time, unit: 'minute' }) ||
      disabledTimes({ time, unit: 'second' });
  }
  return disabledTimes;
};
