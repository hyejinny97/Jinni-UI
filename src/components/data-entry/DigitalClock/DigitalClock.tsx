import './DigitalClock.scss';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import DigitalClockContext from './DigitalClock.contexts';
import { useSelectedTime } from './DigitalClock.hooks';
import {
  TimeOptions,
  TimeStepManualType,
  TimeMode,
  DEFAULT_TIME_OPTIONS
} from '@/components/data-entry/TimeField';
import PresetDigitalClock from './PresetDigitalClock';
import ManualDigitalClock from './ManualDigitalClock';

export type DigitalClockProps<
  T extends AsType = 'div',
  Mode extends TimeMode = 'preset'
> = Omit<DefaultComponentProps<T>, 'defaultValue' | 'onChange'> & {
  mode?: Mode;
  locale?: string;
  options?: TimeOptions;
  timeStep?: Mode extends 'preset' ? number : TimeStepManualType;
  defaultValue?: Date;
  value?: Date;
  onChange?: (value: Date) => void;
  readOnly?: boolean;
  disabled?: boolean;
  minTime?: Date;
  maxTime?: Date;
  disabledTimes?: Array<Date>;
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
    locale,
    options = DEFAULT_TIME_OPTIONS,
    timeStep = mode === 'preset'
      ? TIME_STEP_PRESET_DEFAULT
      : TIME_STEP_MANUAL_DEFAULT,
    defaultValue,
    value,
    onChange,
    readOnly = false,
    disabled = false,
    minTime,
    maxTime,
    disabledTimes,
    skipDisabledTime = false,
    className,
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
