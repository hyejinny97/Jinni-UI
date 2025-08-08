import './DateTimeRangeField.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { InputBase, InputBaseProps } from '@/components/data-entry/InputBase';
import {
  RangeType,
  AdornmentType,
  DateTimeRangeValidationError
} from './DateTimeRangeField.types';
import {
  DateTimeField,
  DateTimeOptions,
  DateTimeValidationError
} from '@/components/data-entry/DateTimeField';
import {
  TimeMode,
  TimeStepManualType
} from '@/components/data-entry/TimeField';
import { ArrowRightAltIcon } from '@/components/icons/ArrowRightAltIcon';
import {
  useDateTimeRangeValue,
  useIndicator
} from './DateTimeRangeField.hooks';
import {
  CHRONOLOGICAL_ORDER,
  INCLUDE_DISABLED_DATE
} from './DateTimeRangeField.constants';

export type DateTimeRangeFieldProps<
  T extends AsType = 'div',
  Mode extends TimeMode = 'preset'
> = Omit<
  InputBaseProps<T>,
  'defaultValue' | 'onChange' | 'startAdornment' | 'endAdornment'
> & {
  placeholder?: Partial<RangeType<string>>;
  defaultValue?: Partial<RangeType<Date>>;
  value?: RangeType<Date | null>;
  onChange?: (
    value: RangeType<Date | null>,
    validationError?: DateTimeRangeValidationError
  ) => void;
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
  startAdornment?: AdornmentType<React.ReactNode>;
  endAdornment?: AdornmentType<React.ReactNode>;
  centerIcon?: React.ReactNode;
  focusedDateTime?: 'start' | 'end';
};

const DateTimeRangeField = <T extends AsType = 'div'>(
  props: DateTimeRangeFieldProps<T>
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
    startAdornment,
    endAdornment,
    centerIcon = (
      <ArrowRightAltIcon color="gray-500" style={{ minWidth: '24px' }} />
    ),
    color,
    focusedColor,
    focused,
    size,
    fullWidth,
    focusedDateTime,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const {
    dateTimeRangeValue,
    handleChange,
    dateTimeRangeValidationError,
    handleValidationError
  } = useDateTimeRangeValue({
    defaultValue,
    value,
    onChange,
    locale,
    options,
    disabledDates
  });
  const { indicatorElRef, startDateTimeFieldElRef, endDateTimeFieldElRef } =
    useIndicator({ focusedDateTime });
  const isValidationError =
    dateTimeRangeValidationError[CHRONOLOGICAL_ORDER] ||
    dateTimeRangeValidationError[INCLUDE_DISABLED_DATE] ||
    dateTimeRangeValidationError.start ||
    dateTimeRangeValidationError.end;

  const getCommonProps = (dateTimeFieldPosition: keyof RangeType<any>) => ({
    value: dateTimeRangeValue[dateTimeFieldPosition],
    onChange: handleChange(dateTimeFieldPosition),
    placeholder: placeholder?.[dateTimeFieldPosition],
    disableHoverEffect: true,
    disableFocusEffect: true,
    locale,
    options,
    timeFormat,
    dateFormat,
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
    startAdornment: startAdornment?.[dateTimeFieldPosition],
    endAdornment: endAdornment?.[dateTimeFieldPosition],
    onErrorStatus: (validationError?: DateTimeValidationError) => {
      handleValidationError(dateTimeFieldPosition, validationError);
    },
    size,
    fullWidth
  });

  return (
    <InputBase
      id="DateTimeRangeField"
      className={cn('JinniDateTimeRangeField', className)}
      color={isValidationError ? 'error' : color}
      focusedColor={isValidationError ? 'error' : focusedColor}
      startAdornment={startAdornment?.dateTimeRangeField}
      endAdornment={endAdornment?.dateTimeRangeField}
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
      <DateTimeField
        ref={startDateTimeFieldElRef}
        {...getCommonProps('start')}
      />
      {centerIcon}
      <DateTimeField ref={endDateTimeFieldElRef} {...getCommonProps('end')} />
      {!!focusedDateTime && (
        <div
          ref={indicatorElRef}
          className={cn('JinniDateTimeRangeFieldIndicator')}
        />
      )}
    </InputBase>
  );
};

export default DateTimeRangeField;
