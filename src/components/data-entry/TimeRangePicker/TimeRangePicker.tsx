import './TimeRangePicker.scss';
import { useRef, useState } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import {
  TimeMode,
  TimeOptions,
  TimeStepManualType,
  DEFAULT_TIME_OPTIONS
} from '@/components/data-entry/TimeField';
import {
  TimeRangeField,
  TimeRangeFieldProps,
  RangeType,
  TimeRangeValidationError
} from '@/components/data-entry/TimeRangeField';
import { Popover, PopoverProps } from '@/components/data-display/Popover';
import {
  DigitalClock,
  DigitalClockProps
} from '@/components/data-entry/DigitalClock';
import { useTimeRange } from './TimeRangePicker.hooks';
import { Button } from '@/components/general/Button';
import { ButtonBase } from '@/components/general/ButtonBase';
import { AccessTimeIcon } from '@/components/icons/AccessTimeIcon';

export type TimeRangePickerProps<
  T extends AsType = 'div',
  Mode extends TimeMode = 'preset'
> = Omit<DefaultComponentProps<T>, 'defaultValue' | 'onChange'> & {
  name?: RangeType<string>;
  mode?: Mode;
  locale?: string;
  options?: TimeOptions;
  timeStep?: Mode extends 'preset' ? number : TimeStepManualType;
  defaultValue?: RangeType<Date>;
  value?: RangeType<Date | null>;
  onChange?: (
    value: RangeType<Date | null>,
    validationError?: TimeRangeValidationError
  ) => void;
  readOnly?: RangeType<boolean>;
  disabled?: RangeType<boolean>;
  minTime?: RangeType<Date>;
  maxTime?: RangeType<Date>;
  disabledTimes?: RangeType<Array<Date>>;
  PopoverProps?: Omit<PopoverProps, 'open' | 'children'>;
  TimeRangeFieldProps?: TimeRangeFieldProps;
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
const DEFAULT_READONLY: RangeType<boolean> = { start: false, end: false };
const DEFAULT_DISABLED: RangeType<boolean> = { start: false, end: false };

const TimeRangePicker = <
  T extends AsType = 'div',
  Mode extends TimeMode = 'preset'
>(
  props: TimeRangePickerProps<T, Mode>
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
    readOnly = DEFAULT_READONLY,
    disabled = DEFAULT_DISABLED,
    minTime,
    maxTime,
    disabledTimes,
    PopoverProps,
    TimeRangeFieldProps,
    renderDigitalClock = (
      digitalClockProps: DigitalClockProps<T, Mode>,
      key?: string
    ) => <DigitalClock key={key} {...digitalClockProps} />,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const anchorElRef = useRef<HTMLDivElement>(null);
  const prevTimeRangeRef = useRef<RangeType<Date | null>>({
    start: null,
    end: null
  });
  const [open, setOpen] = useState(false);
  const [focusedTime, setFocusedTime] = useState<'start' | 'end' | undefined>();
  const { timeRange, handleRangeChange, handleTimeChange } = useTimeRange({
    defaultValue,
    value,
    onChange,
    locale,
    options
  });
  const newStyle = useStyle(style);
  const disableOpen =
    (readOnly.start && readOnly.end) || (disabled.start && disabled.end);

  const handleOpen = () => {
    prevTimeRangeRef.current = timeRange;
    if (disableOpen) return;
    if (!(readOnly.start || disabled.start)) setFocusedTime('start');
    else if (!(readOnly.end || disabled.end)) setFocusedTime('end');
    setOpen(true);
  };
  const handleNext = () => {
    setFocusedTime('end');
  };
  const handleOk = () => {
    setFocusedTime(undefined);
    setOpen(false);
  };
  const handleCancel = () => {
    handleRangeChange(prevTimeRangeRef.current);
    setFocusedTime(undefined);
    setOpen(false);
  };

  const commonProps = {
    mode,
    locale,
    options,
    timeStep
  };

  return (
    <Component
      className={cn(
        'JinniTimeRangePicker',
        { fullWidth: !!TimeRangeFieldProps?.fullWidth },
        className
      )}
      style={newStyle}
      {...rest}
    >
      <input
        name={name?.start}
        value={timeRange.start?.toTimeString() || ''}
        hidden
        readOnly
      />
      <input
        name={name?.end}
        value={timeRange.end?.toTimeString() || ''}
        hidden
        readOnly
      />
      <TimeRangeField
        ref={anchorElRef}
        value={timeRange}
        onChange={handleRangeChange}
        endAdornment={{
          timeRangeField: (
            <ButtonBase
              type="button"
              className={cn('JinniTimeRangePickerOpenButton', {
                disableOpen
              })}
              onClick={handleOpen}
              disableOverlay={disableOpen}
              disableRipple={disableOpen}
            >
              <AccessTimeIcon size={20} color="gray-500" />
            </ButtonBase>
          )
        }}
        readOnly={readOnly}
        disabled={disabled}
        minTime={minTime}
        maxTime={maxTime}
        disabledTimes={disabledTimes}
        focusedTime={focusedTime}
        focused={open}
        {...commonProps}
        {...TimeRangeFieldProps}
      />
      <Popover
        anchorElRef={anchorElRef}
        className="JinniTimeRangePickerPopover"
        open={open}
        noBackdrop
        {...PopoverProps}
      >
        {focusedTime &&
          renderDigitalClock(
            {
              ...commonProps,
              value: timeRange[focusedTime],
              onChange: handleTimeChange(focusedTime),
              readOnly: readOnly[focusedTime],
              disabled: disabled[focusedTime],
              minTime: minTime?.[focusedTime],
              maxTime: maxTime?.[focusedTime],
              disabledTimes: disabledTimes?.[focusedTime]
            } as DigitalClockProps<T, Mode>,
            focusedTime
          )}
        <div className="JinniTimeRangePickerButtons">
          <Button variant="text" onClick={handleCancel}>
            Cancel
          </Button>
          {focusedTime === 'start' && (
            <Button onClick={handleNext}>Next</Button>
          )}
          {focusedTime === 'end' && <Button onClick={handleOk}>OK</Button>}
        </div>
      </Popover>
    </Component>
  );
};

export default TimeRangePicker;
