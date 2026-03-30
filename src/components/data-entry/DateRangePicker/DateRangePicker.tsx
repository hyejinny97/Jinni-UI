import './DateRangePicker.scss';
import { useRef, useState, useId } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import {
  DateRangeField,
  DateRangeFieldProps
} from '@/components/data-entry/DateRangeField';
import {
  DateRangeCalendar,
  DateRangeCalendarProps
} from '@/components/data-entry/DateRangeCalendar';
import { Popover, PopoverProps } from '@/components/data-display/Popover';
import { useDateRangeValue } from './DateRangePicker.hooks';
import { ButtonBase } from '@/components/general/ButtonBase';
import { DateRangeIcon } from '@/components/icons/DateRangeIcon';
import {
  DateRangeComponentProps,
  RangeType,
  RangeFieldType
} from '@/types/date-component';

export type DateRangePickerProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'defaultValue' | 'onChange'
> &
  DateRangeComponentProps & {
    name?: RangeType<string>;
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
    defaultValue,
    value,
    onChange,
    locale,
    options,
    minDate,
    maxDate,
    disabledDates,
    readOnly,
    disabled,
    name,
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
  const popoverId = useId();
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [focusedField, setFocusedField] = useState<RangeFieldType>();
  const { dateRangeValue, handleDateRangeChange } = useDateRangeValue({
    defaultValue,
    value,
    onChange
  });
  const newStyle = useStyle(style);
  const { className: popoverClassName, ...restPopoverProps } = (PopoverProps ||
    {}) as Partial<PopoverProps>;

  const openPopover = () => {
    if (readOnly || disabled) return;
    setFocusedField('start');
    setOpen(true);
  };
  const closePopover = () => {
    setFocusedField(undefined);
    setOpen(false);
  };
  const handleCalendarChange = (newValue: RangeType<Date | null>) => {
    const { start, end } = newValue;
    if (start) {
      if (end) {
        closePopover();
      } else {
        setFocusedField('end');
      }
    }
    handleDateRangeChange(newValue);
  };

  const commonProps = {
    value: dateRangeValue,
    locale,
    options,
    minDate,
    maxDate,
    disabledDates,
    readOnly,
    disabled
  };
  const dateRangeFieldProps = {
    ...commonProps,
    onChange: handleDateRangeChange,
    focusedField,
    focused: open,
    endAdornment: {
      dateRangeField: (
        <ButtonBase
          type="button"
          className={cn('JinniDateRangePickerOpenButton', {
            readOnly,
            disabled
          })}
          onClick={openPopover}
          disableOverlay={readOnly || disabled}
          disableRipple={readOnly || disabled}
          aria-label="Choose Date"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={popoverId}
        >
          <DateRangeIcon size={20} color="gray-500" />
        </ButtonBase>
      )
    },
    ...DateRangeFieldProps
  };
  const dateRangeCalendarProps = {
    ...commonProps,
    onChange: handleCalendarChange
  };

  return (
    <Component
      role="group"
      className={cn(
        'JinniDateRangePicker',
        { fullWidth: !!DateRangeFieldProps?.fullWidth },
        className
      )}
      style={newStyle}
      aria-label="Date Range Picker"
      {...rest}
    >
      <input
        name={name?.start}
        value={dateRangeValue.start?.toLocaleDateString(locale) || ''}
        hidden
        readOnly
      />
      <input
        name={name?.end}
        value={dateRangeValue.end?.toLocaleDateString(locale) || ''}
        hidden
        readOnly
      />
      <DateRangeField ref={anchorElRef} {...dateRangeFieldProps} />
      <Popover
        id={popoverId}
        anchorElRef={anchorElRef}
        className={cn('JinniDateRangePickerPopover', popoverClassName)}
        open={open}
        onClose={closePopover}
        {...restPopoverProps}
      >
        {renderDateRangeCalendar(dateRangeCalendarProps)}
      </Popover>
    </Component>
  );
};

export default DateRangePicker;
