import './DateRangeField.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { InputBase, InputBaseProps } from '@/components/data-entry/InputBase';
import {
  DateField,
  DateOptions,
  ValidationError
} from '@/components/data-entry/DateField';
import {
  RangeType,
  AdornmentType,
  DateRangeValidationError
} from './DateRangeField.types';
import { useDateRange, useIndicator } from './DateRangeField.hooks';
import { ArrowRightAltIcon } from '@/components/icons/ArrowRightAltIcon';
import {
  CHRONOLOGICAL_ORDER,
  INCLUDE_DISABLED_DATE
} from './DateRangeField.constants';

export type DateRangeFieldProps<T extends AsType = 'div'> = Omit<
  InputBaseProps<T>,
  'defaultValue' | 'onChange' | 'startAdornment' | 'endAdornment'
> & {
  placeholder?: RangeType<string>;
  defaultValue?: RangeType<Date>;
  value?: Required<RangeType<Date | null>>;
  onChange?: (
    value: Required<RangeType<Date | null>>,
    validationError?: DateRangeValidationError
  ) => void;
  locale?: string;
  options?: DateOptions;
  format?: string;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Array<Date>;
  readOnly?: boolean;
  disabled?: boolean;
  startAdornment?: AdornmentType<React.ReactNode>;
  endAdornment?: AdornmentType<React.ReactNode>;
  centerIcon?: React.ReactNode;
  focusedDate?: 'start' | 'end';
};

const DateRangeField = <T extends AsType = 'div'>(
  props: DateRangeFieldProps<T>
) => {
  const {
    placeholder,
    defaultValue,
    value,
    onChange,
    locale,
    options,
    format,
    minDate,
    maxDate,
    disabledDates,
    readOnly,
    disabled,
    startAdornment,
    endAdornment,
    centerIcon = (
      <ArrowRightAltIcon color="gray-500" style={{ minWidth: '24px' }} />
    ),
    color = 'gray-400',
    focusedColor = 'primary',
    size,
    fullWidth,
    focusedDate,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const {
    dateRange,
    handleChange,
    dateRangeValidationError,
    handleValidationError
  } = useDateRange({
    defaultValue,
    value,
    onChange,
    locale,
    options,
    disabledDates
  });
  const { indicatorElRef, startDateFieldElRef, endDateFieldElRef } =
    useIndicator({ focusedDate });
  const isValidationError =
    dateRangeValidationError[CHRONOLOGICAL_ORDER] ||
    dateRangeValidationError[INCLUDE_DISABLED_DATE] ||
    dateRangeValidationError.start ||
    dateRangeValidationError.end;

  const getCommonProps = (dateFieldPosition: keyof RangeType<any>) => ({
    value: dateRange[dateFieldPosition],
    onChange: handleChange(dateFieldPosition),
    placeholder: placeholder?.[dateFieldPosition],
    disableHoverEffect: true,
    disableFocusEffect: true,
    locale,
    options,
    format,
    minDate,
    maxDate,
    disabledDates,
    readOnly,
    disabled,
    startAdornment: startAdornment?.[dateFieldPosition],
    endAdornment: endAdornment?.[dateFieldPosition],
    onErrorStatus: (validationError?: ValidationError) => {
      console.log('onErrorStatus 안 validationError: ', validationError);
      handleValidationError(dateFieldPosition, validationError);
    },
    size,
    fullWidth
  });

  return (
    <InputBase
      id="DateRangeField"
      className={cn('JinniDateRangeField', className)}
      color={isValidationError ? 'error' : color}
      focusedColor={isValidationError ? 'error' : focusedColor}
      startAdornment={startAdornment?.dateRangeField}
      endAdornment={endAdornment?.dateRangeField}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      readOnly={readOnly}
      style={{
        '--indicator-color': isValidationError ? 'error' : focusedColor,
        ...style
      }}
      {...rest}
    >
      <DateField ref={startDateFieldElRef} {...getCommonProps('start')} />
      {centerIcon}
      <DateField ref={endDateFieldElRef} {...getCommonProps('end')} />
      {!!focusedDate && (
        <div
          ref={indicatorElRef}
          className={cn('JinniDateRangeFieldIndicator')}
        />
      )}
    </InputBase>
  );
};

export default DateRangeField;
