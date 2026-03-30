import './DateRangeField.scss';
import { forwardRef } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { InputBase, InputBaseProps } from '@/components/data-entry/InputBase';
import { DateField } from '@/components/data-entry/DateField';
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
  RangeFieldType
} from '@/types/date-component';

export type DateRangeFieldProps<T extends AsType = 'div'> = Omit<
  InputBaseProps<T>,
  'defaultValue' | 'onChange' | 'startAdornment' | 'endAdornment' | 'disabled'
> &
  DateRangeComponentProps & {
    placeholder?: RangeType<string>;
    format?: string;
    startAdornment?: RangeAdornmentType<React.ReactNode>;
    endAdornment?: RangeAdornmentType<React.ReactNode>;
    centerIcon?: React.ReactNode;
    focusedField?: RangeFieldType;
  };

const DateRangeField = forwardRef(
  <T extends AsType = 'div'>(
    props: DateRangeFieldProps<T>,
    ref: React.Ref<HTMLElement>
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
    const {
      isValidationError,
      onStartFieldErrorStatus,
      onEndFieldErrorStatus
    } = useValidation({
      locale,
      options,
      disabledDates,
      dateRangeValue
    });
    const { indicatorElRef, startFieldElRef, endFieldElRef } = useIndicator({
      focusedField
    });

    const getCommonProps = (rangeField: RangeFieldType) => ({
      value: dateRangeValue[rangeField],
      onChange: handleChange(rangeField),
      locale,
      options,
      minDate,
      maxDate,
      disabledDates,
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
        color={isValidationError ? 'error' : color}
        focusedColor={isValidationError ? 'error' : focusedColor}
        size={size}
        fullWidth={fullWidth}
        style={{
          '--indicator-color': isValidationError ? 'error' : focusedColor,
          ...style
        }}
        {...rest}
      >
        <DateField ref={startFieldElRef} {...getCommonProps('start')} />
        {centerIcon}
        <DateField ref={endFieldElRef} {...getCommonProps('end')} />
        {!!focusedField && (
          <div ref={indicatorElRef} className="JinniDateRangeFieldIndicator" />
        )}
      </InputBase>
    );
  }
);

export default DateRangeField;
