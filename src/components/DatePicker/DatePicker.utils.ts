import { DatePickerProps } from './DatePicker';
import { DateFieldProps } from '@/components/DateField';

export const disabledDatesInDateField = (
  disabledDates: DatePickerProps['disabledDates']
): DateFieldProps['disabledDates'] => {
  if (!disabledDates || Array.isArray(disabledDates)) return disabledDates;
  return ({ date }) =>
    disabledDates({ date, unit: 'year' }) ||
    disabledDates({ date, unit: 'month' }) ||
    disabledDates({ date, unit: 'day' });
};
