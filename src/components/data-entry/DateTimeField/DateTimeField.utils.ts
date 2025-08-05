import { DateTimeOptions } from './DateTimeField.types';
import { TimeOptions } from '@/components/data-entry/TimeField';
import { DateOptions } from '@/components/data-entry/DateField';

export const filterTimeOptions = (options?: DateTimeOptions) => {
  if (!options) return;
  const timeOptionKeys = [
    'timeStyle',
    'hour',
    'minute',
    'second',
    'hour12',
    'hourCycle'
  ];
  const filteredTimeOptions: TimeOptions = {};
  Object.keys(options).forEach((key) => {
    if (timeOptionKeys.includes(key)) {
      const timeOptionKey = key as keyof TimeOptions;
      filteredTimeOptions[timeOptionKey] = options[timeOptionKey];
    }
  });
  return filteredTimeOptions;
};

export const filterDateOptions = (options?: DateTimeOptions) => {
  if (!options) return;
  const dateOptionKeys = ['dateStyle', 'year', 'month', 'day'];
  const filteredDateOptions: DateOptions = {};
  Object.keys(options).forEach((key) => {
    if (dateOptionKeys.includes(key)) {
      const dateOptionKey = key as keyof DateOptions;
      filteredDateOptions[dateOptionKey] = options[dateOptionKey];
    }
  });
  return filteredDateOptions;
};
