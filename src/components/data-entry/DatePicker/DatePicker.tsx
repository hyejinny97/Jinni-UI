import './DatePicker.scss';
import { useRef, useState } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import {
  ValidationError,
  DateOptions
} from '@/components/data-entry/DateField';
import { DateField, DateFieldProps } from '@/components/data-entry/DateField';
import { Calendar, CalendarProps } from '@/components/data-entry/Calendar';
import { Popover, PopoverProps } from '@/components/data-display/Popover';
import { useDateValue } from './DatePicker.hooks';
import { ButtonBase } from '@/components/general/ButtonBase';
import { DateRangeIcon } from '@/components/icons/DateRangeIcon';

export type DatePickerProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'defaultValue' | 'onChange'
> & {
  name?: string;
  defaultValue?: Date;
  value?: Date | null;
  onChange?: (value: Date, validationError?: ValidationError) => void;
  locale?: string;
  options?: DateOptions;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Array<Date>;
  readOnly?: boolean;
  disabled?: boolean;
  PopoverProps?: Omit<PopoverProps, 'open' | 'children'>;
  DateFieldProps?: DateFieldProps;
  renderCalendar?: (calendarProps: CalendarProps) => React.ReactNode;
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
    readOnly = false,
    disabled = false,
    PopoverProps,
    DateFieldProps,
    renderCalendar = (calendarProps: CalendarProps) => (
      <Calendar {...calendarProps} />
    ),
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const { dateValue, handleChange } = useDateValue({
    defaultValue,
    value,
    onChange
  });
  const newStyle = useStyle(style);

  const handleOpen = () => {
    if (readOnly || disabled) return;
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const commonProps = {
    value: dateValue,
    onChange: handleChange,
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
        'JinniDatePicker',
        { fullWidth: !!DateFieldProps?.fullWidth },
        className
      )}
      style={newStyle}
      {...rest}
    >
      <input
        name={name}
        value={dateValue?.toLocaleDateString() || ''}
        hidden
        readOnly
      />
      <DateField
        ref={anchorElRef}
        endAdornment={
          <ButtonBase
            type="button"
            className={cn('JinniDatePickerOpenButton', { readOnly, disabled })}
            onClick={handleOpen}
            disableOverlay={readOnly || disabled}
            disableRipple={readOnly || disabled}
          >
            <DateRangeIcon size={20} color="gray-500" />
          </ButtonBase>
        }
        focused={open}
        {...commonProps}
        {...DateFieldProps}
      />
      <Popover
        className="JinniDatePickerPopover"
        anchorElRef={anchorElRef}
        open={open}
        onClose={handleClose}
        {...PopoverProps}
      >
        {renderCalendar(commonProps)}
      </Popover>
    </Component>
  );
};

export default DatePicker;
