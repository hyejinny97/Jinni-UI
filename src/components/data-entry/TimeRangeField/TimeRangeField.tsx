import './TimeRangeField.scss';
import { forwardRef } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { InputBase, InputBaseProps } from '@/components/data-entry/InputBase';
import { TimeField } from '@/components/data-entry/TimeField';
import { ArrowRightAltIcon } from '@/components/icons/ArrowRightAltIcon';
import {
  useTimeRangeValue,
  useValidation,
  useIndicator
} from './TimeRangeField.hooks';
import {
  TIME_STEP_PRESET_DEFAULT,
  TIME_STEP_MANUAL_DEFAULT
} from './TimeRangeField.constants';
import {
  TimeMode,
  TimeRangeComponentProps,
  RangeType,
  RangeAdornmentType,
  RangeFieldType
} from '@/types/time-component';
import { DEFAULT_TIME_OPTIONS } from '@/constants/time-component';

export type TimeRangeFieldProps<
  T extends AsType = 'div',
  Mode extends TimeMode = 'preset'
> = Omit<
  InputBaseProps<T>,
  'defaultValue' | 'onChange' | 'startAdornment' | 'endAdornment' | 'disabled'
> &
  TimeRangeComponentProps<Mode> & {
    placeholder?: RangeType<string>;
    format?: string;
    startAdornment?: RangeAdornmentType<React.ReactNode>;
    endAdornment?: RangeAdornmentType<React.ReactNode>;
    centerIcon?: React.ReactNode;
    focusedField?: RangeFieldType;
  };

const TimeRangeField = forwardRef(
  <T extends AsType = 'div', Mode extends TimeMode = 'preset'>(
    props: TimeRangeFieldProps<T, Mode>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      mode = 'preset' as Mode,
      defaultValue,
      value,
      onChange,
      locale,
      options = DEFAULT_TIME_OPTIONS,
      minTime,
      maxTime,
      disabledTimes,
      timeStep = (mode === 'preset'
        ? TIME_STEP_PRESET_DEFAULT
        : TIME_STEP_MANUAL_DEFAULT) as TimeRangeComponentProps<Mode>['timeStep'],
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
      focusedColor,
      size,
      fullWidth,
      className,
      style,
      ...rest
    } = props;
    const { timeRangeValue, handleChange } = useTimeRangeValue({
      defaultValue,
      value,
      onChange
    });
    const { isValidationError, handleErrorStatus } = useValidation({
      locale,
      options,
      timeRangeValue
    });
    const { indicatorElRef, startFieldElRef, endFieldElRef } = useIndicator({
      focusedField
    });

    const getCommonProps = (rangeField: RangeFieldType) => ({
      mode,
      value: timeRangeValue[rangeField],
      onChange: handleChange(rangeField),
      locale,
      options,
      minTime: minTime?.[rangeField],
      maxTime: maxTime?.[rangeField],
      disabledTimes: disabledTimes?.[rangeField],
      timeStep,
      readOnly: readOnly?.[rangeField],
      disabled: disabled?.[rangeField],
      placeholder: placeholder?.[rangeField],
      format,
      startAdornment: startAdornment?.[rangeField],
      endAdornment: endAdornment?.[rangeField],
      size,
      fullWidth,
      disableHoverEffect: true,
      disableFocusEffect: true,
      onErrorStatus: handleErrorStatus(rangeField)
    });

    return (
      <InputBase
        ref={ref}
        className={cn('JinniTimeRangeField', className)}
        disabled={disabled?.start && disabled?.end}
        startAdornment={startAdornment?.timeRangeField}
        endAdornment={endAdornment?.timeRangeField}
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
        <TimeField ref={startFieldElRef} {...getCommonProps('start')} />
        {centerIcon}
        <TimeField ref={endFieldElRef} {...getCommonProps('end')} />
        {!!focusedField && (
          <div ref={indicatorElRef} className="JinniTimeRangeFieldIndicator" />
        )}
      </InputBase>
    );
  }
);

export default TimeRangeField;
