import {
  TimeValidationError,
  TimeOptions
} from '@/components/data-entry/TimeField';
import {
  DateValidationError,
  DateOptions
} from '@/components/data-entry/DateField';

export type DateTimeValidationError = TimeValidationError | DateValidationError;
export type DateTimeOptions = TimeOptions & DateOptions;
