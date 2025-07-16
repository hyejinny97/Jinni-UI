import './DateField.scss';
import { useState, forwardRef } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { InputBase, InputBaseProps } from '@/components/data-entry/InputBase';
import {
  ValidationError,
  DateOptions,
  KeyDatePartType
} from './DateField.types';
import { useDateFormat, useDateValue, useInput } from './DateField.hooks';
import { KEY_DATE_PARTS } from './DateField.constants';
import { AutoWidthInput } from '@/components/_share/AutoWidthInput';

export type DateFieldProps<T extends AsType = 'div'> = Omit<
  InputBaseProps<T>,
  'defaultValue' | 'onChange'
> & {
  placeholder?: string;
  defaultValue?: Date;
  value?: Date | null;
  onChange?: (value: Date, validationError?: ValidationError) => void;
  locale?: string;
  options?: DateOptions;
  format?: string;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Array<Date>;
  readOnly?: boolean;
  disabled?: boolean;
};

const DateField = forwardRef(
  <T extends AsType = 'div'>(
    props: DateFieldProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      placeholder = '',
      defaultValue,
      value,
      onChange,
      locale,
      options,
      format,
      minDate,
      maxDate,
      disabledDates,
      readOnly = false,
      disabled = false,
      color,
      focusedColor,
      className,
      ...rest
    } = props;
    const [focused, setFocused] = useState<boolean>(false);
    const {
      yearDigit,
      monthDigit,
      dayDigit,
      localeNumberValues,
      localeMonthValues,
      getLocaleDayValuesByYearMonth,
      dateParts,
      dateToDateObject,
      dateObjectToDate
    } = useDateFormat({
      locale,
      options,
      format
    });
    const { date, handleDateChange, isValidationError, localeDayValues } =
      useDateValue({
        defaultValue,
        value,
        minDate,
        maxDate,
        disabledDates,
        onChange,
        dateToDateObject,
        dateObjectToDate,
        getLocaleDayValuesByYearMonth
      });
    const { datePartsElRef, handleInputChange } = useInput({
      yearDigit,
      monthDigit,
      dayDigit,
      localeNumberValues,
      localeMonthValues,
      localeDayValues,
      handleDateChange
    });
    const isKeyDatePart = (
      type: keyof Intl.DateTimeFormatPartTypesRegistry
    ): type is KeyDatePartType => KEY_DATE_PARTS.some((part) => part === type);
    const hasValue = Object.values(date).some((val) => val !== undefined);
    const showPlaceholder = !hasValue && !focused;

    return (
      <InputBase
        ref={ref}
        className={cn('JinniDateField', className)}
        onFocus={() => setFocused(true)}
        onBlur={(e: FocusEvent) => {
          const relatedTarget = e.relatedTarget as HTMLElement;
          const currentTarget = e.currentTarget as HTMLElement;
          if (!currentTarget?.contains(relatedTarget)) setFocused(false);
        }}
        color={isValidationError ? 'error' : color}
        focusedColor={isValidationError ? 'error' : focusedColor}
        disabled={disabled}
        {...rest}
      >
        {showPlaceholder ? (
          <span className="JinniDateFieldPlaceholder">{placeholder}</span>
        ) : (
          dateParts.map((part, idx) => {
            const hasBlank =
              part.type === 'literal' && part.value.includes(' ');
            return isKeyDatePart(part.type) ? (
              <AutoWidthInput
                key={part.type}
                ref={(element) => {
                  if (element && !datePartsElRef.current.includes(element)) {
                    datePartsElRef.current.push(element);
                  }
                }}
                className="JinniDateFieldDatePart"
                value={date[part.type] || part.value}
                onChange={handleInputChange(part.type as KeyDatePartType)}
                readOnly={readOnly}
                disabled={disabled}
              />
            ) : (
              <div key={idx} className="JinniDateFieldDatePart">
                {hasBlank ? part.value.replace(' ', '\u00A0') : part.value}
              </div>
            );
          })
        )}
      </InputBase>
    );
  }
);

export default DateField;
