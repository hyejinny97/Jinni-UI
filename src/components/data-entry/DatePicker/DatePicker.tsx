import './DatePicker.scss';
import { useRef, useState, useId } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { DateField, DateFieldProps } from '@/components/data-entry/DateField';
import {
  DateCalendar,
  DateCalendarProps
} from '@/components/data-entry/DateCalendar';
import { Popover, PopoverProps } from '@/components/data-display/Popover';
import { useDateValue } from './DatePicker.hooks';
import { ButtonBase } from '@/components/general/ButtonBase';
import { DateRangeIcon } from '@/components/icons/DateRangeIcon';
import { DateComponentProps } from '@/types/date-component';

export type DatePickerProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'defaultValue' | 'onChange'
> &
  DateComponentProps & {
    name?: string;
    PopoverProps?: Omit<PopoverProps, 'open' | 'children'>;
    DateFieldProps?: DateFieldProps;
    renderDateCalendar?: (
      dateCalendarProps: DateCalendarProps
    ) => React.ReactNode;
  };

const DatePicker = <T extends AsType = 'div'>(props: DatePickerProps<T>) => {
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
    readOnly,
    disabled,
    PopoverProps,
    DateFieldProps,
    renderDateCalendar = (dateCalendarProps: DateCalendarProps) => (
      <DateCalendar {...dateCalendarProps} />
    ),
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const popoverId = useId();
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const { selectedDate, onSelectDate } = useDateValue({
    defaultValue,
    value,
    onChange
  });
  const newStyle = useStyle(style);
  const { className: popoverClassName, ...restPopoverProps } = (PopoverProps ||
    {}) as Partial<PopoverProps>;

  const openPopover = () => {
    if (readOnly || disabled) return;
    setOpen(true);
  };
  const closePopover = () => {
    setOpen(false);
  };

  const commonProps = {
    value: selectedDate,
    onChange: onSelectDate,
    locale,
    options,
    minDate,
    maxDate,
    disabledDates,
    readOnly,
    disabled
  };
  const dateFieldProps = {
    ...commonProps,
    focused: open,
    endAdornment: (
      <ButtonBase
        type="button"
        className={cn('JinniDatePickerOpenButton', { readOnly, disabled })}
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
    ),
    ...DateFieldProps
  };
  const dateCalendarProps = {
    ...commonProps,
    onBaseCalendarTypeChange: closePopover
  };

  return (
    <Component
      role="group"
      className={cn(
        'JinniDatePicker',
        { fullWidth: !!DateFieldProps?.fullWidth },
        className
      )}
      style={newStyle}
      aria-label="Date Picker"
      {...rest}
    >
      <input
        name={name}
        value={selectedDate?.toLocaleDateString() || ''}
        hidden
        readOnly
      />
      <DateField ref={anchorElRef} {...dateFieldProps} />
      <Popover
        id={popoverId}
        anchorElRef={anchorElRef}
        className={cn('JinniDatePickerPopover', popoverClassName)}
        open={open}
        onClose={closePopover}
        {...restPopoverProps}
      >
        {renderDateCalendar(dateCalendarProps)}
      </Popover>
    </Component>
  );
};

export default DatePicker;
