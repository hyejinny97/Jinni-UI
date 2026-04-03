import './DateTimeRangePicker.scss';
import { useRef, useState, useId, Fragment } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import {
  DateTimeRangeField,
  DateTimeRangeFieldProps
} from '@/components/data-entry/DateTimeRangeField';
import { Popover, PopoverProps } from '@/components/data-display/Popover';
import {
  DateRangeCalendar,
  DateRangeCalendarProps
} from '@/components/data-entry/DateRangeCalendar';
import { ManualDigitalClock } from '@/components/data-entry/ManualDigitalClock';
import { PresetDigitalClock } from '@/components/data-entry/PresetDigitalClock';
import { useDateTimeRangeValue } from './DateTimeRangePicker.hooks';
import { ButtonBase } from '@/components/general/ButtonBase';
import { Button } from '@/components/general/Button';
import { DateRangeIcon } from '@/components/icons/DateRangeIcon';
import { Stack } from '@/components/layout/Stack';
import { Divider } from '@/components/layout/Divider';
import { TimeMode, DigitalClockProps } from '@/types/time-component';
import {
  DateTimeRangeComponent,
  RangeType,
  RangeFieldType
} from '@/types/date-time-component';
import {
  filterTimeOptions,
  filterDateOptions
} from '@/utils/date-time-component';
import {
  TIME_STEP_PRESET_DEFAULT,
  TIME_STEP_MANUAL_DEFAULT
} from './DateTimeRangePicker.constants';
import { fixTypeByMode } from '@/utils/time-component';

type Orientation = 'horizontal' | 'vertical';

export type DateTimeRangePickerProps<
  T extends AsType = 'div',
  Mode extends TimeMode = 'manual',
  MonthOrientation extends Orientation = 'horizontal',
  DayOrientation extends Orientation = 'horizontal'
> = Omit<DefaultComponentProps<T>, 'defaultValue' | 'onChange'> &
  DateTimeRangeComponent<Mode> & {
    name?: RangeType<string>;
    PopoverProps?: Omit<PopoverProps, 'open' | 'children'>;
    DateTimeRangeFieldProps?: DateTimeRangeFieldProps;
    renderDateRangeCalendar?: (
      dateRangeCalendarProps: DateRangeCalendarProps<
        'div',
        MonthOrientation,
        DayOrientation
      >
    ) => React.ReactNode;
    renderDigitalClock?: (
      digitalClockProps: DigitalClockProps
    ) => React.ReactNode;
  };

const DateTimeRangePicker = <
  T extends AsType = 'div',
  Mode extends TimeMode = 'manual',
  MonthOrientation extends Orientation = 'horizontal',
  DayOrientation extends Orientation = 'horizontal'
>(
  props: DateTimeRangePickerProps<T, Mode, MonthOrientation, DayOrientation>
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
    DateTimeRangeFieldProps,
    renderDateRangeCalendar = (dateRangeCalendarProps) => (
      <DateRangeCalendar {...dateRangeCalendarProps} />
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
  const prevDateTimeRangeRef = useRef<RangeType<Date | null>>({
    start: null,
    end: null
  });
  const [open, setOpen] = useState(false);
  const [focusedField, setFocusedField] = useState<
    RangeFieldType | undefined
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
  const { className: popoverClassName, ...restPopoverProps } = (PopoverProps ||
    {}) as Partial<PopoverProps>;

  const openPopover = () => {
    if (readOnly || disabled) return;
    prevDateTimeRangeRef.current = dateTimeRangeValue;
    setFocusedField('start');
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
    handleDateTimeRangeChange(prevDateTimeRangeRef.current);
    closePopover();
  };
  const handleDateRangeCalendarChange = (
    newValue: RangeType<Date | null>,
    selectedDate?: Date
  ) => {
    switch (focusedField) {
      case 'start':
        handleDateRangeChange({ start: selectedDate, end: null });
        break;
      case 'end':
        handleDateRangeChange(newValue);
    }
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
    disabledTimes
  };
  const dateTimeRangeProps = {
    ...commonProps,
    ...dateProps,
    ...timeProps,
    value: dateTimeRangeValue,
    onChange: handleDateTimeRangeChange,
    options,
    timeMode,
    timeStep,
    focused: open,
    focusedField,
    endAdornment: {
      dateTimeRangeField: (
        <ButtonBase
          type="button"
          className={cn('JinniDateTimeRangePickerOpenButton', {
            readOnly,
            disabled
          })}
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
      )
    },
    ...DateTimeRangeFieldProps
  };
  const dateRangeCalendarProps = {
    ...commonProps,
    ...dateProps,
    className: cn({ disableHoverRangeEffect: focusedField === 'start' }),
    value: dateTimeRangeValue,
    onChange: handleDateRangeCalendarChange,
    options: filterDateOptions(options),
    monthCalendarsOrientation: 'horizontal' as MonthOrientation,
    dayCalendarsOrientation: 'horizontal' as DayOrientation,
    monthCalendars: 1 as 1 | 2 | 3,
    dayCalendars: 1 as 1 | 2 | 3
  };
  const digitalClockProps = {
    ...commonProps,
    ...timeProps,
    ...fixTypeByMode({ mode: timeMode, timeStep }),
    value: focusedField ? dateTimeRangeValue[focusedField] : null,
    onChange: focusedField ? handleTimeChange(focusedField) : undefined,
    options: filterTimeOptions(options)
  };

  return (
    <Component
      role="group"
      className={cn(
        'JinniDateTimeRangePicker',
        { fullWidth: !!DateTimeRangeFieldProps?.fullWidth },
        className
      )}
      style={newStyle}
      aria-label="Date Time Range Picker"
      {...rest}
    >
      <input
        name={name?.start}
        value={dateTimeRangeValue.start?.toLocaleString(locale) || ''}
        hidden
        readOnly
      />
      <input
        name={name?.end}
        value={dateTimeRangeValue.end?.toLocaleString(locale) || ''}
        hidden
        readOnly
      />
      <DateTimeRangeField ref={anchorElRef} {...dateTimeRangeProps} />
      <Popover
        id={popoverId}
        anchorElRef={anchorElRef}
        className={cn('JinniDateTimeRangePickerPopover', popoverClassName)}
        open={open}
        onClose={closePopover}
        {...restPopoverProps}
      >
        <Stack
          className="JinniDateTimeRangePickerPopoverContainer"
          direction="row"
          divider={
            <Divider
              orientation="vertical"
              style={{ backgroundColor: 'gray-300' }}
            />
          }
        >
          {renderDateRangeCalendar(dateRangeCalendarProps)}
          <Fragment key={focusedField}>
            {renderDigitalClock(digitalClockProps)}
          </Fragment>
        </Stack>
        <div className="JinniDateTimeRangePickerButtons">
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

export default DateTimeRangePicker;
