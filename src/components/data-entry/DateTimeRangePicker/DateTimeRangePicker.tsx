import './DateTimeRangePicker.scss';
import { useRef, useState } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import {
  DateTimeRangeField,
  RangeType,
  DateTimeRangeValidationError,
  DateTimeRangeFieldProps
} from '@/components/data-entry/DateTimeRangeField';
import {
  DateTimeOptions,
  filterTimeOptions,
  filterDateOptions
} from '@/components/data-entry/DateTimeField';
import {
  TimeMode,
  TimeStepManualType
} from '@/components/data-entry/TimeField';
import { Popover, PopoverProps } from '@/components/data-display/Popover';
import {
  DateRangeCalendar,
  DateRangeCalendarProps
} from '@/components/data-entry/DateRangeCalendar';
import {
  DigitalClock,
  DigitalClockProps
} from '@/components/data-entry/DigitalClock';
import { useDateTimeRangeValue } from './DateTimeRangePicker.hooks';
import { ButtonBase } from '@/components/general/ButtonBase';
import { Button } from '@/components/general/Button';
import { DateRangeIcon } from '@/components/icons/DateRangeIcon';
import { Stack } from '@/components/layout/Stack';
import { Divider } from '@/components/layout/Divider';

export type DateTimeRangePickerProps<
  T extends AsType = 'div',
  Mode extends TimeMode = 'manual'
> = Omit<DefaultComponentProps<T>, 'defaultValue' | 'onChange'> & {
  name?: RangeType<string>;
  defaultValue?: Partial<RangeType<Date>>;
  value?: RangeType<Date | null>;
  onChange?: (
    value: RangeType<Date | null>,
    validationError?: DateTimeRangeValidationError
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
  DateTimeRangeFieldProps?: DateTimeRangeFieldProps;
  renderDateRangeCalendar?: (
    dateRangeCalendarProps: DateRangeCalendarProps
  ) => React.ReactNode;
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

const DateTimeRangePicker = <
  T extends AsType = 'div',
  Mode extends TimeMode = 'manual'
>(
  props: DateTimeRangePickerProps<T, Mode>
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
    DateTimeRangeFieldProps,
    renderDateRangeCalendar = (
      dateRangeCalendarProps: DateRangeCalendarProps
    ) => <DateRangeCalendar {...dateRangeCalendarProps} />,
    renderDigitalClock = (
      digitalClockProps: DigitalClockProps<T, Mode>,
      key?: string
    ) => <DigitalClock key={key} {...digitalClockProps} />,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const anchorElRef = useRef<HTMLElement>(null);
  const prevDateTimeRangeValueRef = useRef<RangeType<Date | null>>({
    start: null,
    end: null
  });
  const [open, setOpen] = useState(false);
  const [focusedDateTime, setFocusedDateTime] = useState<
    'start' | 'end' | undefined
  >();
  const {
    dateTimeRangeValue,
    handleDateTimeRangeChange,
    handleDateRangeChange,
    handleTimeChange
  } = useDateTimeRangeValue({
    defaultValue,
    value,
    onChange
  });
  const newStyle = useStyle(style);

  const handleOpen = () => {
    if (readOnly || disabled) return;
    prevDateTimeRangeValueRef.current = dateTimeRangeValue;
    setFocusedDateTime('start');
    setOpen(true);
  };
  const handleClose = () => {
    setFocusedDateTime(undefined);
    setOpen(false);
  };
  const handleNext = () => {
    setFocusedDateTime('end');
  };
  const handleCancel = () => {
    handleDateTimeRangeChange(prevDateTimeRangeValueRef.current);
    handleClose();
  };

  const commonProps = {
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
        'JinniDateTimeRangePicker',
        { fullWidth: !!DateTimeRangeFieldProps?.fullWidth },
        className
      )}
      style={newStyle}
      {...rest}
    >
      <input
        name={name?.start}
        value={dateTimeRangeValue.start?.toString() || ''}
        hidden
        readOnly
      />
      <input
        name={name?.end}
        value={dateTimeRangeValue.end?.toString() || ''}
        hidden
        readOnly
      />
      <DateTimeRangeField
        ref={anchorElRef}
        options={options}
        value={dateTimeRangeValue}
        onChange={handleDateTimeRangeChange}
        endAdornment={{
          dateTimeRangeField: (
            <ButtonBase
              type="button"
              className={cn('JinniDateTimeRangePickerOpenButton', {
                readOnly,
                disabled
              })}
              onClick={handleOpen}
              disableOverlay={readOnly || disabled}
              disableRipple={readOnly || disabled}
            >
              <DateRangeIcon size={20} color="gray-500" />
            </ButtonBase>
          )
        }}
        focused={open}
        focusedDateTime={focusedDateTime}
        {...commonProps}
        {...dateProps}
        {...timeProps}
        {...DateTimeRangeFieldProps}
      />
      <Popover
        className="JinniDateTimeRangePickerPopover"
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
          {renderDateRangeCalendar({
            ...commonProps,
            ...dateProps,
            value: dateTimeRangeValue,
            options: filterDateOptions(options),
            horizontalDayCalendars: 1,
            horizontalMonthCalendars: 1,
            onChange: (date: RangeType<Date | null>) => {
              if (focusedDateTime === 'end') {
                handleDateRangeChange(date);
              }
            },
            onSelect: (selectedDate: Date) => {
              if (focusedDateTime === 'start') {
                handleDateRangeChange({ start: selectedDate, end: null });
              }
            },
            disableHoverRangeEffect: focusedDateTime === 'start'
          })}
          {renderDigitalClock(
            {
              ...commonProps,
              ...timeProps,
              value: focusedDateTime
                ? dateTimeRangeValue[focusedDateTime]
                : null,
              options: filterTimeOptions(options),
              onChange: handleTimeChange(focusedDateTime)
            } as DigitalClockProps<T, Mode>,
            focusedDateTime
          )}
        </Stack>
        <div className="JinniDateTimeRangePickerButtons">
          <Button variant="text" onClick={handleCancel}>
            Cancel
          </Button>
          {focusedDateTime === 'start' && (
            <Button onClick={handleNext}>Next</Button>
          )}
          {focusedDateTime === 'end' && (
            <Button onClick={handleClose}>OK</Button>
          )}
        </div>
      </Popover>
    </Component>
  );
};

export default DateTimeRangePicker;
