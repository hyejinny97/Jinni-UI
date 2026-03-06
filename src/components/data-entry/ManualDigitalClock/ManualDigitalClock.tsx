import './ManualDigitalClock.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { Stack } from '@/components/layout/Stack';
import { Divider } from '@/components/layout/Divider';
import { DEFAULT_TIME_OPTIONS } from '@/constants/time-component';
import { TimeComponentProps } from '@/types/time-component';
import { UnitList } from './UnitList';
import { TIME_STEP_MANUAL_DEFAULT } from './ManualDigitalClock.constants';
import {
  useSelectedTime,
  useTimeFormat,
  useUnitItems
} from './ManualDigitalClock.hooks';

export type ManualDigitalClockProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'defaultValue' | 'onChange'
> &
  TimeComponentProps<'manual'> & {
    skipDisabledTime?: boolean;
  };

const ManualDigitalClock = <T extends AsType = 'div'>(
  props: ManualDigitalClockProps<T>
) => {
  const {
    defaultValue,
    value,
    onChange,
    locale,
    options = DEFAULT_TIME_OPTIONS,
    minTime,
    maxTime,
    disabledTimes,
    timeStep = TIME_STEP_MANUAL_DEFAULT,
    readOnly,
    disabled,
    skipDisabledTime,
    className,
    ...rest
  } = props;
  const {
    dateTimeFormat,
    localeHourValues,
    localeMinuteValues,
    localeSecondValues,
    localeDayPeriodValues,
    unitsOrder,
    dateToTimeObject,
    timeObjectToDate
  } = useTimeFormat({ locale, options });
  const { selectedTime, handleChange } = useSelectedTime({
    defaultValue,
    value,
    onChange,
    readOnly,
    disabled,
    dateToTimeObject,
    timeObjectToDate
  });
  const {
    hourItems,
    minuteItems,
    secondItems,
    dayPeriodItems,
    onHourClick,
    onMinuteClick,
    onSecondClick,
    onDayPeriodClick
  } = useUnitItems({
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
  });

  return (
    <Stack
      className={cn('JinniManualDigitalClock', className)}
      direction="row"
      divider={<Divider orientation="vertical" />}
      {...rest}
    >
      {unitsOrder.map((unit) => {
        switch (unit) {
          case 'hour':
            return (
              <UnitList
                key={
                  unitsOrder.includes('dayPeriod')
                    ? `hour/${Number(!!selectedTime.dayPeriod)}`
                    : 'hour'
                }
                items={hourItems}
                onClick={onHourClick}
              />
            );
          case 'minute':
            return (
              <UnitList
                key="minute"
                items={minuteItems}
                onClick={onMinuteClick}
              />
            );
          case 'second':
            return (
              <UnitList
                key="second"
                items={secondItems}
                onClick={onSecondClick}
              />
            );
          case 'dayPeriod':
            return (
              <UnitList
                key="dayPeriod"
                items={dayPeriodItems}
                onClick={onDayPeriodClick}
              />
            );
        }
      })}
    </Stack>
  );
};

export default ManualDigitalClock;
