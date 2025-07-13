import './TimeRangeField.scss';
import { forwardRef } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { InputBase, InputBaseProps } from '@/components/data-entry/InputBase';
import {
  TimeField,
  TimeStepManualType,
  TimeOptions,
  TimeMode,
  ValidationError,
  DEFAULT_TIME_OPTIONS
} from '@/components/data-entry/TimeField';
import {
  RangeType,
  AdornmentType,
  TimeRangeValidationError
} from './TimeRangeField.types';
import { ArrowRightAltIcon } from '@/components/icons/ArrowRightAltIcon';
import { useTimeRange, useIndicator } from './TimeRangeField.hooks';
import { CHRONOLOGICAL_ORDER } from './TimeRangeField.constants';

export type TimeRangeFieldProps<
  T extends AsType = 'div',
  Mode extends TimeMode = 'preset'
> = Omit<
  InputBaseProps<T>,
  'defaultValue' | 'onChange' | 'startAdornment' | 'endAdornment' | 'disabled'
> & {
  placeholder?: RangeType<string>;
  defaultValue?: RangeType<Date>;
  value?: RangeType<Date | null>;
  onChange?: (
    value: RangeType<Date | null>,
    validationError?: TimeRangeValidationError
  ) => void;
  locale?: string;
  options?: TimeOptions;
  format?: string;
  minTime?: RangeType<Date>;
  maxTime?: RangeType<Date>;
  disabledTimes?: RangeType<Array<Date>>;
  mode?: Mode;
  timeStep?: Mode extends 'preset' ? number : TimeStepManualType;
  readOnly?: RangeType<boolean>;
  disabled?: RangeType<boolean>;
  startAdornment?: AdornmentType<React.ReactNode>;
  endAdornment?: AdornmentType<React.ReactNode>;
  centerIcon?: React.ReactNode;
  focusedTime?: 'start' | 'end';
};

const TIME_STEP_PRESET_DEFAULT: number = 1;
const TIME_STEP_MANUAL_DEFAULT: TimeStepManualType = {
  hour: 1,
  minute: 1,
  second: 1
};
const DEFAULT_READONLY: RangeType<boolean> = { start: false, end: false };
const DEFAULT_DISABLED: RangeType<boolean> = { start: false, end: false };

const TimeRangeField = forwardRef(
  <T extends AsType = 'div', Mode extends TimeMode = 'preset'>(
    props: TimeRangeFieldProps<T, Mode>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      className,
      placeholder,
      defaultValue,
      value,
      onChange,
      locale,
      options = DEFAULT_TIME_OPTIONS,
      format,
      minTime,
      maxTime,
      disabledTimes,
      mode = 'preset' as Mode,
      timeStep = mode === 'preset'
        ? TIME_STEP_PRESET_DEFAULT
        : TIME_STEP_MANUAL_DEFAULT,
      readOnly = DEFAULT_READONLY,
      disabled = DEFAULT_DISABLED,
      startAdornment,
      endAdornment,
      centerIcon = (
        <ArrowRightAltIcon color="gray-500" style={{ minWidth: '24px' }} />
      ),
      color = 'gray-400',
      focusedColor = 'primary',
      size,
      fullWidth,
      focusedTime,
      style,
      ...rest
    } = props;
    const {
      timeRange,
      handleChange,
      timeRangeValidationError,
      handleValidationError
    } = useTimeRange({
      defaultValue,
      value,
      onChange,
      locale,
      options
    });
    const { indicatorElRef, startTimeFieldElRef, endTimeFieldElRef } =
      useIndicator({ focusedTime });
    const isValidationError =
      timeRangeValidationError[CHRONOLOGICAL_ORDER] ||
      timeRangeValidationError.start ||
      timeRangeValidationError.end;

    const getCommonProps = (timeFieldPosition: keyof RangeType<any>) => ({
      value: timeRange?.[timeFieldPosition],
      onChange: handleChange(timeFieldPosition),
      placeholder: placeholder?.[timeFieldPosition],
      disableHoverEffect: true,
      disableFocusEffect: true,
      locale,
      options,
      format,
      minTime: minTime?.[timeFieldPosition],
      maxTime: maxTime?.[timeFieldPosition],
      disabledTimes: disabledTimes?.[timeFieldPosition],
      mode,
      timeStep,
      readOnly: readOnly?.[timeFieldPosition],
      disabled: disabled?.[timeFieldPosition],
      startAdornment: startAdornment?.[timeFieldPosition],
      endAdornment: endAdornment?.[timeFieldPosition],
      onErrorStatus: (validationError?: ValidationError) =>
        handleValidationError(timeFieldPosition, validationError),
      size,
      fullWidth
    });

    return (
      <InputBase
        ref={ref}
        id="TimeRangeField"
        className={cn('JinniTimeRangeField', className)}
        color={isValidationError ? 'error' : color}
        focusedColor={isValidationError ? 'error' : focusedColor}
        startAdornment={startAdornment?.timeRangeField}
        endAdornment={endAdornment?.timeRangeField}
        size={size}
        disabled={disabled.start && disabled.end}
        fullWidth={fullWidth}
        style={{
          '--indicator-color': isValidationError ? 'error' : focusedColor,
          ...style
        }}
        {...rest}
      >
        <TimeField ref={startTimeFieldElRef} {...getCommonProps('start')} />
        {centerIcon}
        <TimeField ref={endTimeFieldElRef} {...getCommonProps('end')} />
        {!!focusedTime && (
          <div
            ref={indicatorElRef}
            className={cn('JinniTimeRangeFieldIndicator')}
          />
        )}
      </InputBase>
    );
  }
);

export default TimeRangeField;
