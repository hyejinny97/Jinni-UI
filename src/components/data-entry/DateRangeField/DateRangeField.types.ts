import {
  CHRONOLOGICAL_ORDER,
  INCLUDE_DISABLED_DATE
} from './DateRangeField.constants';
import { DateValidationError } from '@/types/date-component';

export type RangeType<T> = { start: T; end: T };
export type AdornmentType<T> = Partial<RangeType<T>> & { dateRangeField?: T };
export type DateRangeValidationError = Partial<
  RangeType<DateValidationError>
> & {
  [CHRONOLOGICAL_ORDER]?: boolean;
  [INCLUDE_DISABLED_DATE]?: boolean;
};
