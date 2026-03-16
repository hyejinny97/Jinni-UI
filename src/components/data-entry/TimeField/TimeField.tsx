import './TimeField.scss';
import { forwardRef } from 'react';
import cn from 'classnames';
import { useRef, MutableRefObject } from 'react';
import { AsType } from '@/types/default-component-props';
import { InputBase, InputBaseProps } from '@/components/data-entry/InputBase';
import { AutoWidthInput } from '@/components/_share/AutoWidthInput';
import {
  useTimeValue,
  useValidation,
  useTimeFormat,
  useInput,
  useFocus
} from './TimeField.hooks';
import { isKeyTimePart } from './TimeField.utils';
import {
  TimeMode,
  TimeComponentProps,
  TimeValidationError,
  KeyTimePartType
} from '@/types/time-component';
import { DEFAULT_TIME_OPTIONS } from '@/constants/time-component';
import {
  TIME_STEP_PRESET_DEFAULT,
  TIME_STEP_MANUAL_DEFAULT
} from './TimeField.constants';

export type TimeFieldProps<
  T extends AsType = 'div',
  Mode extends TimeMode = 'preset'
> = Omit<InputBaseProps<T>, 'defaultValue' | 'onChange'> &
  TimeComponentProps<Mode> & {
    mode?: Mode;
    placeholder?: string;
    format?: string;
    onErrorStatus?: (error: boolean, errorReason?: TimeValidationError) => void;
  };

const TimeField = forwardRef(
  <T extends AsType = 'div', Mode extends TimeMode = 'preset'>(
    props: TimeFieldProps<T, Mode>,
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
        : TIME_STEP_MANUAL_DEFAULT) as TimeComponentProps<Mode>['timeStep'],
      readOnly,
      disabled,
      placeholder,
      format,
      onErrorStatus,
      color,
      focusedColor,
      className,
      onClick,
      ...rest
    } = props;
    const inputBaseElRef = useRef<HTMLElement>(null);
    const timePartsElRef = useRef<Array<HTMLElement>>([]);
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
    const { time, handleTimeChange } = useTimeValue({
      defaultValue,
      value,
      onChange,
      dateToTimeObject,
      timeObjectToDate
    });
    const { isValidationError } = useValidation<Mode>({
      time,
      minTime,
      maxTime,
      disabledTimes,
      mode,
      timeStep,
      onErrorStatus,
      timeObjectToDate
    });
    const { focusNextTimePartOrBlur } = useFocus({ timePartsElRef });
    const { handleInputChange } = useInput({
      localeHourValues,
      localeSecondValues,
      localeMinuteValues,
      localeDayPeriodValues,
      handleTimeChange,
      focusNextTimePartOrBlur
    });
    const noValue = Object.values(time).every((val) => val === undefined);

    const handleClick = (event: MouseEvent) => {
      onClick?.(event);
      const inputBaseEl = inputBaseElRef.current;
      if (!inputBaseEl) return;
      const inputBaseContentEl = inputBaseEl.querySelector(
        '.JinniInputBaseContent'
      );
      if (inputBaseContentEl && !inputBaseContentEl.matches(':focus-within')) {
        const timePartsEl = timePartsElRef.current;
        timePartsEl[0]?.focus();
      }
    };

    return (
      <InputBase
        ref={(element: HTMLElement | null) => {
          if (element) {
            (inputBaseElRef as MutableRefObject<HTMLElement>).current = element;
            if (typeof ref === 'function') {
              ref(element);
            } else if (ref && 'current' in ref) {
              (ref as MutableRefObject<HTMLElement>).current = element;
            }
          }
        }}
        className={cn('JinniTimeField', { noValue }, className)}
        color={isValidationError ? 'error' : color}
        focusedColor={isValidationError ? 'error' : focusedColor}
        disabled={disabled}
        onClick={handleClick}
        {...rest}
      >
        {timeParts.map((part, idx) => {
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
              tabIndex={idx === 0 ? 0 : -1}
            />
          ) : (
            <div
              key={idx}
              className={cn('JinniTimeFieldTimePart', 'literal-type')}
            >
              {hasBlank ? part.value.replace(/\s/g, '\u00A0') : part.value}
            </div>
          );
        })}
        <span className="JinniTimeFieldPlaceholder">{placeholder}</span>
      </InputBase>
    );
  }
);

export default TimeField;
