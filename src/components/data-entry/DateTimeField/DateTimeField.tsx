import './DateTimeField.scss';
import { forwardRef, MutableRefObject, useRef } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { InputBase, InputBaseProps } from '@/components/data-entry/InputBase';
import { DateField } from '@/components/data-entry/DateField';
import { TimeField } from '@/components/data-entry/TimeField';
import { useDateTimeValue, useValidation } from './DateTimeField.hooks';
import { TimeMode } from '@/types/time-component';
import {
  DateTimeComponentProps,
  DateTimeValidationError
} from '@/types/date-time-component';
import {
  filterTimeOptions,
  filterDateOptions
} from '@/utils/date-time-component';

export type DateTimeFieldProps<
  T extends AsType = 'div',
  Mode extends TimeMode = 'preset'
> = Omit<InputBaseProps<T>, 'defaultValue' | 'onChange'> &
  DateTimeComponentProps<Mode> & {
    placeholder?: string;
    dateFormat?: string;
    timeFormat?: string;
    onErrorStatus?: (
      error: boolean,
      errorReason?: DateTimeValidationError
    ) => void;
  };

const DateTimeField = forwardRef(
  <T extends AsType = 'div', Mode extends TimeMode = 'preset'>(
    props: DateTimeFieldProps<T, Mode>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      defaultValue,
      value,
      onChange,
      locale,
      options,
      timeMode,
      timeStep,
      minTime,
      maxTime,
      disabledTimes,
      minDate,
      maxDate,
      disabledDates,
      readOnly,
      disabled,
      placeholder,
      dateFormat,
      timeFormat,
      onErrorStatus,
      color,
      focusedColor,
      onClick,
      className,
      ...rest
    } = props;
    const inputBaseElRef = useRef<HTMLElement>(null);
    const { dateTimeValue, handleDateChange, handleTimeChange } =
      useDateTimeValue({ defaultValue, value, onChange });
    const {
      isValidationError,
      onDateFieldErrorStatus,
      onTimeFieldErrorStatus
    } = useValidation({ onErrorStatus });
    const noValue = dateTimeValue === null;

    const commonProps = {
      value: dateTimeValue,
      locale,
      readOnly,
      disabled,
      disableHoverEffect: true,
      disableFocusEffect: true
    };
    const dateFieldProps = {
      ...commonProps,
      onChange: handleDateChange,
      options: filterDateOptions(options),
      minDate,
      maxDate,
      disabledDates,
      format: dateFormat,
      onErrorStatus: onDateFieldErrorStatus
    };
    const timeFieldProps = {
      ...commonProps,
      onChange: handleTimeChange,
      options: filterTimeOptions(options),
      mode: timeMode,
      timeStep,
      minTime,
      maxTime,
      disabledTimes,
      format: timeFormat,
      onErrorStatus: onTimeFieldErrorStatus
    };

    const handleClick = (event: MouseEvent) => {
      onClick?.(event);
      const inputBaseEl = inputBaseElRef.current;
      if (!inputBaseEl || inputBaseEl.matches(':focus-within')) return;
      const datePartsEl = inputBaseEl.querySelectorAll<HTMLElement>(
        '.JinniDateFieldDatePart:not(.literal-type)'
      );
      datePartsEl[0]?.focus();
    };

    return (
      <InputBase
        ref={(element: HTMLElement | null) => {
          if (element) {
            (inputBaseElRef as MutableRefObject<HTMLElement>).current = element;
            if (typeof ref === 'function') {
              ref(element);
            } else if (ref && 'current' in ref) {
              (ref as MutableRefObject<HTMLElement>).current = element;
            }
          }
        }}
        className={cn('JinniDateTimeField', { noValue }, className)}
        color={isValidationError ? 'error' : color}
        focusedColor={isValidationError ? 'error' : focusedColor}
        disabled={disabled}
        onClick={handleClick}
        {...rest}
      >
        <DateField {...dateFieldProps} />
        <TimeField {...timeFieldProps} />
        <span className="JinniDateTimeFieldPlaceholder">{placeholder}</span>
      </InputBase>
    );
  }
);

export default DateTimeField;
