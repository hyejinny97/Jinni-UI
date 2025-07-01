import './TimeField.scss';
import cn from 'classnames';
import { useState } from 'react';
import { AsType } from '@/types/default-component-props';
import { InputBase, InputBaseProps } from '@/components/data-entry/InputBase';
import { useTimeValue, useTimeFormat, useInput } from './TimeField.hooks';
import AutoWidthInput from './AutoWidthInput';
import {
  ValidationError,
  KeyTimePartType,
  TimeStepManualType
} from './TimeField.types';
import { KEY_TIME_PARTS } from './TimeField.constants';

export type TimeFieldProps<
  T extends AsType = 'div',
  Mode extends 'preset' | 'manual' = 'preset'
> = Omit<InputBaseProps<T>, 'defaultValue' | 'onChange'> & {
  placeholder?: string;
  defaultValue?: Date;
  value?: Date;
  onChange?: (value: Date, validationError?: ValidationError) => void;
  locale?: string;
  options?:
    | {
        timeStyle: 'short' | 'medium';
      }
    | {
        hour?: 'numeric' | '2-digit';
        minute?: 'numeric' | '2-digit';
        second?: 'numeric' | '2-digit';
        hour12?: boolean;
        hourCycle?: 'h11' | 'h12' | 'h23' | 'h24';
      };
  format?: string;
  minTime?: Date;
  maxTime?: Date;
  disabledTimes?: Array<Date>;
  mode?: Mode;
  timeStep?: Mode extends 'preset' ? number : TimeStepManualType;
  readOnly?: boolean;
  disabled?: boolean;
};

const TIME_STEP_PRESET_DEFAULT: number = 1;
const TIME_STEP_MANUAL_DEFAULT: TimeStepManualType = {
  hour: 1,
  minute: 1,
  second: 1
};

const TimeField = <
  T extends AsType = 'div',
  Mode extends 'preset' | 'manual' = 'preset'
>(
  props: TimeFieldProps<T, Mode>
) => {
  const {
    placeholder = '',
    defaultValue,
    value,
    onChange,
    locale,
    options = {
      timeStyle: 'short'
    },
    format,
    minTime,
    maxTime,
    disabledTimes,
    mode = 'preset' as Mode,
    timeStep = mode === 'preset'
      ? TIME_STEP_PRESET_DEFAULT
      : TIME_STEP_MANUAL_DEFAULT,
    readOnly = false,
    disabled = false,
    color,
    className,
    ...rest
  } = props;
  const [focused, setFocused] = useState<boolean>(false);
  const {
    localeHourValues,
    localeSecondValues,
    localeMinuteValues,
    localeDayPeriodValues,
    timeParts,
    dateToTimeObject,
    timeObjectToDate
  } = useTimeFormat({
    locale,
    options,
    format
  });
  const { time, handleTimeChange, isValidationError } = useTimeValue({
    defaultValue,
    value,
    minTime,
    maxTime,
    disabledTimes,
    mode,
    timeStep,
    onChange,
    dateToTimeObject,
    timeObjectToDate
  });
  const { timePartsElRef, handleInputChange } = useInput({
    localeHourValues,
    localeSecondValues,
    localeMinuteValues,
    localeDayPeriodValues,
    handleTimeChange
  });
  const isKeyTimePart = (
    type: keyof Intl.DateTimeFormatPartTypesRegistry
  ): type is KeyTimePartType => KEY_TIME_PARTS.some((part) => part === type);
  const hasValue = Object.values(time).some((val) => val !== undefined);
  const showPlaceholder = !hasValue && !focused;

  return (
    <InputBase
      className={cn('JinniTimeField', { isValidationError }, className)}
      onFocus={() => setFocused(true)}
      onBlur={(e: FocusEvent) => {
        const relatedTarget = e.relatedTarget as HTMLElement;
        const currentTarget = e.currentTarget as HTMLElement;
        if (!currentTarget?.contains(relatedTarget)) setFocused(false);
      }}
      color={isValidationError ? 'error' : color}
      disabled={disabled}
      {...rest}
    >
      {showPlaceholder ? (
        <span className="JinniTimeFieldPlaceholder">{placeholder}</span>
      ) : (
        timeParts.map((part, idx) => {
          const hasBlank = part.type === 'literal' && part.value.includes(' ');
          return isKeyTimePart(part.type) ? (
            <AutoWidthInput
              key={part.type}
              ref={(element) => {
                if (element && !timePartsElRef.current.includes(element)) {
                  timePartsElRef.current.push(element);
                }
              }}
              className="JinniTimeFieldTimePart"
              value={time[part.type] || part.value}
              onChange={handleInputChange(part.type as KeyTimePartType)}
              readOnly={readOnly}
              disabled={disabled}
            />
          ) : (
            <div key={idx} className="JinniTimeFieldTimePart">
              {hasBlank ? part.value.replace(' ', '\u00A0') : part.value}
            </div>
          );
        })
      )}
    </InputBase>
  );
};

export default TimeField;
