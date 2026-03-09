import {
  useState,
  useMemo,
  useCallback,
  useRef,
  useLayoutEffect,
  useEffect
} from 'react';
import { PresetDigitalClockProps } from './PresetDigitalClock';
import { isAvailableLocale, dateToSeconds } from '@/utils/time-component';
import { TimeItemType } from './PresetDigitalClock.types';

type UseSelectedTimeProps = Pick<
  PresetDigitalClockProps,
  'defaultValue' | 'value' | 'onChange' | 'readOnly' | 'disabled'
>;

type UseTimeItemsProps = Pick<
  PresetDigitalClockProps,
  | 'locale'
  | 'options'
  | 'timeStep'
  | 'minTime'
  | 'maxTime'
  | 'disabledTimes'
  | 'disabled'
  | 'skipDisabledTime'
> &
  Required<Pick<PresetDigitalClockProps, 'timeStep'>> & {
    selectedTime: Date | null | undefined;
  };

type UseScrollProps = {
  timeItems: TimeItemType[];
};

export const useSelectedTime = ({
  defaultValue,
  value,
  onChange,
  readOnly,
  disabled
}: UseSelectedTimeProps) => {
  const isControlled = value !== undefined;
  const [uncontrolledTime, setUncontrolledTime] = useState<Date | undefined>(
    defaultValue
  );
  const selectedTime: Date | null | undefined = isControlled
    ? value
    : uncontrolledTime;

  const handleChange = (newValue: Date) => {
    if (readOnly || disabled) return;
    if (!isControlled) setUncontrolledTime(newValue);
    if (onChange) onChange(newValue);
  };

  return {
    selectedTime,
    handleChange
  };
};

export const useTimeItems = ({
  locale,
  options,
  timeStep,
  minTime,
  maxTime,
  disabledTimes,
  disabled,
  skipDisabledTime,
  selectedTime
}: UseTimeItemsProps) => {
  const isSelected = useCallback(
    (time: Date): boolean => {
      if (selectedTime === null || selectedTime === undefined) return false;
      return dateToSeconds(time) === dateToSeconds(selectedTime);
    },
    [selectedTime]
  );

  const isDisabled = useCallback(
    (time: Date): boolean => {
      if (disabled) return true;
      const timeInSeconds = dateToSeconds(time);
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
    [minTime, maxTime, disabledTimes, disabled]
  );

  const timeItems = useMemo<TimeItemType[]>(() => {
    const dateTimeLocale = isAvailableLocale(locale) ? locale : 'en-US';
    const dateTimeFormat = new Intl.DateTimeFormat(dateTimeLocale, options);

    const ONE_DAY = 24 * 60 * 60;
    const items: TimeItemType[] = [];
    const offsetInSecond = new Date().getTimezoneOffset() * 60;
    for (let t = 0; t < ONE_DAY; t += timeStep) {
      const time = new Date((offsetInSecond + t) * 1000);
      const disabled = isDisabled(time);
      items.push({
        label: dateTimeFormat.format(time),
        value: time,
        selected: isSelected(time),
        disabled,
        hide: disabled && !!skipDisabledTime
      });
    }
    return items;
  }, [locale, options, timeStep, isSelected, isDisabled, skipDisabledTime]);

  return { timeItems };
};

export const useScroll = ({ timeItems }: UseScrollProps) => {
  const menuListElRef = useRef<HTMLElement>(null);
  const menuItemsElRef = useRef<Map<string, HTMLElement>>(new Map());

  const scrollToSelected = useCallback(
    ({ behavior }: { behavior: ScrollBehavior }) => {
      const menuListEl = menuListElRef.current;
      const menuItemsEl = menuItemsElRef.current;
      if (!menuListEl || !menuItemsEl) return;

      const selectedItem = timeItems.find((item) => item.selected);
      if (selectedItem === undefined) return;

      const selectedItemEl = menuItemsEl.get(selectedItem.label);
      menuListEl.scrollTo({
        top: selectedItemEl?.offsetTop,
        behavior
      });
    },
    [timeItems]
  );

  useLayoutEffect(() => {
    scrollToSelected({ behavior: 'instant' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollToSelected({ behavior: 'smooth' });
  }, [scrollToSelected]);

  return { menuListElRef, menuItemsElRef };
};
