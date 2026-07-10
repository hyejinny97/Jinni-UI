'use client';

import './DateTimeField.scss';
import { useRef } from 'react';
import cn from 'classnames';
import InputBase, { InputBaseProps } from '@/components/InputBase';
import DateField from '@/components/DateField';
import TimeField from '@/components/TimeField';
import {
  useDateTimeValue,
  useFocus,
  useValidation
} from './DateTimeField.hooks';
import { TimeMode } from '@/types/time-component';
import {
  DateTimeComponentProps,
  DateTimeValidationError,
  DisabledDateTimesFnType
} from '@/types/date-time-component';
import {
  filterTimeOptions,
  filterDateOptions
} from '@/utils/date-time-component';
import { mergeRefs } from '@/utils/mergeRefs';
import { ColorType } from '@/types/color';

export type DateTimeFieldProps<Mode extends TimeMode = 'preset'> = Omit<
  InputBaseProps,
  'defaultValue' | 'onChange'
> &
  DateTimeComponentProps<Mode> & {
    placeholder?: string;
    dateFormat?: string;
    timeFormat?: string;
    onErrorStatus?: (
      error: boolean,
      errorReason?: DateTimeValidationError[]
    ) => void;
    disabledDateTimes?: Array<Date> | DisabledDateTimesFnType;
  };

const DateTimeField = <Mode extends TimeMode = 'preset'>({
  ref,
  ...props
}: DateTimeFieldProps<Mode>) => {
  const {
    defaultValue,
    value,
    onChange,
    locale,
    options,
    timeMode,
    timeStep,
    disabledDateTimes,
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
  const { isValidationError, onTimeFieldErrorStatus } = useValidation({
    dateTimeValue,
    disabledDateTimes,
    onErrorStatus
  });
  const {
    dateFieldElRef,
    timeFieldElRef,
    focusFirstPartInTimeField,
    focusLastPartInDateField
  } = useFocus();
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
    ref: dateFieldElRef,
    onChange: handleDateChange,
    options: filterDateOptions(options),
    format: dateFormat,
    onArrowRightFromLastPart: focusFirstPartInTimeField
  };
  const timeFieldProps = {
    ...commonProps,
    ref: timeFieldElRef,
    onChange: handleTimeChange,
    options: filterTimeOptions(options),
    mode: timeMode,
    timeStep,
    format: timeFormat,
    onErrorStatus: onTimeFieldErrorStatus,
    onArrowLeftFromFirstPart: focusLastPartInDateField
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
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
      ref={mergeRefs(ref, inputBaseElRef)}
      className={cn('JinniDateTimeField', { noValue }, className)}
      color={isValidationError ? ('error' as ColorType) : color}
      focusedColor={isValidationError ? ('error' as ColorType) : focusedColor}
      disabled={disabled}
      onClick={handleClick}
      {...rest}
    >
      <DateField {...dateFieldProps} />
      <TimeField {...timeFieldProps} />
      <span className="JinniDateTimeFieldPlaceholder">{placeholder}</span>
    </InputBase>
  );
};

export default DateTimeField;
