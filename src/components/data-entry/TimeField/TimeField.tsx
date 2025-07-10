import './TimeField.scss';
import { forwardRef } from 'react';
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
import { TimeOptions } from './TimeField.types';

export type TimeMode = 'preset' | 'manual';
export type TimeFieldProps<
  T extends AsType = 'div',
  Mode extends TimeMode = 'preset'
> = Omit<InputBaseProps<T>, 'defaultValue' | 'onChange'> & {
  placeholder?: string;
  defaultValue?: Date;
  value?: Date | null;
  onChange?: (value: Date, validationError?: ValidationError) => void;
  onError?: (validationError: ValidationError) => void;
  locale?: string;
  options?: TimeOptions;
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
export const DEFAULT_TIME_OPTIONS: TimeOptions = {
  timeStyle: 'short'
};

const TimeField = forwardRef(
  <T extends AsType = 'div', Mode extends TimeMode = 'preset'>(
    props: TimeFieldProps<T, Mode>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      placeholder = '',
      defaultValue,
      value,
      onChange,
      onError,
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
      timeObjectToDate,
      onError
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
        ref={ref}
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
            const hasBlank =
              part.type === 'literal' && part.value.includes(' ');
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
  }
);

export default TimeField;
