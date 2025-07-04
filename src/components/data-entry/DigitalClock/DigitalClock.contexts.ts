import { createContext } from 'react';
import {
  TimeStepManualType,
  TimeMode
} from '@/components/data-entry/TimeField';

export type DigitalClockContextType<Mode extends TimeMode = 'preset'> = {
  dateTimeFormat: Intl.DateTimeFormat;
  selectedTime: Date | undefined;
  handleChange: (newTime: Date) => void;
  timeStep: Mode extends 'preset' ? number : TimeStepManualType;
  disabled: boolean;
  minTime?: Date;
  maxTime?: Date;
  disabledTimes?: Array<Date>;
  skipDisabledTime: boolean;
};

const DigitalClockContext =
  createContext<DigitalClockContextType<TimeMode> | null>(null);

export default DigitalClockContext;
