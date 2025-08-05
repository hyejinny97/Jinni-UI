import './DateTimeField.scss';
import { forwardRef } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { InputBase, InputBaseProps } from '@/components/data-entry/InputBase';
import { DateField } from '@/components/data-entry/DateField';
import {
  DateTimeValidationError,
  DateTimeOptions
} from './DateTimeField.types';
import {
  TimeField,
  TimeMode,
  TimeStepManualType
} from '@/components/data-entry/TimeField';
import { useDateTimeValue, useFocus } from './DateTimeField.hooks';
import { filterDateOptions, filterTimeOptions } from './DateTimeField.utils';

export type DateTimeFieldProps<
  T extends AsType = 'div',
  Mode extends TimeMode = 'preset'
> = Omit<InputBaseProps<T>, 'defaultValue' | 'onChange'> & {
  placeholder?: string;
  defaultValue?: Date;
  value?: Date | null;
  onChange?: (value: Date, validationError?: DateTimeValidationError) => void;
  locale?: string;
  options?: DateTimeOptions;
  dateFormat?: string;
  timeFormat?: string;
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
};

const DateTimeField = forwardRef(
  <T extends AsType = 'div', Mode extends TimeMode = 'preset'>(
    props: DateTimeFieldProps<T, Mode>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      placeholder,
      defaultValue,
      value,
      onChange,
      locale,
      options,
      dateFormat,
      timeFormat,
      minTime,
      maxTime,
      disabledTimes,
      timeMode,
      timeStep,
      minDate,
      maxDate,
      disabledDates,
      readOnly,
      disabled,
      color,
      focusedColor,
      focused,
      className,
      ...rest
    } = props;
    const { isFocused, focus, blur } = useFocus({ focused });
    const {
      dateTimeValue,
      handleDateChange,
      handleTimeChange,
      isValidationError,
      handleValidationError
    } = useDateTimeValue({ defaultValue, value, onChange });
    const showPlaceholder = !isFocused && dateTimeValue === null;

    const commonProps = {
      value: dateTimeValue,
      onErrorStatus: handleValidationError,
      locale,
      readOnly,
      disabled,
      disableHoverEffect: true,
      disableFocusEffect: true
    };

    return (
      <InputBase
        ref={ref}
        id="DateTimeField"
        className={cn('JinniDateTimeField', className)}
        onFocus={focus}
        onBlur={(e: FocusEvent) => {
          const relatedTarget = e.relatedTarget as HTMLElement;
          const currentTarget = e.currentTarget as HTMLElement;
          if (!currentTarget?.contains(relatedTarget)) blur();
        }}
        color={isValidationError ? 'error' : color}
        focusedColor={isValidationError ? 'error' : focusedColor}
        disabled={disabled}
        focused={isFocused}
        {...rest}
      >
        {showPlaceholder ? (
          <span className="JinniDateTimeFieldPlaceholder">{placeholder}</span>
        ) : (
          <>
            <DateField
              {...commonProps}
              onChange={handleDateChange}
              options={filterDateOptions(options)}
              format={dateFormat}
              minDate={minDate}
              maxDate={maxDate}
              disabledDates={disabledDates}
              focused={isFocused}
            />
            <TimeField
              {...commonProps}
              onChange={handleTimeChange}
              options={filterTimeOptions(options)}
              format={timeFormat}
              mode={timeMode}
              minTime={minTime}
              maxTime={maxTime}
              disabledTimes={disabledTimes}
              timeStep={timeStep}
              focused={isFocused}
            />
          </>
        )}
      </InputBase>
    );
  }
);

export default DateTimeField;
