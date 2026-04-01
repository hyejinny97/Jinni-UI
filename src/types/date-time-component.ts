import {
  TimeOptions,
  TimeStepManualType,
  TimeMode,
  TimeValidationError
} from '@/types/time-component';
import { DateOptions, DateValidationError } from '@/types/date-component';

export type DateTimeOptions = TimeOptions & DateOptions;

export type DateTimeValidationError = {
  date?: DateValidationError;
  time?: TimeValidationError;
};

export type DateTimeComponentProps<Mode extends TimeMode = 'preset'> = {
  defaultValue?: Date;
  value?: Date | null;
  onChange?: (value: Date | null) => void;
  locale?: string;
  options?: DateTimeOptions;
  timeMode?: Mode;
  timeStep?: Mode extends 'preset' ? number : TimeStepManualType;
  minTime?: Date;
  maxTime?: Date;
  disabledTimes?: Array<Date>;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Array<Date>;
  readOnly?: boolean;
  disabled?: boolean;
};
