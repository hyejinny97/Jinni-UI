import {
  KEY_TIME_PARTS,
  CHRONOLOGICAL_ORDER
} from '@/constants/time-component';
import { ManualDigitalClockProps } from '@/components/data-entry/ManualDigitalClock';
import { PresetDigitalClockProps } from '@/components/data-entry/PresetDigitalClock';

export type TimeMode = 'preset' | 'manual';

export type TimeOptions =
  | {
      timeStyle: 'short' | 'medium';
    }
  | {
      hour?: 'numeric' | '2-digit';
      minute?: 'numeric' | '2-digit';
      second?: 'numeric' | '2-digit';
      hour12?: boolean;
      hourCycle?: 'h11' | 'h12' | 'h23' | 'h24';
    };

export type TimeStepManualType = {
  hour: number;
  minute: number;
  second: number;
};

export type TimeValidationError =
  | 'minTime'
  | 'maxTime'
  | 'disabledTime'
  | 'timeStep';

export type KeyTimePartType = (typeof KEY_TIME_PARTS)[number];

export type TimeComponentProps<Mode extends TimeMode = 'preset'> = {
  defaultValue?: Date;
  value?: Date | null;
  onChange?: (value: Date | null) => void;
  locale?: string;
  options?: TimeOptions;
  minTime?: Date;
  maxTime?: Date;
  disabledTimes?: Array<Date>;
  timeStep?: Mode extends 'preset' ? number : TimeStepManualType;
  readOnly?: boolean;
  disabled?: boolean;
};

export type RangeFieldType = 'start' | 'end';

export type RangeType<T> = Partial<Record<RangeFieldType, T>>;

export type RangeAdornmentType<T> = RangeType<T> & { timeRangeField?: T };

export type TimeRangeValidationError = RangeType<TimeValidationError> & {
  [CHRONOLOGICAL_ORDER]?: boolean;
};

export type TimeRangeComponentProps<Mode extends TimeMode = 'preset'> = {
  mode?: Mode;
  defaultValue?: RangeType<Date>;
  value?: RangeType<Date | null>;
  onChange?: (value: RangeType<Date | null>) => void;
  locale?: string;
  options?: TimeOptions;
  minTime?: RangeType<Date>;
  maxTime?: RangeType<Date>;
  disabledTimes?: RangeType<Array<Date>>;
  timeStep?: Mode extends 'preset' ? number : TimeStepManualType;
  readOnly?: RangeType<boolean>;
  disabled?: RangeType<boolean>;
};

export type DigitalClockProps =
  | ({ mode: 'preset' } & PresetDigitalClockProps)
  | ({ mode: 'manual' } & ManualDigitalClockProps);
