import './DateTimePicker.scss';
import { useRef, useState, useId } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { TimeMode } from '@/types/time-component';
import {
  DateTimeField,
  DateTimeFieldProps
} from '@/components/data-entry/DateTimeField';
import { Popover, PopoverProps } from '@/components/data-display/Popover';
import {
  DateCalendar,
  DateCalendarProps
} from '@/components/data-entry/DateCalendar';
import {
  ManualDigitalClock,
  ManualDigitalClockProps
} from '@/components/data-entry/ManualDigitalClock';
import {
  PresetDigitalClock,
  PresetDigitalClockProps
} from '@/components/data-entry/PresetDigitalClock';
import { useDateTimeValue } from './DateTimePicker.hooks';
import { ButtonBase } from '@/components/general/ButtonBase';
import { Button } from '@/components/general/Button';
import { DateRangeIcon } from '@/components/icons/DateRangeIcon';
import { Stack } from '@/components/layout/Stack';
import { Divider } from '@/components/layout/Divider';
import { DateTimeComponentProps } from '@/types/date-time-component';
import {
  filterTimeOptions,
  filterDateOptions
} from '@/utils/date-time-component';
import {
  TIME_STEP_PRESET_DEFAULT,
  TIME_STEP_MANUAL_DEFAULT
} from './DateTimePicker.constants';
import { fixTypeByMode } from '@/utils/time-component';

type DigitalClockProps =
  | ({ mode: 'preset' } & PresetDigitalClockProps)
  | ({ mode: 'manual' } & ManualDigitalClockProps);

export type DateTimePickerProps<
  T extends AsType = 'div',
  Mode extends TimeMode = 'manual'
> = Omit<DefaultComponentProps<T>, 'defaultValue' | 'onChange'> &
  DateTimeComponentProps<Mode> & {
    name?: string;
    PopoverProps?: Omit<PopoverProps, 'open' | 'children'>;
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
    timeStep = timeMode === 'preset'
      ? TIME_STEP_PRESET_DEFAULT
      : TIME_STEP_MANUAL_DEFAULT,
    minTime,
    maxTime,
    disabledTimes,
    minDate,
    maxDate,
    disabledDates,
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
    as: Component = 'div',
    ...rest
  } = props;
  const popoverId = useId();
  const anchorElRef = useRef<HTMLElement>(null);
  const prevDateTimeRef = useRef<Date | null>(null);
  const [open, setOpen] = useState(false);
  const {
    dateTimeValue,
    handleDateTimeChange,
    handleDateChange,
    handleTimeChange
  } = useDateTimeValue({ defaultValue, value, onChange });
  const newStyle = useStyle(style);
  const { className: popoverClassName, ...restPopoverProps } = (PopoverProps ||
    {}) as Partial<PopoverProps>;

  const openPopover = () => {
    prevDateTimeRef.current = dateTimeValue;
    if (readOnly || disabled) return;
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
  const dateProps = {
    minDate,
    maxDate,
    disabledDates
  };
  const timeProps = {
    timeMode,
    timeStep,
    minTime,
    maxTime,
    disabledTimes
  };
  const dateTimeFieldProps = {
    ...commonProps,
    ...dateProps,
    ...timeProps,
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
        <DateRangeIcon size={20} color="gray-500" />
      </ButtonBase>
    ),
    ...DateTimeFieldProps
  };
  const dateCalendarProps = {
    ...commonProps,
    ...dateProps,
    onChange: handleDateChange,
    options: filterDateOptions(options)
  };
  const digitClockProps = {
    ...commonProps,
    ...fixTypeByMode({ mode: timeMode, timeStep }),
    minTime,
    maxTime,
    disabledTimes,
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
        anchorElRef={anchorElRef}
        className={cn('JinniDateTimePickerPopover', popoverClassName)}
        open={open}
        onClose={closePopover}
        {...restPopoverProps}
      >
        <Stack
          className="JinniDateTimePickerPopoverContainer"
          direction="row"
          divider={
            <Divider
              orientation="vertical"
              style={{ backgroundColor: 'gray-300' }}
            />
          }
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
