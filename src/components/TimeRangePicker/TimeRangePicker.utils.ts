import {
  RangeDisabledTimesFnType,
  RangeDisabledTimesWithUnitFnType
} from '@/types/time-component';
import { isRangeDisabledTimesWithUnitFn } from '@/utils/time-component';

export const disabledTimesInTimeRangeField = (
  disabledTimes:
    | Array<Date>
    | RangeDisabledTimesFnType
    | RangeDisabledTimesWithUnitFnType
): Array<Date> | RangeDisabledTimesFnType => {
  if (
    !Array.isArray(disabledTimes) &&
    isRangeDisabledTimesWithUnitFn(disabledTimes)
  ) {
    return ({ time, rangeField }) =>
      disabledTimes({ time, unit: 'hour', rangeField }) ||
      disabledTimes({ time, unit: 'minute', rangeField }) ||
      disabledTimes({ time, unit: 'second', rangeField });
  }
  return disabledTimes;
};
