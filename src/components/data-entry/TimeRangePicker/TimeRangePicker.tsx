import './TimeRangePicker.scss';
import { useRef, useState } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import {
  TimeRangeField,
  TimeRangeFieldProps
} from '@/components/data-entry/TimeRangeField';
import { Popover, PopoverProps } from '@/components/data-display/Popover';
import {
  ManualDigitalClock,
  ManualDigitalClockProps
} from '@/components/data-entry/ManualDigitalClock';
import {
  PresetDigitalClock,
  PresetDigitalClockProps
} from '@/components/data-entry/PresetDigitalClock';
import { useTimeRange } from './TimeRangePicker.hooks';
import { Button } from '@/components/general/Button';
import { ButtonBase } from '@/components/general/ButtonBase';
import { AccessTimeIcon } from '@/components/icons/AccessTimeIcon';
import {
  TimeStepManualType,
  TimeMode,
  TimeRangeComponentProps,
  RangeType
} from '@/types/time-component';
import { DEFAULT_TIME_OPTIONS } from '@/constants/time-component';

export type TimeRangePickerProps<
  T extends AsType = 'div',
  Mode extends TimeMode = 'preset'
> = Omit<DefaultComponentProps<T>, 'defaultValue' | 'onChange'> &
  TimeRangeComponentProps<Mode> & {
    name?: RangeType<string>;
    PopoverProps?: Omit<PopoverProps, 'open' | 'children'>;
    TimeRangeFieldProps?: TimeRangeFieldProps;
    renderDigitalClock?: (
      digitalClockProps: Mode extends 'preset'
        ? PresetDigitalClockProps
        : ManualDigitalClockProps
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
    renderDigitalClock = ((digitalClockProps, key?: string) =>
      mode === 'preset' ? (
        <PresetDigitalClock
          key={key}
          {...(digitalClockProps as PresetDigitalClockProps)}
        />
      ) : (
        <ManualDigitalClock
          key={key}
          {...(digitalClockProps as ManualDigitalClockProps)}
        />
      )) as NonNullable<TimeRangePickerProps<T, Mode>['renderDigitalClock']>,
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
  const [focusedField, setFocusedField] = useState<
    'start' | 'end' | undefined
  >();
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
    if (!(readOnly.start || disabled.start)) setFocusedField('start');
    else if (!(readOnly.end || disabled.end)) setFocusedField('end');
    setOpen(true);
  };
  const handleNext = () => {
    setFocusedField('end');
  };
  const handleOk = () => {
    setFocusedField(undefined);
    setOpen(false);
  };
  const handleCancel = () => {
    handleRangeChange(prevTimeRangeRef.current);
    setFocusedField(undefined);
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
        focusedField={focusedField}
        focused={open}
        {...commonProps}
        {...TimeRangeFieldProps}
      />
      <Popover
        anchorElRef={anchorElRef}
        className="JinniTimeRangePickerPopover"
        open={open}
        {...PopoverProps}
      >
        {focusedField &&
          renderDigitalClock(
            {
              ...commonProps,
              value: timeRange[focusedField],
              onChange: handleTimeChange(focusedField),
              readOnly: readOnly[focusedField],
              disabled: disabled[focusedField],
              minTime: minTime?.[focusedField],
              maxTime: maxTime?.[focusedField],
              disabledTimes: disabledTimes?.[focusedField]
            } as DigitalClockProps<T, Mode>,
            focusedField
          )}
        <div className="JinniTimeRangePickerButtons">
          <Button variant="text" onClick={handleCancel}>
            Cancel
          </Button>
          {focusedField === 'start' && (
            <Button onClick={handleNext}>Next</Button>
          )}
          {focusedField === 'end' && <Button onClick={handleOk}>OK</Button>}
        </div>
      </Popover>
    </Component>
  );
};

export default TimeRangePicker;
