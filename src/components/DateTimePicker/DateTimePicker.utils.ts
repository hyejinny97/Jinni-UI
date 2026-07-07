import {
  DisabledTimesFnType,
  DisabledTimesWithUnitFnType,
  TimeMode
} from '@/types/time-component';
import { DateTimePickerProps } from './DateTimePicker';
import { DateTimeFieldProps } from '@/components/DateTimeField';
import { DisabledDateTimesWithUnitFnType } from '@/types/date-time-component';
import { DisabledDatesWithUnitFnType } from '@/types/date-component';

const setTime = ({ base, target }: { base: Date; target: Date | null }) => {
  const newBase = new Date(base);
  if (target === null) {
    newBase.setHours(0, 0, 0, 0);
  } else {
    newBase.setHours(target.getHours());
    newBase.setMinutes(target.getMinutes());
    newBase.setSeconds(target.getSeconds());
  }
  return newBase;
};

const setDate = ({ base, target }: { base: Date; target: Date | null }) => {
  if (target === null) return base;
  const newBase = new Date(base);
  newBase.setFullYear(target.getFullYear());
  newBase.setMonth(target.getMonth());
  newBase.setDate(target.getDate());
  return newBase;
};

export const disabledDateTimesInDateTimeField = <
  Mode extends TimeMode = 'manual'
>({
  timeMode,
  disabledDateTimes
}: {
  timeMode: Mode;
  disabledDateTimes: DateTimePickerProps<'div', Mode>['disabledDateTimes'];
}): DateTimeFieldProps<Mode>['disabledDateTimes'] => {
  if (!disabledDateTimes || Array.isArray(disabledDateTimes))
    return disabledDateTimes;

  switch (timeMode) {
    case 'preset': {
      const fn = disabledDateTimes as DisabledDateTimesWithUnitFnType<'preset'>;
      return ({ dateTime }) =>
        fn({ dateTime, unit: 'year' }) ||
        fn({ dateTime, unit: 'month' }) ||
        fn({ dateTime, unit: 'day' }) ||
        fn({ dateTime, unit: 'time' });
    }
    case 'manual': {
      const fn = disabledDateTimes as DisabledDateTimesWithUnitFnType<'manual'>;
      return ({ dateTime }) =>
        fn({ dateTime, unit: 'year' }) ||
        fn({ dateTime, unit: 'month' }) ||
        fn({ dateTime, unit: 'day' }) ||
        fn({ dateTime, unit: 'hour' }) ||
        fn({ dateTime, unit: 'minute' }) ||
        fn({ dateTime, unit: 'second' });
    }
  }
};

export const disabledDatesInDateCalendar = <Mode extends TimeMode = 'manual'>({
  timeMode,
  disabledDateTimes,
  dateTimeValue
}: {
  timeMode: Mode;
  disabledDateTimes: DateTimePickerProps<'div', Mode>['disabledDateTimes'];
  dateTimeValue: Date | null;
}): DisabledDatesWithUnitFnType | undefined => {
  if (!disabledDateTimes) return;
  if (Array.isArray(disabledDateTimes)) {
    return ({ date }) => {
      const dateTime: Date = setTime({ base: date, target: dateTimeValue });
      return disabledDateTimes.some(
        (disabledDateTime) => disabledDateTime.getTime() === dateTime.getTime()
      );
    };
  }

  switch (timeMode) {
    case 'preset': {
      const fn = disabledDateTimes as DisabledDateTimesWithUnitFnType<'preset'>;
      return ({ date, unit }) => {
        const dateTime: Date = setTime({ base: date, target: dateTimeValue });
        return fn({ dateTime, unit });
      };
    }
    case 'manual': {
      const fn = disabledDateTimes as DisabledDateTimesWithUnitFnType<'manual'>;
      return ({ date, unit }) => {
        const dateTime: Date = setTime({ base: date, target: dateTimeValue });
        return fn({ dateTime, unit });
      };
    }
  }
};

export const toDisabledTimes = <Mode extends TimeMode = 'manual'>({
  timeMode,
  disabledDateTimes,
  dateTimeValue
}: {
  timeMode: Mode;
  disabledDateTimes: DateTimePickerProps<'div', Mode>['disabledDateTimes'];
  dateTimeValue: Date | null;
}): DisabledTimesFnType | DisabledTimesWithUnitFnType | undefined => {
  if (!disabledDateTimes) return;

  switch (timeMode) {
    case 'preset': {
      const disabledTimes: DisabledTimesFnType = ({ time }) => {
        const dateTime: Date = setDate({ base: time, target: dateTimeValue });
        if (Array.isArray(disabledDateTimes)) {
          return disabledDateTimes.some(
            (disabledDateTime) =>
              disabledDateTime.getTime() === dateTime.getTime()
          );
        } else {
          const fn =
            disabledDateTimes as DisabledDateTimesWithUnitFnType<'preset'>;
          return fn({ dateTime, unit: 'time' });
        }
      };
      return disabledTimes;
    }
    case 'manual': {
      const disabledTimes: DisabledTimesWithUnitFnType = ({ time, unit }) => {
        const dateTime: Date = setDate({ base: time, target: dateTimeValue });
        if (Array.isArray(disabledDateTimes)) {
          return disabledDateTimes.some(
            (disabledDateTime) =>
              disabledDateTime.getTime() === dateTime.getTime()
          );
        } else {
          const fn =
            disabledDateTimes as DisabledDateTimesWithUnitFnType<'manual'>;
          return fn({ dateTime, unit });
        }
      };
      return disabledTimes;
    }
  }
};
