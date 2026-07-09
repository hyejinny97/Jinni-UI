'use client';

import './DateRangeField.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import InputBase, { InputBaseProps } from '@/components/InputBase';
import DateField, { DateFieldProps } from '@/components/DateField';
import {
  useDateRangeValue,
  useValidation,
  useIndicator
} from './DateRangeField.hooks';
import { ArrowRightAltIcon } from '@/components/icons/ArrowRightAltIcon';
import {
  DateRangeComponentProps,
  RangeType,
  RangeAdornmentType,
  RangeFieldType,
  RangeDisabledDatesFnType
} from '@/types/date-component';
import { ColorType } from '@/types/color';

export type DateRangeFieldProps<T extends AsType = 'div'> = Omit<
  InputBaseProps<T>,
  | 'defaultValue'
  | 'onChange'
  | 'startAdornment'
  | 'endAdornment'
  | 'disabled'
  | 'children'
> &
  DateRangeComponentProps & {
    placeholder?: RangeType<string>;
    format?: string;
    startAdornment?: RangeAdornmentType<React.ReactNode>;
    endAdornment?: RangeAdornmentType<React.ReactNode>;
    centerIcon?: React.ReactNode;
    focusedField?: RangeFieldType;
    disabledDates?: Array<Date> | RangeDisabledDatesFnType;
  };

const DateRangeField = <T extends AsType = 'div'>({
  ref,
  ...props
}: DateRangeFieldProps<T>) => {
  const {
    defaultValue,
    value,
    onChange,
    locale,
    options,
    disabledDates,
    readOnly,
    disabled,
    placeholder,
    format,
    startAdornment,
    endAdornment,
    centerIcon = (
      <ArrowRightAltIcon color="gray-500" style={{ minWidth: '24px' }} />
    ),
    focusedField,
    color,
    focusedColor = 'primary',
    size,
    fullWidth,
    className,
    style,
    ...rest
  } = props;
  const { dateRangeValue, handleChange } = useDateRangeValue({
    defaultValue,
    value,
    onChange
  });
  const { isValidationError, onStartFieldErrorStatus, onEndFieldErrorStatus } =
    useValidation({
      locale,
      options,
      dateRangeValue
    });
  const { indicatorElRef, startFieldElRef, endFieldElRef } = useIndicator({
    focusedField
  });

  const getCommonProps = (
    rangeField: RangeFieldType
  ): DateFieldProps<'div'> => ({
    value: dateRangeValue[rangeField],
    onChange: handleChange(rangeField),
    locale,
    options,
    disabledDates:
      !disabledDates || Array.isArray(disabledDates)
        ? disabledDates
        : ({ date }) => disabledDates({ date, rangeField }),
    readOnly,
    disabled,
    placeholder: placeholder?.[rangeField],
    format,
    startAdornment: startAdornment?.[rangeField],
    endAdornment: endAdornment?.[rangeField],
    size,
    fullWidth,
    disableHoverEffect: true,
    disableFocusEffect: true,
    onErrorStatus:
      rangeField === 'start' ? onStartFieldErrorStatus : onEndFieldErrorStatus
  });

  return (
    <InputBase
      ref={ref}
      className={cn('JinniDateRangeField', className)}
      disabled={disabled}
      startAdornment={startAdornment?.dateRangeField}
      endAdornment={endAdornment?.dateRangeField}
      color={isValidationError ? ('error' as ColorType) : color}
      focusedColor={isValidationError ? ('error' as ColorType) : focusedColor}
      size={size}
      fullWidth={fullWidth}
      style={{
        '--indicator-color': isValidationError ? 'error' : focusedColor,
        ...style
      }}
      {...(rest as Record<string, unknown>)}
    >
      <DateField ref={startFieldElRef} {...getCommonProps('start')} />
      {centerIcon}
      <DateField ref={endFieldElRef} {...getCommonProps('end')} />
      {!!focusedField && (
        <div ref={indicatorElRef} className="JinniDateRangeFieldIndicator" />
      )}
    </InputBase>
  );
};

export default DateRangeField;
