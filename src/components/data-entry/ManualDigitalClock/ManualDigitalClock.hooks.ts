import { useState, useMemo, useCallback } from 'react';
import { ManualDigitalClockProps } from './ManualDigitalClock';
import { TimeObjectType, UnitItemType } from './ManualDigitalClock.types';
import { KEY_TIME_PARTS } from '@/constants/time-component';
import { KeyTimePartType } from '@/types/time-component';
import {
  isAvailableLocale,
  getLocaleHourValues,
  getLocaleMinuteValues,
  getLocaleSecondValues,
  getLocaleDayPeriodValues
} from '@/utils/time-component';
import { dateToSeconds } from '@/utils/time-component';

type UseSelectedTimeProps = Pick<
  ManualDigitalClockProps,
  'defaultValue' | 'value' | 'onChange' | 'readOnly' | 'disabled'
> & {
  dateToTimeObject: (date: Date | undefined | null) => TimeObjectType;
  timeObjectToDate: (timeObject: TimeObjectType) => Date;
};

type UseUnitItemsProps = Pick<
  ManualDigitalClockProps,
  'minTime' | 'maxTime' | 'disabledTimes' | 'skipDisabledTime' | 'disabled'
> &
  Required<Pick<ManualDigitalClockProps, 'timeStep'>> & {
    dateTimeFormat: Intl.DateTimeFormat;
    localeHourValues: Array<string>;
    localeMinuteValues: Array<string>;
    localeSecondValues: Array<string>;
    localeDayPeriodValues: Array<string>;
    selectedTime: TimeObjectType;
    handleChange: (newValue: TimeObjectType) => void;
  };

const INIT_TIME = { hour: 0, minute: 0, second: 0, dayPeriod: 0 };

export const useSelectedTime = ({
  defaultValue,
  value,
  onChange,
  readOnly,
  disabled,
  dateToTimeObject,
  timeObjectToDate
}: UseSelectedTimeProps) => {
  const isControlled = value !== undefined;
  const [uncontrolledTime, setUncontrolledTime] = useState<TimeObjectType>(
    dateToTimeObject(defaultValue)
  );
  const selectedTime: TimeObjectType = isControlled
    ? dateToTimeObject(value)
    : uncontrolledTime;

  const handleChange = (newValue: TimeObjectType) => {
    if (readOnly || disabled) return;

    const isFirstChange = Object.keys(selectedTime).length === 0;
    const newTimeObj = {
      ...(isFirstChange ? INIT_TIME : selectedTime),
      ...newValue
    };
    if (!isControlled) setUncontrolledTime(newTimeObj);
    if (onChange) onChange(timeObjectToDate(newTimeObj));
  };

  return {
    selectedTime,
    handleChange
  };
};

export const useTimeFormat = ({
  locale,
  options
}: Pick<ManualDigitalClockProps, 'locale' | 'options'>) => {
  const {
    dateTimeFormat,
    localeHourValues,
    localeMinuteValues,
    localeSecondValues,
    localeDayPeriodValues,
    unitsOrder
  } = useMemo(() => {
    const dateTimeLocale = isAvailableLocale(locale) ? locale : 'en-US';
    const dateTimeFormat = new Intl.DateTimeFormat(dateTimeLocale, options);
    return {
      dateTimeFormat,
      localeHourValues: getLocaleHourValues(dateTimeFormat),
      localeMinuteValues: getLocaleMinuteValues(dateTimeFormat),
      localeSecondValues: getLocaleSecondValues(dateTimeFormat),
      localeDayPeriodValues: getLocaleDayPeriodValues({
        locale: dateTimeLocale,
        options
      }),
      unitsOrder: dateTimeFormat
        .formatToParts()
        .filter(({ type }) =>
          KEY_TIME_PARTS.some((keyPart) => keyPart === type)
        )
        .map(({ type }) => type) as Array<KeyTimePartType>
    };
  }, [locale, options]);

  const dateToTimeObject = (date: Date | undefined | null): TimeObjectType => {
    if (date === undefined || date === null) return {};

    const isHour12 = dateTimeFormat.resolvedOptions().hour12;
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return {
      hour: isHour12 ? hour % 12 : hour,
      minute,
      second,
      dayPeriod: isHour12 ? Number(hour >= 12) : undefined
    };
  };

  const timeObjectToDate = ({ hour, minute, second }: TimeObjectType): Date => {
    const date = new Date(1970, 0, 1);
    if (hour !== undefined) date.setHours(hour);
    if (minute !== undefined) date.setMinutes(minute);
    if (second !== undefined) date.setSeconds(second);
    return date;
  };

  return {
    dateTimeFormat,
    localeHourValues,
    localeMinuteValues,
    localeSecondValues,
    localeDayPeriodValues,
    unitsOrder,
    dateToTimeObject,
    timeObjectToDate
  };
};

export const useUnitItems = ({
  minTime,
  maxTime,
  timeStep,
  disabledTimes,
  skipDisabledTime,
  disabled,
  dateTimeFormat,
  localeHourValues,
  localeMinuteValues,
  localeSecondValues,
  localeDayPeriodValues,
  selectedTime,
  handleChange
}: UseUnitItemsProps) => {
  const { dayPeriod, hour, minute, second } = selectedTime;

  const isDisabledHour = useCallback(
    (hourValue: number): boolean => {
      if (disabled) return true;
      if (minTime) {
        const minTimeHour = minTime.getHours();
        if (hourValue < minTimeHour) return true;
      }
      if (maxTime) {
        const maxTimeHour = maxTime.getHours();
        if (maxTimeHour < hourValue) return true;
      }
      return false;
    },
    [disabled, minTime, maxTime]
  );

  const isDisabledMinute = useCallback(
    (minuteValue: number): boolean => {
      if (disabled) return true;
      if (hour === undefined) return false;
      const timeInSeconds = dateToSeconds(
        new Date(1970, 0, 1, hour, minuteValue, second)
      );
      if (minTime) {
        const minTimeInSeconds = dateToSeconds(minTime);
        if (timeInSeconds < minTimeInSeconds) return true;
      }
      if (maxTime) {
        const maxTimeInSeconds = dateToSeconds(maxTime);
        if (timeInSeconds > maxTimeInSeconds) return true;
      }
      if (disabledTimes) {
        const disabledTimeInSeconds = disabledTimes.map(dateToSeconds);
        if (disabledTimeInSeconds.includes(timeInSeconds)) return true;
      }
      return false;
    },
    [disabled, minTime, maxTime, disabledTimes, hour, second]
  );

  const isDisabledSecond = useCallback(
    (secondValue: number): boolean => {
      if (disabled) return true;
      if (hour === undefined || minute === undefined) return false;
      const timeInSeconds = dateToSeconds(
        new Date(1970, 0, 1, hour, minute, secondValue)
      );
      if (minTime) {
        const minTimeInSeconds = dateToSeconds(minTime);
        if (timeInSeconds < minTimeInSeconds) return true;
      }
      if (maxTime) {
        const maxTimeInSeconds = dateToSeconds(maxTime);
        if (timeInSeconds > maxTimeInSeconds) return true;
      }
      if (disabledTimes) {
        const disabledTimeInSeconds = disabledTimes.map(dateToSeconds);
        if (disabledTimeInSeconds.includes(timeInSeconds)) return true;
      }
      return false;
    },
    [disabled, minTime, maxTime, disabledTimes, hour, minute]
  );

  const hourItems = useMemo<UnitItemType[]>(() => {
    const isHour12 = dateTimeFormat.resolvedOptions().hour12;
    let startHour = 0;
    let endHour = 23;
    if (isHour12) {
      if (dayPeriod === undefined || dayPeriod === 0) {
        startHour = 0;
        endHour = 11;
      } else {
        startHour = 12;
        endHour = 23;
      }
    }
    const items: UnitItemType[] = [];
    for (let h = startHour; h <= endHour; h += timeStep.hour) {
      const disabled = isDisabledHour(h);
      items.push({
        id: h,
        label: localeHourValues[isHour12 ? h % 12 : h],
        selected: hour === h,
        disabled,
        hide: disabled && !!skipDisabledTime
      });
    }
    return items;
  }, [
    dateTimeFormat,
    localeHourValues,
    dayPeriod,
    hour,
    timeStep,
    skipDisabledTime,
    isDisabledHour
  ]);

  const minuteItems = useMemo<UnitItemType[]>(() => {
    const items: UnitItemType[] = [];
    for (let m = 0; m < 60; m += timeStep.minute) {
      const disabled = isDisabledMinute(m);
      items.push({
        id: m,
        label: localeMinuteValues[m],
        selected: minute === m,
        disabled,
        hide: disabled && !!skipDisabledTime
      });
    }
    return items;
  }, [
    localeMinuteValues,
    minute,
    timeStep,
    skipDisabledTime,
    isDisabledMinute
  ]);

  const secondItems = useMemo<UnitItemType[]>(() => {
    const items: UnitItemType[] = [];
    for (let s = 0; s < 60; s += timeStep.second) {
      const disabled = isDisabledSecond(s);
      items.push({
        id: s,
        label: localeSecondValues[s],
        selected: second === s,
        disabled,
        hide: disabled && !!skipDisabledTime
      });
    }
    return items;
  }, [
    localeSecondValues,
    second,
    timeStep,
    skipDisabledTime,
    isDisabledSecond
  ]);

  const dayPeriodItems = useMemo<UnitItemType[]>(() => {
    return [0, 1].map((dayP) => ({
      id: dayP,
      label: localeDayPeriodValues[dayP],
      selected: dayPeriod === dayP,
      disabled: false,
      hide: false
    }));
  }, [localeDayPeriodValues, dayPeriod]);

  const onHourClick = useCallback(
    (itemId: number) => handleChange({ hour: itemId }),
    [handleChange]
  );

  const onMinuteClick = useCallback(
    (itemId: number) => handleChange({ minute: itemId }),
    [handleChange]
  );

  const onSecondClick = useCallback(
    (itemId: number) => handleChange({ second: itemId }),
    [handleChange]
  );

  const onDayPeriodClick = useCallback(
    (itemId: number) => {
      let newHour = hour;
      if (hour && hour >= 12 && itemId === 0) {
        newHour = hour - 12;
      }
      if (hour && hour < 12 && itemId === 1) {
        newHour = hour + 12;
      }
      return handleChange({ dayPeriod: itemId, hour: newHour });
    },
    [handleChange, hour]
  );

  return {
    hourItems,
    minuteItems,
    secondItems,
    dayPeriodItems,
    onHourClick,
    onMinuteClick,
    onSecondClick,
    onDayPeriodClick
  };
};
