import { KEY_TIME_PARTS } from '@/constants/time-component';

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
