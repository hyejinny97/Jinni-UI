import './TimeField.scss';
import { forwardRef } from 'react';
import cn from 'classnames';
import { useState } from 'react';
import { AsType } from '@/types/default-component-props';
import { InputBase, InputBaseProps } from '@/components/data-entry/InputBase';
import { useTimeValue, useTimeFormat, useInput } from './TimeField.hooks';
import { AutoWidthInput } from '@/components/_share/AutoWidthInput';
import {
  TimeValidationError,
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
  onChange?: (value: Date, validationError?: TimeValidationError) => void;
  onErrorStatus?: (validationError?: TimeValidationError) => void;
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
      onErrorStatus,
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
      focusedColor,
      focused,
      className,
      ...rest
    } = props;
    const [isFocused, setIsFocused] = useState<boolean>(focused || false);
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
      onErrorStatus
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
    const showPlaceholder = !hasValue && !isFocused;

    return (
      <InputBase
        ref={ref}
        className={cn('JinniTimeField', className)}
        onFocus={() => setIsFocused(true)}
        onBlur={(e: FocusEvent) => {
          if (focused) return;
          const relatedTarget = e.relatedTarget as HTMLElement;
          const currentTarget = e.currentTarget as HTMLElement;
          if (!currentTarget?.contains(relatedTarget)) setIsFocused(false);
        }}
        color={isValidationError ? 'error' : color}
        focusedColor={isValidationError ? 'error' : focusedColor}
        disabled={disabled}
        focused={focused}
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
