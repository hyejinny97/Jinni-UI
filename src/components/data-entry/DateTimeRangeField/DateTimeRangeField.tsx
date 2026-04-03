import './DateTimeRangeField.scss';
import { forwardRef } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { InputBase, InputBaseProps } from '@/components/data-entry/InputBase';
import { DateTimeField } from '@/components/data-entry/DateTimeField';
import { ArrowRightAltIcon } from '@/components/icons/ArrowRightAltIcon';
import {
  useDateTimeRangeValue,
  useValidation,
  useIndicator
} from './DateTimeRangeField.hooks';
import { TimeMode } from '@/types/time-component';
import {
  DateTimeRangeComponent,
  RangeAdornmentType,
  RangeFieldType,
  RangeType
} from '@/types/date-time-component';

export type DateTimeRangeFieldProps<
  T extends AsType = 'div',
  Mode extends TimeMode = 'preset'
> = Omit<
  InputBaseProps<T>,
  'defaultValue' | 'onChange' | 'startAdornment' | 'endAdornment'
> &
  DateTimeRangeComponent<Mode> & {
    placeholder?: RangeType<string>;
    dateFormat?: string;
    timeFormat?: string;
    startAdornment?: RangeAdornmentType<React.ReactNode>;
    endAdornment?: RangeAdornmentType<React.ReactNode>;
    centerIcon?: React.ReactNode;
    focusedField?: RangeFieldType;
  };

const DateTimeRangeField = forwardRef(
  <T extends AsType = 'div', Mode extends TimeMode = 'preset'>(
    props: DateTimeRangeFieldProps<T, Mode>,
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
      startAdornment,
      endAdornment,
      centerIcon = (
        <ArrowRightAltIcon color="gray-500" style={{ minWidth: '24px' }} />
      ),
      focusedField,
      color = 'gray-400',
      focusedColor = 'primary',
      size,
      fullWidth,
      className,
      style,
      ...rest
    } = props;
    const { dateTimeRangeValue, handleChange } = useDateTimeRangeValue({
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
      dateTimeRangeValue
    });
    const { indicatorElRef, startFieldElRef, endFieldElRef } = useIndicator({
      focusedField
    });

    const getCommonProps = (rangeField: RangeFieldType) => ({
      value: dateTimeRangeValue[rangeField],
      onChange: handleChange(rangeField),
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
      placeholder: placeholder?.[rangeField],
      dateFormat,
      timeFormat,
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
        className={cn('JinniDateTimeRangeField', className)}
        disabled={disabled}
        startAdornment={startAdornment?.dateTimeRangeField}
        endAdornment={endAdornment?.dateTimeRangeField}
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
        <DateTimeField ref={startFieldElRef} {...getCommonProps('start')} />
        {centerIcon}
        <DateTimeField ref={endFieldElRef} {...getCommonProps('end')} />
        {!!focusedField && (
          <div
            ref={indicatorElRef}
            className="JinniDateTimeRangeFieldIndicator"
          />
        )}
      </InputBase>
    );
  }
);

export default DateTimeRangeField;
