import { DateTimeOptions } from '@/types/date-time-component';
import { TimeOptions } from '@/types/time-component';
import { DateOptions } from '@/types/date-component';
import { DEFAULT_TIME_OPTIONS } from '@/constants/time-component';

export const filterTimeOptions = (options?: DateTimeOptions) => {
  if (!options) return;
  const timeOptionKeys = new Set([
    'timeStyle',
    'hour',
    'minute',
    'second',
    'hour12',
    'hourCycle'
  ]);
  const filteredTimeOptions: TimeOptions = {};
  Object.keys(options).forEach((key) => {
    if (timeOptionKeys.has(key)) {
      const timeOptionKey = key as keyof TimeOptions;
      filteredTimeOptions[timeOptionKey] = options[timeOptionKey];
    }
  });
  return Object.keys(filteredTimeOptions).length === 0
    ? DEFAULT_TIME_OPTIONS
    : filteredTimeOptions;
};

export const filterDateOptions = (options?: DateTimeOptions) => {
  if (!options) return;
  const dateOptionKeys = new Set(['dateStyle', 'year', 'month', 'day']);
  const filteredDateOptions: DateOptions = {};
  Object.keys(options).forEach((key) => {
    if (dateOptionKeys.has(key)) {
      const dateOptionKey = key as keyof DateOptions;
      filteredDateOptions[dateOptionKey] = options[dateOptionKey];
    }
  });
  return filteredDateOptions;
};
