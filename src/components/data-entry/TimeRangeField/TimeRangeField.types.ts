import { TimeValidationError } from '@/components/data-entry/TimeField';
import { CHRONOLOGICAL_ORDER } from './TimeRangeField.constants';

export type RangeType<T> = { start?: T; end?: T };
export type AdornmentType<T> = RangeType<T> & { timeRangeField?: T };
export type TimeRangeValidationError = RangeType<TimeValidationError> & {
  [CHRONOLOGICAL_ORDER]?: boolean;
};
