import './NumberInput.scss';
import React, { forwardRef, MutableRefObject } from 'react';
import cn from 'classnames';
import {
  InputBase,
  RootInputBaseProps
} from '@/components/data-entry/InputBase';
import { DefaultComponentProps } from '@/types/default-component-props';
import { useLabelContext } from '@/components/data-entry/Label';
import {
  useNumberInputValue,
  useClampOnBlur,
  useKeyboardAccessibility
} from './NumberInput.hooks';
import { IncreaseButton } from './IncreaseButton';
import { DecreaseButton } from './DecreaseButton';
import NumberInputContext from './NumberInput.contexts';
import { isNumber } from '@/utils/isNumber';

type ValueType = number | '';

export type NumberInputProps = Omit<
  DefaultComponentProps<'input'>,
  'size' | 'defaultValue' | 'value' | 'onChange'
> &
  RootInputBaseProps & {
    defaultValue?: ValueType;
    value?: ValueType;
    onChange?: (event: React.SyntheticEvent | Event, value: ValueType) => void;
    step?: number;
    min?: number;
    max?: number;
    disableClampOnBlur?: boolean;
    formatter?: (value: ValueType) => string;
    parser?: (value: string) => ValueType;
  };

const NumberInput = forwardRef(
  (props: NumberInputProps, ref: React.Ref<HTMLElement>) => {
    const labelContext = useLabelContext();
    const {
      defaultValue = '',
      value,
      onChange,
      step = 1,
      min = Number.MIN_SAFE_INTEGER,
      max = Number.MAX_SAFE_INTEGER,
      disableClampOnBlur,
      formatter = (value: ValueType) => `${value}`,
      parser = (value: string) => (value === '' ? '' : Number(value)),
      startAdornment,
      endAdornment = (
        <>
          <IncreaseButton />
          <DecreaseButton />
        </>
      ),
      variant,
      size = (labelContext?.size || 'md') as NonNullable<
        RootInputBaseProps['size']
      >,
      color,
      focusedColor,
      disabled = labelContext?.disabled,
      disableHoverEffect,
      disableFocusEffect,
      fullWidth,
      required = labelContext?.required,
      className,
      style,
      ...rest
    } = props;
    const { inputValue, handleChange, changeInputValue, increase, decrease } =
      useNumberInputValue({
        defaultValue,
        value,
        onChange,
        min,
        max,
        step,
        parser
      });
    const { inputBaseElRef } = useClampOnBlur({
      min,
      max,
      inputValue,
      changeInputValue,
      disableClampOnBlur
    });
    const { inputElRef } = useKeyboardAccessibility({ increase, decrease });

    return (
      <NumberInputContext.Provider
        value={{
          size,
          increase,
          decrease,
          disableIncrease:
            disabled || (isNumber(inputValue) && max <= inputValue),
          disableDecrease:
            disabled || (isNumber(inputValue) && inputValue <= min)
        }}
      >
        <InputBase
          ref={(element: HTMLElement | null) => {
            if (element) {
              (inputBaseElRef as MutableRefObject<HTMLElement>).current =
                element;
              if (typeof ref === 'function') {
                ref(element);
              } else if (ref && 'current' in ref) {
                (ref as MutableRefObject<HTMLElement>).current = element;
              }
            }
          }}
          className={cn('JinniNumberInput', className)}
          style={style}
          startAdornment={startAdornment}
          endAdornment={endAdornment}
          variant={variant}
          size={size}
          color={color}
          focusedColor={focusedColor}
          disabled={disabled}
          disableHoverEffect={disableHoverEffect}
          disableFocusEffect={disableFocusEffect}
          fullWidth={fullWidth}
        >
          <input
            ref={inputElRef}
            type="text"
            inputMode="numeric"
            aria-roledescription="number input"
            value={formatter(inputValue)}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            {...rest}
          />
        </InputBase>
      </NumberInputContext.Provider>
    );
  }
);

export default NumberInput;
