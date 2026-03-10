import { TimeValidationError, TimeOptions } from '@/types/time-component';
import {
  DateValidationError,
  DateOptions
} from '@/components/data-entry/DateField';

export type DateTimeValidationError = TimeValidationError | DateValidationError;
export type DateTimeOptions = TimeOptions & DateOptions;
