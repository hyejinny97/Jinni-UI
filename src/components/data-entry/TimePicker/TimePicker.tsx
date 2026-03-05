import './TimePicker.scss';
import { useRef, useState } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { TimeField, TimeFieldProps } from '@/components/data-entry/TimeField';
import {
  DigitalClock,
  DigitalClockProps
} from '@/components/data-entry/DigitalClock';
import { Popover, PopoverProps } from '@/components/data-display/Popover';
import { useTime } from './TimePicker.hooks';
import { Button } from '@/components/general/Button';
import { ButtonBase } from '@/components/general/ButtonBase';
import { AccessTimeIcon } from '@/components/icons/AccessTimeIcon';
import {
  TimeMode,
  TimeComponentProps,
  TimeStepManualType
} from '@/types/time-component';
import { DEFAULT_TIME_OPTIONS } from '@/constants/time-component';

export type TimePickerProps<
  T extends AsType = 'div',
  Mode extends TimeMode = 'preset'
> = Omit<DefaultComponentProps<T>, 'defaultValue' | 'onChange'> &
  TimeComponentProps<Mode> & {
    name?: string;
    mode?: Mode;
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
    name,
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
      className={cn(
        'JinniTimePicker',
        { fullWidth: !!TimeFieldProps?.fullWidth },
        className
      )}
      style={newStyle}
      {...rest}
    >
      <input name={name} value={time?.toTimeString() || ''} hidden readOnly />
      <TimeField
        ref={anchorElRef}
        endAdornment={
          <ButtonBase
            type="button"
            className={cn('JinniTimePickerOpenButton', { readOnly, disabled })}
            onClick={handleOpen}
            disableOverlay={readOnly || disabled}
            disableRipple={readOnly || disabled}
          >
            <AccessTimeIcon size={20} color="gray-500" />
          </ButtonBase>
        }
        focused={open}
        {...commonProps}
        {...TimeFieldProps}
      />
      <Popover
        anchorElRef={anchorElRef}
        className="JinniTimePickerPopover"
        open={open}
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
