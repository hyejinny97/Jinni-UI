import { TimeItemType } from './DigitalClock.types';
import {
  KeyTimePartType,
  TimeStepManualType
} from '@/components/data-entry/TimeField';

export const generateTimePreset = ({
  dateTimeFormat,
  timeStep
}: {
  dateTimeFormat: Intl.DateTimeFormat;
  timeStep: number;
}): Array<TimeItemType> => {
  const timePreset = [];
  const ONE_DAY = 24 * 60 * 60;
  const initTimeStamp = new Date(2025, 7, 1).getTime();
  for (let t = 0; t < ONE_DAY; t += timeStep) {
    const date = new Date(initTimeStamp + t * 1000);
    const format = dateTimeFormat.format(date);
    timePreset.push({ format, value: date });
  }
  return timePreset;
};

export const isSameTimeByUnits = ({
  baseTime,
  targetTime,
  units
}: {
  baseTime: Date;
  targetTime: Date;
  units: Array<KeyTimePartType>;
}): boolean => {
  for (const unit of units) {
    switch (unit) {
      case 'hour':
        if (baseTime.getHours() !== targetTime.getHours()) return false;
        break;
      case 'minute':
        if (baseTime.getMinutes() !== targetTime.getMinutes()) return false;
        break;
      case 'second':
        if (baseTime.getSeconds() !== targetTime.getSeconds()) return false;
        break;
      case 'dayPeriod':
        if (baseTime.getHours() < 12 && targetTime.getHours() >= 12)
          return false;
        if (baseTime.getHours() >= 12 && targetTime.getHours() < 12)
          return false;
        break;
    }
  }
  return true;
};

export const getLocaleHourValues = ({
  dateTimeFormat,
  timeStep,
  selectedTime
}: {
  dateTimeFormat: Intl.DateTimeFormat;
  timeStep: TimeStepManualType;
  selectedTime?: Date | null;
}): Array<TimeItemType> => {
  const hours: Array<TimeItemType> = [];
  const { hour12 } = dateTimeFormat.resolvedOptions();
  let startHour, endHour;
  if (hour12) {
    const isMorning = !selectedTime || selectedTime.getHours() < 12;
    if (isMorning) {
      startHour = 0;
      endHour = 11;
    } else {
      startHour = 12;
      endHour = 23;
    }
  } else {
    startHour = 0;
    endHour = 23;
  }
  for (let h = startHour; h <= endHour; h += timeStep.hour) {
    let date = new Date(2025, 0, 1, h);
    if (selectedTime) {
      date = new Date(selectedTime);
      date.setHours(h);
    }
    const parts = dateTimeFormat.formatToParts(date);
    const hourPart = parts.find((p) => p.type === 'hour');
    if (hourPart) {
      hours.push({
        format: hourPart.value,
        value: date
      });
    }
  }
  return hours;
};

export const getLocaleMinuteValues = ({
  dateTimeFormat,
  timeStep,
  selectedTime
}: {
  dateTimeFormat: Intl.DateTimeFormat;
  timeStep: TimeStepManualType;
  selectedTime?: Date | null;
}): Array<TimeItemType> => {
  const minutes: Array<TimeItemType> = [];
  for (let m = 0; m < 60; m += timeStep.minute) {
    let date = new Date(2025, 0, 1, 1, m);
    if (selectedTime) {
      date = new Date(selectedTime);
      date.setMinutes(m);
    }
    const parts = dateTimeFormat.formatToParts(date);
    const minutePart = parts.find((p) => p.type === 'minute');
    if (minutePart) {
      minutes.push({
        format: minutePart.value,
        value: date
      });
    }
  }
  return minutes;
};

export const getLocaleSecondValues = ({
  dateTimeFormat,
  timeStep,
  selectedTime
}: {
  dateTimeFormat: Intl.DateTimeFormat;
  timeStep: TimeStepManualType;
  selectedTime?: Date | null;
}): Array<TimeItemType> => {
  const seconds: Array<TimeItemType> = [];
  for (let s = 0; s < 60; s += timeStep.second) {
    let date = new Date(2025, 0, 1, 1, 1, s);
    if (selectedTime) {
      date = new Date(selectedTime);
      date.setSeconds(s);
    }
    const parts = dateTimeFormat.formatToParts(date);
    const secondPart = parts.find((p) => p.type === 'second');
    if (secondPart) {
      seconds.push({
        format: secondPart.value,
        value: date
      });
    }
  }
  return seconds;
};

export const getLocaleDayPeriodValues = ({
  dateTimeFormat,
  selectedTime
}: {
  dateTimeFormat: Intl.DateTimeFormat;
  selectedTime?: Date | null;
}): Array<TimeItemType> => {
  const dayPeriods: Array<TimeItemType> = [];
  for (let hour = 0; hour < 24; hour += 12) {
    let date = new Date(2025, 0, 1, hour);
    if (selectedTime) {
      date = new Date(selectedTime);
      const baseHour = date.getHours();
      date.setHours(baseHour < 12 ? baseHour + hour : baseHour - 12 + hour);
    }
    const parts = dateTimeFormat.formatToParts(date);
    const dayPeriod = parts.find((part) => part.type === 'dayPeriod');
    if (dayPeriod) {
      dayPeriods.push({
        format: dayPeriod.value,
        value: date
      });
    }
  }
  return dayPeriods;
};
