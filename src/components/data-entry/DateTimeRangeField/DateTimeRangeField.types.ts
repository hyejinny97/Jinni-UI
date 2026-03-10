import { DateValidationError } from '@/components/data-entry/DateField';
import { TimeValidationError } from '@/types/time-component';
import {
  CHRONOLOGICAL_ORDER,
  INCLUDE_DISABLED_DATE
} from './DateTimeRangeField.constants';

export type RangeType<T> = { start: T; end: T };
export type AdornmentType<T> = Partial<RangeType<T>> & {
  dateTimeRangeField?: T;
};
export type DateTimeRangeValidationError = Partial<
  RangeType<DateValidationError | TimeValidationError>
> & {
  [CHRONOLOGICAL_ORDER]?: boolean;
  [INCLUDE_DISABLED_DATE]?: boolean;
};
