import {
  TimeOptions,
  TimeStepManualType,
  TimeMode
} from '@/types/time-component';
import { DateOptions } from '@/types/date-component';
import {
  CHRONOLOGICAL_ORDER,
  INCLUDE_DISABLED_DATE
} from '@/constants/date-time-component';

export type DateTimeOptions = TimeOptions & DateOptions;

export type DateTimeValidationError = 'disabledDateTime' | 'timeStep';

export type DisabledDateTimesFnType = ({
  dateTime
}: {
  dateTime: Date;
  unit?: never;
}) => boolean;

export type DisabledDateTimesWithUnitFnType<Mode extends TimeMode = 'preset'> =
  Mode extends 'preset'
    ? ({
        dateTime,
        unit
      }: {
        dateTime: Date;
        unit: 'year' | 'month' | 'day' | 'time';
      }) => boolean
    : ({
        dateTime,
        unit
      }: {
        dateTime: Date;
        unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';
      }) => boolean;

export type DateTimeComponentProps<Mode extends TimeMode = 'preset'> = {
  defaultValue?: Date;
  value?: Date | null;
  onChange?: (value: Date | null) => void;
  locale?: string;
  options?: DateTimeOptions;
  timeMode?: Mode;
  timeStep?: Mode extends 'preset' ? number : TimeStepManualType;
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
