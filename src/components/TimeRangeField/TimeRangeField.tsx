'use client';

import './TimeRangeField.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import InputBase, { InputBaseProps } from '@/components/InputBase';
import TimeField, { TimeFieldProps } from '@/components/TimeField';
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
  RangeFieldType,
  RangeDisabledTimesFnType
} from '@/types/time-component';
import { DEFAULT_TIME_OPTIONS } from '@/constants/time-component';
import { ColorType } from '@/types/color';

export type TimeRangeFieldProps<
  T extends AsType = 'div',
  Mode extends TimeMode = 'preset'
> = Omit<
  InputBaseProps<T>,
  | 'defaultValue'
  | 'onChange'
  | 'startAdornment'
  | 'endAdornment'
  | 'disabled'
  | 'children'
> &
  TimeRangeComponentProps<Mode> & {
    placeholder?: RangeType<string>;
    format?: string;
    startAdornment?: RangeAdornmentType<React.ReactNode>;
    endAdornment?: RangeAdornmentType<React.ReactNode>;
    centerIcon?: React.ReactNode;
    focusedField?: RangeFieldType;
    disabledTimes?: Array<Date> | RangeDisabledTimesFnType;
  };

const TimeRangeField = <
  T extends AsType = 'div',
  Mode extends TimeMode = 'preset'
>({
  ref,
  ...props
}: TimeRangeFieldProps<T, Mode>) => {
  const {
    mode = 'preset' as Mode,
    defaultValue,
    value,
    onChange,
    locale,
    options = DEFAULT_TIME_OPTIONS,
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
    focusedColor = 'primary',
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
  const { isValidationError, onStartFieldErrorStatus, onEndFieldErrorStatus } =
    useValidation({
      locale,
      options,
      timeRangeValue
    });
  const { indicatorElRef, startFieldElRef, endFieldElRef } = useIndicator({
    focusedField
  });

  const getCommonProps = (
    rangeField: RangeFieldType
  ): TimeFieldProps<'div'> => ({
    mode,
    value: timeRangeValue[rangeField],
    onChange: handleChange(rangeField),
    locale,
    options,
    disabledTimes:
      disabledTimes && !Array.isArray(disabledTimes)
        ? ({ time }: { time: Date }) => disabledTimes({ time, rangeField })
        : disabledTimes,
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
    onErrorStatus:
      rangeField === 'start' ? onStartFieldErrorStatus : onEndFieldErrorStatus
  });

  return (
    <InputBase
      ref={ref}
      className={cn('JinniTimeRangeField', className)}
      disabled={disabled?.start && disabled?.end}
      startAdornment={startAdornment?.timeRangeField}
      endAdornment={endAdornment?.timeRangeField}
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
      <TimeField ref={startFieldElRef} {...getCommonProps('start')} />
      {centerIcon}
      <TimeField ref={endFieldElRef} {...getCommonProps('end')} />
      {!!focusedField && (
        <div ref={indicatorElRef} className="JinniTimeRangeFieldIndicator" />
      )}
    </InputBase>
  );
};

export default TimeRangeField;
