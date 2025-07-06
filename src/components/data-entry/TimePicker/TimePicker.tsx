import './TimePicker.scss';
import { useRef, useState } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import {
  TimeField,
  TimeMode,
  TimeOptions,
  ValidationError,
  TimeStepManualType,
  TimeFieldProps,
  DEFAULT_TIME_OPTIONS
} from '@/components/data-entry/TimeField';
import {
  DigitalClock,
  DigitalClockProps
} from '@/components/data-entry/DigitalClock';
import { Popover, PopoverProps } from '@/components/data-display/Popover';
import { useTime } from './TimePicker.hooks';
import { Button } from '@/components/general/Button';

export type TimePickerProps<
  T extends AsType = 'div',
  Mode extends TimeMode = 'preset'
> = Omit<DefaultComponentProps<T>, 'defaultValue' | 'onChange'> & {
  name?: string;
  mode?: Mode;
  locale?: string;
  options?: TimeOptions;
  timeStep?: Mode extends 'preset' ? number : TimeStepManualType;
  defaultValue?: Date;
  value?: Date | null;
  onChange?: (value: Date | null, validationError?: ValidationError) => void;
  readOnly?: boolean;
  disabled?: boolean;
  minTime?: Date;
  maxTime?: Date;
  disabledTimes?: Array<Date>;
  PopoverProps?: Omit<PopoverProps, 'open' | 'children'>;
  TimeFieldProps?: TimeFieldProps;
  renderDigitalClock?: (
    digitalClockProps: DigitalClockProps<T, Mode>
  ) => React.ReactNode;
};

const TIME_STEP_PRESET_DEFAULT: number = 30 * 60;
const TIME_STEP_MANUAL_DEFAULT: TimeStepManualType = {
  hour: 1,
  minute: 1,
  second: 1
};

const TimePicker = <T extends AsType = 'div', Mode extends TimeMode = 'preset'>(
  props: TimePickerProps<T, Mode>
) => {
  const {
    name,
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
    PopoverProps,
    TimeFieldProps,
    renderDigitalClock = (digitalClockProps: DigitalClockProps<T, Mode>) => (
      <DigitalClock {...digitalClockProps} />
    ),
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const prevTimeRef = useRef<Date | null>(null);
  const { time, handleChange } = useTime({ defaultValue, value, onChange });
  const newStyle = useStyle(style);

  const handleOpen = () => {
    prevTimeRef.current = time;
    if (readOnly || disabled) return;
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    handleChange(prevTimeRef.current);
    setOpen(false);
  };

  const commonProps = {
    value: time,
    onChange: handleChange,
    mode,
    locale,
    options,
    timeStep,
    readOnly,
    disabled,
    minTime,
    maxTime,
    disabledTimes
  };

  return (
    <Component
      className={cn('JinniTimePicker', className)}
      style={newStyle}
      {...rest}
    >
      <input name={name} value={time?.toTimeString() || ''} hidden readOnly />
      <TimeField
        ref={anchorElRef}
        onClick={handleOpen}
        {...commonProps}
        {...TimeFieldProps}
      />
      <Popover
        anchorElRef={anchorElRef}
        className="JinniTimePickerPopover"
        open={open}
        noBackdrop
        {...PopoverProps}
      >
        {renderDigitalClock(commonProps as DigitalClockProps<T, Mode>)}
        <div className="JinniTimePickerButtons">
          <Button variant="text" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleOk}>OK</Button>
        </div>
      </Popover>
    </Component>
  );
};

export default TimePicker;
