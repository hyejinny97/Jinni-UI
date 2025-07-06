import cn from 'classnames';
import { useRef, useLayoutEffect } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { useDigitalClock } from './DigitalClock.hooks';
import { generateTimePreset, isSameTimeByUnits } from './DigitalClock.utils';
import { Box } from '@/components/layout/Box';
import { MenuList } from '@/components/navigation/MenuList';
import { MenuItem } from '@/components/navigation/MenuItem';
import {
  KEY_TIME_PARTS,
  KeyTimePartType,
  dateToSeconds
} from '@/components/data-entry/TimeField';

type PresetDigitalClockProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {};

const PresetDigitalClock = <T extends AsType = 'div'>(
  props: PresetDigitalClockProps<T>
) => {
  const { className, ...rest } = props;
  const menuListElRef = useRef<HTMLElement>(null);
  const menuItemsElRef = useRef<HTMLElement[]>([]);
  const {
    dateTimeFormat,
    timeStep,
    selectedTime,
    handleChange,
    disabled,
    minTime,
    maxTime,
    disabledTimes,
    skipDisabledTime
  } = useDigitalClock('preset');
  const timePreset = generateTimePreset({ dateTimeFormat, timeStep });
  const keyTimeParts = dateTimeFormat
    .formatToParts()
    .filter((part) => KEY_TIME_PARTS.some((keyPart) => keyPart === part.type))
    .map(({ type }) => type) as Array<KeyTimePartType>;

  const scrollToSelected = ({ behavior }: { behavior: ScrollBehavior }) => {
    const menuListEl = menuListElRef.current;
    const menuItemsEl = menuItemsElRef.current;
    const selectedMenuItemEl = menuItemsEl.find((element) =>
      element.classList.contains('selected')
    );
    if (menuListEl && selectedMenuItemEl)
      menuListEl.scrollTo({ top: selectedMenuItemEl.offsetTop, behavior });
  };

  const isDisabledTime = (time: Date): boolean => {
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
  };

  const handleClick = (value: Date) => {
    handleChange(value);
  };

  useLayoutEffect(() => {
    scrollToSelected({ behavior: 'instant' });
  }, []);

  useLayoutEffect(() => {
    scrollToSelected({ behavior: 'smooth' });
  }, [selectedTime]);

  return (
    <Box className={cn('JinniPresetDigitalClock', className)} {...rest}>
      <MenuList ref={menuListElRef} elevation={0}>
        {timePreset.map(({ format, value }) => {
          const selected =
            !!selectedTime &&
            isSameTimeByUnits({
              baseTime: selectedTime,
              targetTime: value,
              units: keyTimeParts
            });
          const disabledTime = isDisabledTime(value);
          const hide = disabledTime && skipDisabledTime;
          if (hide) return;
          return (
            <MenuItem
              key={format}
              ref={(element) => {
                if (element) {
                  menuItemsElRef.current.push(element);
                }
              }}
              className={cn({ selected })}
              onClick={() => handleClick(value)}
              disabled={disabled || disabledTime}
            >
              {format}
            </MenuItem>
          );
        })}
      </MenuList>
    </Box>
  );
};

export default PresetDigitalClock;
