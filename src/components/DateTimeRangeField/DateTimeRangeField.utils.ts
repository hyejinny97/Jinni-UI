import { RangeFieldType } from '@/types/date-time-component';
import { DateTimeRangeFieldProps } from './DateTimeRangeField';
import { DateTimeFieldProps } from '@/components/DateTimeField';

export const disabledDateTimesInDateTimeField = ({
  disabledDateTimes,
  rangeField
}: {
  disabledDateTimes: DateTimeRangeFieldProps['disabledDateTimes'];
  rangeField: RangeFieldType;
}): DateTimeFieldProps['disabledDateTimes'] => {
  if (!disabledDateTimes || Array.isArray(disabledDateTimes)) {
    return disabledDateTimes;
  }
  return ({ dateTime }) => disabledDateTimes({ dateTime, rangeField });
};
