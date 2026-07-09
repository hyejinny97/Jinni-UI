import {
  DisabledTimesFnType,
  DisabledTimesWithUnitFnType,
  TimeMode
} from '@/types/time-component';
import { DateTimeRangePickerProps } from './DateTimeRangePicker';
import { DateTimeRangeFieldProps } from '@/components/DateTimeRangeField';
import {
  RangeDisabledDateTimesWithUnitFnType,
  RangeFieldType
} from '@/types/date-time-component';
import { RangeDisabledDatesFnType } from '@/types/date-component';
import { setDate, setTime } from '@/utils/date-time-component';

export const disabledDateTimesInDateTimeRangeField = <
  Mode extends TimeMode = 'manual'
>({
  timeMode,
  disabledDateTimes
}: {
  timeMode: Mode;
  disabledDateTimes: DateTimeRangePickerProps<'div', Mode>['disabledDateTimes'];
}): DateTimeRangeFieldProps<'div', Mode>['disabledDateTimes'] => {
  if (!disabledDateTimes || Array.isArray(disabledDateTimes))
    return disabledDateTimes;

  switch (timeMode) {
    case 'preset': {
      const fn =
        disabledDateTimes as RangeDisabledDateTimesWithUnitFnType<'preset'>;
      return ({ dateTime, rangeField }) =>
        fn({ dateTime, unit: 'date', rangeField }) ||
        fn({ dateTime, unit: 'time', rangeField });
    }
    case 'manual': {
      const fn =
        disabledDateTimes as RangeDisabledDateTimesWithUnitFnType<'manual'>;
      return ({ dateTime, rangeField }) =>
        fn({ dateTime, unit: 'date', rangeField }) ||
        fn({ dateTime, unit: 'hour', rangeField }) ||
        fn({ dateTime, unit: 'minute', rangeField }) ||
        fn({ dateTime, unit: 'second', rangeField });
    }
  }
};

export const disabledDatesInDateRangeCalendar = <
  Mode extends TimeMode = 'manual'
>({
  timeMode,
  disabledDateTimes,
  dateTimeRangeValue,
  focusedField
}: {
  timeMode: Mode;
  disabledDateTimes: DateTimeRangePickerProps<'div', Mode>['disabledDateTimes'];
  dateTimeRangeValue: Partial<Record<RangeFieldType, Date | null>>;
  focusedField: RangeFieldType | undefined;
}): RangeDisabledDatesFnType | undefined => {
  if (!disabledDateTimes || !focusedField) return;
  if (Array.isArray(disabledDateTimes)) {
    return ({ date }) => {
      const dateTime: Date = setTime({
        base: date,
        target: dateTimeRangeValue[focusedField]
      });
      return disabledDateTimes.some(
        (disabledDateTime) => disabledDateTime.getTime() === dateTime.getTime()
      );
    };
  }

  switch (timeMode) {
    case 'preset': {
      const fn =
        disabledDateTimes as RangeDisabledDateTimesWithUnitFnType<'preset'>;
      return ({ date }) => {
        const dateTime: Date = setTime({
          base: date,
          target: dateTimeRangeValue[focusedField]
        });
        return fn({ dateTime, unit: 'date', rangeField: focusedField });
      };
    }
    case 'manual': {
      const fn =
        disabledDateTimes as RangeDisabledDateTimesWithUnitFnType<'manual'>;
      return ({ date }) => {
        const dateTime: Date = setTime({
          base: date,
          target: dateTimeRangeValue[focusedField]
        });
        return fn({ dateTime, unit: 'date', rangeField: focusedField });
      };
    }
  }
};

export const toDisabledTimes = <Mode extends TimeMode = 'manual'>({
  timeMode,
  disabledDateTimes,
  dateTimeRangeValue,
  focusedField
}: {
  timeMode: Mode;
  disabledDateTimes: DateTimeRangePickerProps<'div', Mode>['disabledDateTimes'];
  dateTimeRangeValue: Partial<Record<RangeFieldType, Date | null>>;
  focusedField: RangeFieldType | undefined;
}): DisabledTimesFnType | DisabledTimesWithUnitFnType | undefined => {
  if (!disabledDateTimes || !focusedField) return;

  switch (timeMode) {
    case 'preset': {
      const disabledTimes: DisabledTimesFnType = ({ time }) => {
        const dateTime: Date = setDate({
          base: time,
          target: dateTimeRangeValue[focusedField]
        });
        if (Array.isArray(disabledDateTimes)) {
          return disabledDateTimes.some(
            (disabledDateTime) =>
              disabledDateTime.getTime() === dateTime.getTime()
          );
        } else {
          const fn =
            disabledDateTimes as RangeDisabledDateTimesWithUnitFnType<'preset'>;
          return fn({ dateTime, unit: 'time', rangeField: focusedField });
        }
      };
      return disabledTimes;
    }
    case 'manual': {
      const disabledTimes: DisabledTimesWithUnitFnType = ({ time, unit }) => {
        const dateTime: Date = setDate({
          base: time,
          target: dateTimeRangeValue[focusedField]
        });
        if (Array.isArray(disabledDateTimes)) {
          return disabledDateTimes.some(
            (disabledDateTime) =>
              disabledDateTime.getTime() === dateTime.getTime()
          );
        } else {
          const fn =
            disabledDateTimes as RangeDisabledDateTimesWithUnitFnType<'manual'>;
          return fn({ dateTime, unit, rangeField: focusedField });
        }
      };
      return disabledTimes;
    }
  }
};
