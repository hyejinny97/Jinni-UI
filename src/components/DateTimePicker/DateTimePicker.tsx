'use client';

import './DateTimePicker.scss';
import { useRef, useState, useId } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import DateTimeField, { DateTimeFieldProps } from '@/components/DateTimeField';
import Popover, { PopoverProps } from '@/components/Popover';
import DateCalendar, { DateCalendarProps } from '@/components/DateCalendar';
import ManualDigitalClock from '@/components/ManualDigitalClock';
import PresetDigitalClock from '@/components/PresetDigitalClock';
import { useDateTimeValue } from './DateTimePicker.hooks';
import ButtonBase from '@/components/ButtonBase';
import Button from '@/components/Button';
import { DateRangeIcon } from '@/components/icons/DateRangeIcon';
import Stack from '@/components/Stack';
import Divider from '@/components/Divider';
import {
  DateTimeComponentProps,
  DisabledDateTimesWithUnitFnType
} from '@/types/date-time-component';
import {
  filterTimeOptions,
  filterDateOptions
} from '@/utils/date-time-component';
import {
  TIME_STEP_PRESET_DEFAULT,
  TIME_STEP_MANUAL_DEFAULT
} from './DateTimePicker.constants';
import { fixDigitalClockPropsByMode } from '@/utils/time-component';
import {
  TimeMode,
  DigitalClockProps,
  TimeStepManualType
} from '@/types/time-component';
import {
  disabledDatesInDateCalendar,
  disabledDateTimesInDateTimeField,
  toDisabledTimes
} from './DateTimePicker.utils';

export type DateTimePickerProps<
  T extends AsType = 'div',
  Mode extends TimeMode = 'manual'
> = Omit<DefaultComponentProps<T>, 'defaultValue' | 'onChange'> &
  DateTimeComponentProps<Mode> & {
    name?: string;
    disabledDateTimes?: Array<Date> | DisabledDateTimesWithUnitFnType<Mode>;
    PopoverProps?: Omit<
      PopoverProps,
      'open' | 'anchorReference' | 'anchorElRef' | 'anchorPosition'
    >;
    DateTimeFieldProps?: DateTimeFieldProps;
    renderDateCalendar?: (
      dateCalendarProps: DateCalendarProps
    ) => React.ReactNode;
    renderDigitalClock?: (
      digitalClockProps: DigitalClockProps
    ) => React.ReactNode;
  };

const DateTimePicker = <
  T extends AsType = 'div',
  Mode extends TimeMode = 'manual'
>(
  props: DateTimePickerProps<T, Mode>
) => {
  const {
    defaultValue,
    value,
    onChange,
    locale,
    options,
    timeMode = 'manual' as Mode,
    timeStep = (timeMode === 'preset'
      ? TIME_STEP_PRESET_DEFAULT
      : TIME_STEP_MANUAL_DEFAULT) as Mode extends 'preset'
      ? number
      : TimeStepManualType,
    disabledDateTimes,
    readOnly,
    disabled,
    name,
    PopoverProps,
    DateTimeFieldProps,
    renderDateCalendar = (dateCalendarProps: DateCalendarProps) => (
      <DateCalendar {...dateCalendarProps} />
    ),
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
  const prevDateTimeRef = useRef<Date | null>(null);
  const [open, setOpen] = useState(false);
  const {
    dateTimeValue,
    handleDateTimeChange,
    handleDateChange,
    handleTimeChange
  } = useDateTimeValue({ defaultValue, value, onChange });
  const newStyle = useStyle(style);
  const { className: popoverClassName, ...restPopoverProps } =
    PopoverProps || {};

  const openPopover = () => {
    if (readOnly || disabled) return;
    prevDateTimeRef.current = dateTimeValue;
    setOpen(true);
  };
  const closePopover = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    handleDateTimeChange(prevDateTimeRef.current);
    closePopover();
  };

  const commonProps = {
    value: dateTimeValue,
    locale,
    readOnly,
    disabled
  };
  const dateTimeFieldProps = {
    ...commonProps,
    timeMode,
    timeStep,
    disabledDateTimes: disabledDateTimesInDateTimeField<Mode>({
      timeMode,
      disabledDateTimes
    }),
    onChange: handleDateTimeChange,
    options,
    focused: open,
    endAdornment: (
      <ButtonBase
        type="button"
        className={cn('JinniDateTimePickerOpenButton', { readOnly, disabled })}
        onClick={openPopover}
        disableOverlay={readOnly || disabled}
        disableRipple={readOnly || disabled}
        aria-label="Choose Date Time"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={popoverId}
      >
        <DateRangeIcon size={20} color="on-surface-variant" />
      </ButtonBase>
    ),
    ...DateTimeFieldProps
  };
  const dateCalendarProps = {
    ...commonProps,
    disabledDates: disabledDatesInDateCalendar<Mode>({
      timeMode,
      disabledDateTimes,
      dateTimeValue
    }),
    onChange: handleDateChange,
    options: filterDateOptions(options)
  };
  const digitClockProps = {
    ...commonProps,
    ...fixDigitalClockPropsByMode({
      mode: timeMode,
      disabledTimes: toDisabledTimes({
        timeMode,
        disabledDateTimes,
        dateTimeValue
      }),
      timeStep
    }),
    onChange: handleTimeChange,
    options: filterTimeOptions(options)
  };

  return (
    <Component
      role="group"
      className={cn(
        'JinniDateTimePicker',
        { fullWidth: !!DateTimeFieldProps?.fullWidth },
        className
      )}
      style={newStyle}
      aria-label="Date Time Picker"
      {...rest}
    >
      <input
        name={name}
        value={dateTimeValue?.toLocaleString(locale) || ''}
        hidden
        readOnly
      />
      <DateTimeField ref={anchorElRef} {...dateTimeFieldProps} />
      <Popover
        id={popoverId}
        anchorReference="anchorEl"
        anchorElRef={anchorElRef}
        className={cn('JinniDateTimePickerPopover', popoverClassName)}
        open={open}
        onClose={closePopover}
        {...restPopoverProps}
      >
        <Stack
          className="JinniDateTimePickerPopoverContainer"
          direction="row"
          divider={<Divider orientation="vertical" />}
        >
          {renderDateCalendar(dateCalendarProps)}
          {renderDigitalClock(digitClockProps)}
        </Stack>
        <div className="JinniDateTimePickerButtons">
          <Button variant="text" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={closePopover}>OK</Button>
        </div>
      </Popover>
    </Component>
  );
};

export default DateTimePicker;
