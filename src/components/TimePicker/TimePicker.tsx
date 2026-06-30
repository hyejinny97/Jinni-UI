'use client';

import './TimePicker.scss';
import { useRef, useState, useId } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import TimeField, { TimeFieldProps } from '@/components/TimeField';
import ManualDigitalClock from '@/components/ManualDigitalClock';
import PresetDigitalClock from '@/components/PresetDigitalClock';
import Popover, { PopoverProps } from '@/components/Popover';
import { useTime } from './TimePicker.hooks';
import Button from '@/components/Button';
import ButtonBase from '@/components/ButtonBase';
import { AccessTimeIcon } from '@/components/icons/AccessTimeIcon';
import {
  TimeMode,
  TimeComponentProps,
  DigitalClockProps,
  TimeStepManualType,
  DisabledTimesFnType,
  DisabledTimesWithUnitFnType
} from '@/types/time-component';
import { DEFAULT_TIME_OPTIONS } from '@/constants/time-component';
import {
  TIME_STEP_PRESET_DEFAULT,
  TIME_STEP_MANUAL_DEFAULT
} from './TimePicker.constants';
import { fixDigitalClockPropsByMode } from '@/utils/time-component';
import { disabledTimesInTimeField } from './TimePicker.utils';

export type TimePickerProps<
  T extends AsType = 'div',
  Mode extends TimeMode = 'preset'
> = Omit<DefaultComponentProps<T>, 'defaultValue' | 'onChange'> &
  TimeComponentProps<Mode> & {
    name?: string;
    mode?: Mode;
    disabledTimes?: Mode extends 'preset'
      ? Array<Date> | DisabledTimesFnType
      : Array<Date> | DisabledTimesWithUnitFnType;
    PopoverProps?: Omit<
      PopoverProps,
      'open' | 'anchorReference' | 'anchorElRef' | 'anchorPosition'
    >;
    TimeFieldProps?: TimeFieldProps;
    renderDigitalClock?: (
      digitalClockProps: DigitalClockProps
    ) => React.ReactNode;
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
    disabledTimes,
    timeStep = (mode === 'preset'
      ? TIME_STEP_PRESET_DEFAULT
      : TIME_STEP_MANUAL_DEFAULT) as Mode extends 'preset'
      ? number
      : TimeStepManualType,
    readOnly,
    disabled,
    name,
    PopoverProps,
    TimeFieldProps,
    renderDigitalClock = (digitalClockProps: DigitalClockProps) =>
      digitalClockProps.mode === 'preset' ? (
        <PresetDigitalClock {...digitalClockProps} />
      ) : (
        <ManualDigitalClock {...digitalClockProps} />
      ),
    className,
    style,
    as,
    ...rest
  } = props;
  const Component = (as ?? 'div') as React.ElementType;
  const popoverId = useId();
  const anchorElRef = useRef<HTMLDivElement>(null);
  const prevTimeRef = useRef<Date | null>(null);
  const [open, setOpen] = useState(false);
  const { time, handleChange } = useTime({ defaultValue, value, onChange });
  const newStyle = useStyle(style);
  const { className: popoverClassName, ...restPopoverProps } =
    PopoverProps || {};

  const openPopover = () => {
    prevTimeRef.current = time;
    if (readOnly || disabled) return;
    setOpen(true);
  };
  const closePopover = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    handleChange(prevTimeRef.current);
    closePopover();
  };

  const commonProps = {
    value: time,
    onChange: handleChange,
    locale,
    options,
    readOnly,
    disabled
  };
  const timeFieldProps = {
    ...commonProps,
    mode,
    timeStep,
    disabledTimes: disabledTimes && disabledTimesInTimeField(disabledTimes),
    focused: open,
    endAdornment: (
      <ButtonBase
        type="button"
        className={cn('JinniTimePickerOpenButton', { readOnly, disabled })}
        onClick={openPopover}
        disableOverlay={readOnly || disabled}
        disableRipple={readOnly || disabled}
        aria-label="Choose Time"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={popoverId}
      >
        <AccessTimeIcon size={20} color="on-surface-variant" />
      </ButtonBase>
    ),
    ...TimeFieldProps
  };
  const digitalClockProps = {
    ...commonProps,
    ...fixDigitalClockPropsByMode({ mode, timeStep, disabledTimes })
  };

  return (
    <Component
      role="group"
      className={cn(
        'JinniTimePicker',
        { fullWidth: !!TimeFieldProps?.fullWidth },
        className
      )}
      style={newStyle}
      aria-label="Time Picker"
      {...rest}
    >
      <input name={name} value={time?.toTimeString() || ''} hidden readOnly />
      <TimeField ref={anchorElRef} {...timeFieldProps} />
      <Popover
        id={popoverId}
        anchorReference="anchorEl"
        anchorElRef={anchorElRef}
        className={cn('JinniTimePickerPopover', popoverClassName)}
        open={open}
        onClose={closePopover}
        {...restPopoverProps}
      >
        {renderDigitalClock(digitalClockProps)}
        <div className="JinniTimePickerButtons">
          <Button variant="text" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={closePopover}>OK</Button>
        </div>
      </Popover>
    </Component>
  );
};

export default TimePicker;
