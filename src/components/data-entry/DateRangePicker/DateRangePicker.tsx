import './DateRangePicker.scss';
import { useRef, useState } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { DateOptions } from '@/components/data-entry/DateField';
import {
  DateRangeField,
  DateRangeFieldProps,
  DateRangeValidationError,
  RangeType
} from '@/components/data-entry/DateRangeField';
import {
  DateRangeCalendar,
  DateRangeCalendarProps
} from '@/components/data-entry/DateRangeCalendar';
import { Popover, PopoverProps } from '@/components/data-display/Popover';
import { useDateRange } from './DateRangePicker.hooks';
import { ButtonBase } from '@/components/general/ButtonBase';
import { DateRangeIcon } from '@/components/icons/DateRangeIcon';

export type DateRangePickerProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'defaultValue' | 'onChange'
> & {
  name?: RangeType<string>;
  defaultValue?: Partial<RangeType<Date>>;
  value?: RangeType<Date | null>;
  onChange?: (
    value: RangeType<Date | null>,
    validationError?: DateRangeValidationError
  ) => void;
  locale?: string;
  options?: DateOptions;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Array<Date>;
  readOnly?: boolean;
  disabled?: boolean;
  PopoverProps?: Omit<PopoverProps, 'open' | 'children'>;
  DateRangeFieldProps?: DateRangeFieldProps;
  renderDateRangeCalendar?: (
    dateRangeCalendarProps: DateRangeCalendarProps
  ) => React.ReactNode;
};

const DateRangePicker = <T extends AsType = 'div'>(
  props: DateRangePickerProps<T>
) => {
  const {
    name,
    defaultValue,
    value,
    onChange,
    locale,
    options,
    minDate,
    maxDate,
    disabledDates,
    readOnly = false,
    disabled = false,
    PopoverProps,
    DateRangeFieldProps,
    renderDateRangeCalendar = (
      dateRangeCalendarProps: DateRangeCalendarProps
    ) => <DateRangeCalendar {...dateRangeCalendarProps} />,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [focusedDate, setFocusedDate] = useState<'start' | 'end' | undefined>();
  const { dateRange, handleRangeChange } = useDateRange({
    defaultValue,
    value,
    onChange
  });
  const newStyle = useStyle(style);

  const handleOpen = () => {
    if (readOnly || disabled) return;
    setFocusedDate('start');
    setOpen(true);
  };
  const handleClose = () => {
    setFocusedDate(undefined);
    setOpen(false);
  };
  const handleDateRangeCalendarChange = (
    date: RangeType<Date | null>,
    validationError?: DateRangeValidationError
  ) => {
    const { start, end } = date;
    if (start) {
      if (end) {
        handleClose();
      } else {
        setFocusedDate('end');
      }
    }
    handleRangeChange(date, validationError);
  };

  const commonProps = {
    value: dateRange,
    locale,
    options,
    readOnly,
    disabled,
    minDate,
    maxDate,
    disabledDates
  };

  return (
    <Component
      className={cn(
        'JinniDateRangePicker',
        { fullWidth: !!DateRangeFieldProps?.fullWidth },
        className
      )}
      style={newStyle}
      {...rest}
    >
      <input
        name={name?.start}
        value={dateRange.start?.toDateString() || ''}
        hidden
        readOnly
      />
      <input
        name={name?.end}
        value={dateRange.end?.toDateString() || ''}
        hidden
        readOnly
      />
      <DateRangeField
        ref={anchorElRef}
        onChange={handleRangeChange}
        focusedDate={focusedDate}
        endAdornment={{
          dateRangeField: (
            <ButtonBase
              type="button"
              className={cn('JinniDateRangePickerOpenButton', {
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
        {...commonProps}
        {...DateRangeFieldProps}
      />
      <Popover
        className="JinniDateRangePickerPopover"
        anchorElRef={anchorElRef}
        open={open}
        onClose={handleClose}
        {...PopoverProps}
      >
        {renderDateRangeCalendar({
          ...commonProps,
          onChange: handleDateRangeCalendarChange
        })}
      </Popover>
    </Component>
  );
};

export default DateRangePicker;
