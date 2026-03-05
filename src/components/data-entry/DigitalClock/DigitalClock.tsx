import './DigitalClock.scss';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import DigitalClockContext from './DigitalClock.contexts';
import { useSelectedTime } from './DigitalClock.hooks';
import PresetDigitalClock from './PresetDigitalClock';
import ManualDigitalClock from './ManualDigitalClock';
import {
  TimeMode,
  TimeComponentProps,
  TimeStepManualType
} from '@/types/time-component';
import { DEFAULT_TIME_OPTIONS } from '@/constants/time-component';

export type DigitalClockProps<
  T extends AsType = 'div',
  Mode extends TimeMode = 'preset'
> = Omit<DefaultComponentProps<T>, 'defaultValue' | 'onChange'> &
  TimeComponentProps<Mode> & {
    mode?: Mode;
    skipDisabledTime?: boolean;
  };

const TIME_STEP_PRESET_DEFAULT: number = 30 * 60;
const TIME_STEP_MANUAL_DEFAULT: TimeStepManualType = {
  hour: 1,
  minute: 1,
  second: 1
};

const DigitalClock = <
  T extends AsType = 'div',
  Mode extends TimeMode = 'preset'
>(
  props: DigitalClockProps<T, Mode>
) => {
  const {
    mode = 'preset' as Mode,
    defaultValue,
    value,
    onChange,
    locale,
    options = DEFAULT_TIME_OPTIONS,
    minTime,
    maxTime,
    disabledTimes,
    timeStep = mode === 'preset'
      ? TIME_STEP_PRESET_DEFAULT
      : TIME_STEP_MANUAL_DEFAULT,
    readOnly,
    disabled,
    skipDisabledTime,
    ...rest
  } = props;
  const dateTimeFormat = new Intl.DateTimeFormat(locale, options);
  const { selectedTime, handleChange } = useSelectedTime({
    defaultValue,
    value,
    onChange,
    readOnly,
    disabled
  });

  return (
    <DigitalClockContext.Provider
      value={{
        dateTimeFormat,
        timeStep,
        selectedTime,
        handleChange,
        disabled,
        minTime,
        maxTime,
        disabledTimes,
        skipDisabledTime
      }}
    >
      {mode === 'preset' && <PresetDigitalClock {...rest} />}
      {mode === 'manual' && <ManualDigitalClock {...rest} />}
    </DigitalClockContext.Provider>
  );
};

export default DigitalClock;
