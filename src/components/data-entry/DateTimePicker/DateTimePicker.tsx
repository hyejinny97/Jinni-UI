import './DateTimePicker.scss';
import { useRef, useState } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import {
  TimeMode,
  TimeStepManualType
} from '@/components/data-entry/TimeField';
import {
  DateTimeField,
  DateTimeFieldProps,
  DateTimeValidationError,
  DateTimeOptions,
  filterTimeOptions,
  filterDateOptions
} from '@/components/data-entry/DateTimeField';
import { Popover, PopoverProps } from '@/components/data-display/Popover';
import { Calendar, CalendarProps } from '@/components/data-entry/Calendar';
import {
  DigitalClock,
  DigitalClockProps
} from '@/components/data-entry/DigitalClock';
import { useDateTimeValue } from './DateTimePicker.hooks';
import { ButtonBase } from '@/components/general/ButtonBase';
import { Button } from '@/components/general/Button';
import { DateRangeIcon } from '@/components/icons/DateRangeIcon';
import { Stack } from '@/components/layout/Stack';
import { Divider } from '@/components/layout/Divider';

export type DateTimePickerProps<
  T extends AsType = 'div',
  Mode extends TimeMode = 'manual'
> = Omit<DefaultComponentProps<T>, 'defaultValue' | 'onChange'> & {
  name?: string;
  defaultValue?: Date;
  value?: Date | null;
  onChange?: (
    value: Date | null,
    validationError?: DateTimeValidationError
  ) => void;
  locale?: string;
  options?: DateTimeOptions;
  minTime?: Date;
  maxTime?: Date;
  disabledTimes?: Array<Date>;
  timeMode?: Mode;
  timeStep?: Mode extends 'preset' ? number : TimeStepManualType;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Array<Date>;
  readOnly?: boolean;
  disabled?: boolean;
  PopoverProps?: Omit<PopoverProps, 'open' | 'children'>;
  DateTimeFieldProps?: DateTimeFieldProps;
  renderCalendar?: (calendarProps: CalendarProps) => React.ReactNode;
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

const DateTimePicker = <
  T extends AsType = 'div',
  Mode extends TimeMode = 'manual'
>(
  props: DateTimePickerProps<T, Mode>
) => {
  const {
    name,
    defaultValue,
    value,
    onChange,
    locale,
    options,
    minTime,
    maxTime,
    disabledTimes,
    timeMode = 'manual' as Mode,
    timeStep = timeMode === 'preset'
      ? TIME_STEP_PRESET_DEFAULT
      : TIME_STEP_MANUAL_DEFAULT,
    minDate,
    maxDate,
    disabledDates,
    readOnly,
    disabled,
    PopoverProps,
    DateTimeFieldProps,
    renderCalendar = (calendarProps: CalendarProps) => (
      <Calendar {...calendarProps} />
    ),
    renderDigitalClock = (digitalClockProps: DigitalClockProps<T, Mode>) => (
      <DigitalClock {...digitalClockProps} />
    ),
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
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

  const handleOpen = () => {
    prevDateTimeRef.current = dateTimeValue;
    if (readOnly || disabled) return;
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    handleDateTimeChange(prevDateTimeRef.current);
    setOpen(false);
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
    minTime,
    maxTime,
    disabledTimes,
    mode: timeMode,
    timeStep
  };

  return (
    <Component
      className={cn(
        'JinniDateTimePicker',
        { fullWidth: !!DateTimeFieldProps?.fullWidth },
        className
      )}
      style={newStyle}
      {...rest}
    >
      <input
        name={name}
        value={dateTimeValue?.toLocaleString() || ''}
        hidden
        readOnly
      />
      <DateTimeField
        ref={anchorElRef}
        options={options}
        onChange={handleDateTimeChange}
        endAdornment={
          <ButtonBase
            type="button"
            className={cn('JinniDateTimePickerOpenButton', {
              readOnly,
              disabled
            })}
            onClick={handleOpen}
            disableOverlay={readOnly || disabled}
            disableRipple={readOnly || disabled}
          >
            <DateRangeIcon size={20} color="gray-500" />
          </ButtonBase>
        }
        focused={open}
        {...commonProps}
        {...dateProps}
        {...timeProps}
        {...DateTimeFieldProps}
      />
      <Popover
        className="JinniDateTimePickerPopover"
        anchorElRef={anchorElRef}
        open={open}
        onClose={handleClose}
        {...PopoverProps}
      >
        <Stack
          direction="row"
          divider={
            <Divider
              orientation="vertical"
              style={{ backgroundColor: 'gray-300' }}
            />
          }
        >
          {renderCalendar({
            ...commonProps,
            ...dateProps,
            options: filterDateOptions(options),
            onChange: handleDateChange
          })}
          {renderDigitalClock({
            ...commonProps,
            ...timeProps,
            options: filterTimeOptions(options),
            onChange: handleTimeChange
          } as DigitalClockProps<T, Mode>)}
        </Stack>
        <div className="JinniDateTimePickerButtons">
          <Button variant="text" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleClose}>OK</Button>
        </div>
      </Popover>
    </Component>
  );
};

export default DateTimePicker;
