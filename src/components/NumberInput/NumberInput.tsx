'use client';

import './NumberInput.scss';
import React from 'react';
import cn from 'classnames';
import InputBase, { RootInputBaseProps } from '@/components/InputBase';
import { DefaultComponentProps } from '@/types/default-component-props';
import { useLabelContext } from '@/components/Label';
import {
  useNumberInputValue,
  useClampOnBlur,
  useKeyboardAccessibility,
  usePrecision
} from './NumberInput.hooks';
import IncreaseButton from '../IncreaseButton';
import DecreaseButton from '../DecreaseButton';
import NumberInputContext from './NumberInput.contexts';
import { isNumber } from '@/utils/isNumber';
import { mergeRefs } from '@/utils/mergeRefs';

export type ValueType = number | '';

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

const NumberInput = ({ ref, ...props }: NumberInputProps) => {
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
  const {
    normalizedDefaultValue,
    normalizedValue,
    normalizedStep,
    normalizedMin,
    normalizedMax,
    toRealValue,
    toInteger,
    adjustFactor
  } = usePrecision({ defaultValue, value, step, min, max });
  const { inputValue, handleChange, changeInputValue, increase, decrease } =
    useNumberInputValue({
      defaultValue: normalizedDefaultValue,
      value: normalizedValue,
      onChange,
      min: normalizedMin,
      max: normalizedMax,
      step: normalizedStep,
      parser,
      toRealValue,
      toInteger,
      adjustFactor
    });
  const { inputBaseElRef } = useClampOnBlur({
    min: normalizedMin,
    max: normalizedMax,
    inputValue,
    changeInputValue,
    disableClampOnBlur
  });
  const { inputElRef } = useKeyboardAccessibility({ increase, decrease });

  return (
    <NumberInputContext
      value={{
        size,
        increase,
        decrease,
        disableIncrease:
          disabled || (isNumber(inputValue) && normalizedMax <= inputValue),
        disableDecrease:
          disabled || (isNumber(inputValue) && inputValue <= normalizedMin)
      }}
    >
      <InputBase
        ref={mergeRefs(ref, inputBaseElRef)}
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
        noPadding
      >
        <input
          className="JinniInputBasePadding"
          ref={inputElRef}
          type="text"
          inputMode="numeric"
          aria-roledescription="number input"
          value={formatter(
            typeof inputValue === 'number'
              ? toRealValue(inputValue)
              : inputValue
          )}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          {...rest}
        />
      </InputBase>
    </NumberInputContext>
  );
};

export default NumberInput;
