import './TimeRangePicker.scss';
import { useRef, useState, Fragment, useId } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import {
  TimeRangeField,
  TimeRangeFieldProps
} from '@/components/data-entry/TimeRangeField';
import { Popover, PopoverProps } from '@/components/data-display/Popover';
import { ManualDigitalClock } from '@/components/data-entry/ManualDigitalClock';
import { PresetDigitalClock } from '@/components/data-entry/PresetDigitalClock';
import { useTimeRangeValue } from './TimeRangePicker.hooks';
import {
  TIME_STEP_PRESET_DEFAULT,
  TIME_STEP_MANUAL_DEFAULT
} from './TimeRangePicker.constants';
import { Button } from '@/components/general/Button';
import { ButtonBase } from '@/components/general/ButtonBase';
import { AccessTimeIcon } from '@/components/icons/AccessTimeIcon';
import {
  TimeMode,
  TimeRangeComponentProps,
  RangeType,
  RangeFieldType,
  DigitalClockProps
} from '@/types/time-component';
import { DEFAULT_TIME_OPTIONS } from '@/constants/time-component';
import { fixTypeByMode } from '@/utils/time-component';

export type TimeRangePickerProps<
  T extends AsType = 'div',
  Mode extends TimeMode = 'preset'
> = Omit<DefaultComponentProps<T>, 'defaultValue' | 'onChange'> &
  TimeRangeComponentProps<Mode> & {
    name?: RangeType<string>;
    PopoverProps?: Omit<PopoverProps, 'open' | 'children'>;
    TimeRangeFieldProps?: TimeRangeFieldProps;
    renderDigitalClock?: (
      digitalClockProps: DigitalClockProps
    ) => React.ReactNode;
  };

const TimeRangePicker = <
  T extends AsType = 'div',
  Mode extends TimeMode = 'preset'
>(
  props: TimeRangePickerProps<T, Mode>
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
    TimeRangeFieldProps,
    renderDigitalClock = (digitalClockProps) =>
      digitalClockProps.mode === 'preset' ? (
        <PresetDigitalClock {...digitalClockProps} />
      ) : (
        <ManualDigitalClock {...digitalClockProps} />
      ),
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const popoverId = useId();
  const anchorElRef = useRef<HTMLDivElement>(null);
  const prevTimeRangeRef = useRef<RangeType<Date | null>>({
    start: null,
    end: null
  });
  const [open, setOpen] = useState(false);
  const [focusedField, setFocusedField] = useState<RangeFieldType>();
  const { timeRangeValue, handleTimeRangeChange, handleTimeChange } =
    useTimeRangeValue({
      defaultValue,
      value,
      onChange
    });
  const newStyle = useStyle(style);
  const { className: popoverClassName, ...restPopoverProps } = (PopoverProps ||
    {}) as Partial<PopoverProps>;
  const isStartFieldFocusable = !readOnly?.start && !disabled?.start;
  const isEndFieldFocusable = !readOnly?.end && !disabled?.end;
  const disableOpen = !isStartFieldFocusable && !isEndFieldFocusable;

  const openPopover = () => {
    prevTimeRangeRef.current = timeRangeValue;
    if (disableOpen) return;
    if (isStartFieldFocusable) setFocusedField('start');
    else if (isEndFieldFocusable) setFocusedField('end');
    setOpen(true);
  };
  const closePopover = () => {
    setFocusedField(undefined);
    setOpen(false);
  };
  const handleNext = () => {
    setFocusedField('end');
  };
  const handleCancel = () => {
    handleTimeRangeChange(prevTimeRangeRef.current);
    closePopover();
  };

  const commonProps = {
    locale,
    options
  };
  const timeRangeFieldProps = {
    ...commonProps,
    mode,
    timeStep,
    value: timeRangeValue,
    onChange: handleTimeRangeChange,
    minTime,
    maxTime,
    disabledTimes,
    readOnly,
    disabled,
    focusedField,
    focused: open,
    endAdornment: {
      timeRangeField: (
        <ButtonBase
          type="button"
          className={cn('JinniTimeRangePickerOpenButton', {
            disableOpen
          })}
          onClick={openPopover}
          disableOverlay={disableOpen}
          disableRipple={disableOpen}
          aria-label="Choose Time"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={popoverId}
        >
          <AccessTimeIcon size={20} color="gray-500" />
        </ButtonBase>
      )
    },
    ...TimeRangeFieldProps
  };
  const getDigitalClockProps = (rangeField: RangeFieldType) => ({
    ...commonProps,
    ...fixTypeByMode({ mode, timeStep }),
    value: timeRangeValue[rangeField],
    onChange: handleTimeChange(rangeField),
    minTime: minTime?.[rangeField],
    maxTime: maxTime?.[rangeField],
    disabledTimes: disabledTimes?.[rangeField],
    readOnly: readOnly?.[rangeField],
    disabled: disabled?.[rangeField]
  });

  return (
    <Component
      role="group"
      className={cn(
        'JinniTimeRangePicker',
        { fullWidth: !!TimeRangeFieldProps?.fullWidth },
        className
      )}
      style={newStyle}
      aria-label="Time Range Picker"
      {...rest}
    >
      <input
        name={name?.start}
        value={timeRangeValue.start?.toTimeString() || ''}
        hidden
        readOnly
      />
      <input
        name={name?.end}
        value={timeRangeValue.end?.toTimeString() || ''}
        hidden
        readOnly
      />
      <TimeRangeField ref={anchorElRef} {...timeRangeFieldProps} />
      <Popover
        id={popoverId}
        anchorElRef={anchorElRef}
        className={cn('JinniTimeRangePickerPopover', popoverClassName)}
        open={open}
        onClose={closePopover}
        {...restPopoverProps}
      >
        <Fragment key={focusedField}>
          {focusedField &&
            renderDigitalClock(getDigitalClockProps(focusedField))}
        </Fragment>
        <div className="JinniTimeRangePickerButtons">
          <Button variant="text" onClick={handleCancel}>
            Cancel
          </Button>
          {focusedField === 'start' && (
            <Button onClick={handleNext}>Next</Button>
          )}
          {focusedField === 'end' && <Button onClick={closePopover}>OK</Button>}
        </div>
      </Popover>
    </Component>
  );
};

export default TimeRangePicker;
