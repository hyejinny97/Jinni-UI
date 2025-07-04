import cn from 'classnames';
import { useRef, useLayoutEffect } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';
import { Divider } from '@/components/layout/Divider';
import { MenuList } from '@/components/navigation/MenuList';
import { MenuItem } from '@/components/navigation/MenuItem';
import { useDigitalClock } from './DigitalClock.hooks';
import {
  getLocaleHourValues,
  getLocaleMinuteValues,
  getLocaleSecondValues,
  getLocaleDayPeriodValues
} from './DigitalClock.utils';
import { isSameTimeByUnits } from './DigitalClock.utils';
import { TimeItemType } from './DigitalClock.types';
import {
  KEY_TIME_PARTS,
  KeyTimePartType,
  dateToSeconds
} from '@/components/data-entry/TimeField';

type ManualDigitalClockProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {};

const MenuListByUnit = ({
  unit
}: {
  unit: 'hour' | 'minute' | 'second' | 'dayPeriod';
}) => {
  const boxElRef = useRef<HTMLElement>(null);
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
  } = useDigitalClock('manual');
  let values: Array<TimeItemType>;
  switch (unit) {
    case 'hour':
      values = getLocaleHourValues({ dateTimeFormat, selectedTime, timeStep });
      break;
    case 'minute':
      values = getLocaleMinuteValues({
        dateTimeFormat,
        selectedTime,
        timeStep
      });
      break;
    case 'second':
      values = getLocaleSecondValues({
        dateTimeFormat,
        selectedTime,
        timeStep
      });
      break;
    case 'dayPeriod':
      values = getLocaleDayPeriodValues({ dateTimeFormat, selectedTime });
      break;
    default:
      values = [];
  }

  const scrollToSelected = ({ behavior }: { behavior: ScrollBehavior }) => {
    const boxEl = boxElRef.current;
    const menuItemsEl = menuItemsElRef.current;
    const selectedMenuItemEl = menuItemsEl.find((element) =>
      element.classList.contains('selected')
    );
    if (boxEl && selectedMenuItemEl) {
      const menuListPaddingTop = 4;
      boxEl.scrollTo({
        top: selectedMenuItemEl.offsetTop - menuListPaddingTop,
        behavior
      });
    }
  };

  const isDisabledTime = (time: Date, unit: KeyTimePartType): boolean => {
    if (unit === 'dayPeriod') return false;
    const timeInSeconds = dateToSeconds(time);
    if (minTime) {
      if (unit === 'hour') {
        const timeHour = time.getHours();
        const minTimeHour = minTime.getHours();
        if (timeHour < minTimeHour) return true;
      } else {
        const minTimeInSeconds = dateToSeconds(minTime);
        if (timeInSeconds < minTimeInSeconds) return true;
      }
    }
    if (maxTime) {
      if (unit === 'hour') {
        const timeHour = time.getHours();
        const maxTimeHour = maxTime.getHours();
        if (timeHour > maxTimeHour) return true;
      } else {
        const maxTimeInSeconds = dateToSeconds(maxTime);
        if (timeInSeconds > maxTimeInSeconds) return true;
      }
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
    <Box ref={boxElRef} className={cn(`JinniManualDigitalClockUnit ${unit}`)}>
      <MenuList elevation={0}>
        {values.map(({ format, value }) => {
          const selected =
            !!selectedTime &&
            isSameTimeByUnits({
              baseTime: selectedTime,
              targetTime: value,
              units: [unit]
            });
          const disabledTime = isDisabledTime(value, unit);
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

const ManualDigitalClock = <T extends AsType = 'div'>(
  props: ManualDigitalClockProps<T>
) => {
  const { className, ...rest } = props;
  const { dateTimeFormat } = useDigitalClock('manual');
  const unitsOrder = dateTimeFormat
    .formatToParts()
    .filter(({ type }) => KEY_TIME_PARTS.some((keyPart) => keyPart === type))
    .map(({ type }) => type) as Array<KeyTimePartType>;

  return (
    <Stack
      className={cn('JinniManualDigitalClock', className)}
      direction="row"
      divider={<Divider orientation="vertical" />}
      {...rest}
    >
      {unitsOrder.map((unit) => (
        <MenuListByUnit key={unit} unit={unit} />
      ))}
    </Stack>
  );
};

export default ManualDigitalClock;
