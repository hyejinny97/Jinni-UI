import { TimeOptions } from '@/types/time-component';

export const DEFAULT_TIME_OPTIONS: TimeOptions = {
  timeStyle: 'short'
};

export const KEY_TIME_PARTS = [
  'hour',
  'minute',
  'second',
  'dayPeriod'
] as const;
