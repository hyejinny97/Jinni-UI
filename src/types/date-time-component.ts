import {
  TimeOptions,
  TimeStepManualType,
  TimeMode,
  TimeValidationError
} from '@/types/time-component';
import { DateOptions, DateValidationError } from '@/types/date-component';
import {
  CHRONOLOGICAL_ORDER,
  INCLUDE_DISABLED_DATE
} from '@/constants/date-time-component';

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

export type RangeFieldType = 'start' | 'end';

export type RangeType<T> = Partial<Record<RangeFieldType, T>>;

export type RangeAdornmentType<T> = RangeType<T> & { dateTimeRangeField?: T };

export type DateTimeRangeValidationError =
  RangeType<DateTimeValidationError> & {
    [CHRONOLOGICAL_ORDER]?: boolean;
    [INCLUDE_DISABLED_DATE]?: boolean;
  };

export type DateTimeRangeComponent<Mode extends TimeMode = 'preset'> = {
  defaultValue?: RangeType<Date>;
  value?: RangeType<Date | null>;
  onChange?: (value: RangeType<Date | null>) => void;
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
