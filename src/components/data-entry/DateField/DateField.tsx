import './DateField.scss';
import { forwardRef, useRef, MutableRefObject } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { InputBase, InputBaseProps } from '@/components/data-entry/InputBase';
import { KeyDatePartType } from './DateField.types';
import {
  useDateFormat,
  useDateValue,
  useInput,
  useValidation,
  useFocus
} from './DateField.hooks';
import { isKeyDatePart } from './DateField.utils';
import { AutoWidthInput } from '@/components/_share/AutoWidthInput';
import {
  DateComponentProps,
  DateValidationError
} from '@/types/date-component';

export type DateFieldProps<T extends AsType = 'div'> = Omit<
  InputBaseProps<T>,
  'defaultValue' | 'onChange'
> &
  DateComponentProps & {
    placeholder?: string;
    format?: string;
    onErrorStatus?: (error: boolean, errorReason?: DateValidationError) => void;
  };

const DateField = forwardRef(
  <T extends AsType = 'div'>(
    props: DateFieldProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      defaultValue,
      value,
      onChange,
      locale,
      options,
      minDate,
      maxDate,
      disabledDates,
      readOnly,
      disabled,
      placeholder,
      format,
      onErrorStatus,
      color,
      focusedColor,
      onClick,
      className,
      ...rest
    } = props;
    const inputBaseElRef = useRef<HTMLElement>(null);
    const datePartsElRef = useRef<Array<HTMLElement>>([]);
    const {
      yearDigit,
      monthDigit,
      dayDigit,
      localeNumberValues,
      localeMonthValues,
      localeDayValues,
      dateParts,
      dateToDateObject,
      dateObjectToDate
    } = useDateFormat({
      locale,
      options,
      format
    });
    const { dateValue, handleDateChange } = useDateValue({
      defaultValue,
      value,
      onChange,
      dateToDateObject,
      dateObjectToDate
    });
    const { isValidationError } = useValidation({
      dateValue,
      minDate,
      maxDate,
      disabledDates,
      onErrorStatus,
      dateObjectToDate
    });
    const { focusNextDatePartOrBlur } = useFocus({ datePartsElRef });
    const { handleInputChange } = useInput({
      dateValue,
      yearDigit,
      monthDigit,
      dayDigit,
      localeNumberValues,
      localeMonthValues,
      localeDayValues,
      handleDateChange,
      focusNextDatePartOrBlur,
      dateObjectToDate
    });
    const noValue = Object.values(dateValue).every((val) => val === undefined);

    const handleClick = (event: MouseEvent) => {
      onClick?.(event);
      const inputBaseEl = inputBaseElRef.current;
      if (!inputBaseEl) return;
      const inputBaseContentEl = inputBaseEl.querySelector(
        '.JinniInputBaseContent'
      );
      if (inputBaseContentEl && !inputBaseContentEl.matches(':focus-within')) {
        const datePartsEl = datePartsElRef.current;
        datePartsEl[0]?.focus();
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
        className={cn('JinniDateField', { noValue }, className)}
        color={isValidationError ? 'error' : color}
        focusedColor={isValidationError ? 'error' : focusedColor}
        disabled={disabled}
        onClick={handleClick}
        {...rest}
      >
        {dateParts.map((part, idx) => {
          const hasBlank = part.type === 'literal' && part.value.includes(' ');
          return isKeyDatePart(part.type) ? (
            <AutoWidthInput
              key={part.type}
              ref={(element) => {
                if (element && !datePartsElRef.current.includes(element)) {
                  datePartsElRef.current.push(element);
                }
              }}
              className="JinniDateFieldDatePart"
              value={dateValue[part.type] || part.value}
              onChange={handleInputChange(part.type as KeyDatePartType)}
              readOnly={readOnly}
              disabled={disabled}
              tabIndex={idx === 0 ? 0 : -1}
            />
          ) : (
            <div
              key={idx}
              className={cn('JinniDateFieldDatePart', 'literal-type')}
            >
              {hasBlank ? part.value.replace(/\s/g, '\u00A0') : part.value}
            </div>
          );
        })}
        <span className="JinniDateFieldPlaceholder">{placeholder}</span>
      </InputBase>
    );
  }
);

export default DateField;
