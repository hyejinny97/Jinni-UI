import { TimeValidationError, TimeOptions } from '@/types/time-component';
import { DateOptions, DateValidationError } from '@/types/date-component';

export type DateTimeValidationError = TimeValidationError | DateValidationError;
export type DateTimeOptions = TimeOptions & DateOptions;
