import { useState, useContext, useCallback, useRef, useEffect } from 'react';
import { NumberInputProps } from './NumberInput';
import NumberInputContext from './NumberInput.contexts';
import { isNumber } from '@/utils/isNumber';
import { useIsControlled } from '@/hooks/useIsControlled';
import { findMaxDecimalPow } from './NumberInput.utils';

type UseNumberInputValueProps = Required<
  Pick<NumberInputProps, 'defaultValue' | 'min' | 'max' | 'step' | 'parser'>
> &
  Pick<NumberInputProps, 'value' | 'onChange'> & {
    toInteger: (value: number) => number;
    toRealValue: (value: number) => number;
    adjustFactor: (...values: unknown[]) => void;
  };

type UseClampOnBlurProps = Required<Pick<NumberInputProps, 'min' | 'max'>> &
  Pick<NumberInputProps, 'disableClampOnBlur'> & {
    inputValue: number | '';
    changeInputValue: (
      event: React.SyntheticEvent | Event,
      newValue: number | ''
    ) => void;
  };

type UseKeyboardAccessibilityProps = {
  increase: (event: React.SyntheticEvent | Event, stepMultiple: number) => void;
  decrease: (event: React.SyntheticEvent | Event, stepMultiple: number) => void;
};

export const useNumberInputValue = ({
  defaultValue,
  value,
  onChange,
  min,
  max,
  step,
  parser,
  toRealValue,
  toInteger,
  adjustFactor
}: UseNumberInputValueProps) => {
  const isControlled = useIsControlled(value);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const inputValue = isControlled ? value : uncontrolledValue;
  const noInputValue = inputValue === '';
  const baseInputValue = min === Number.MIN_SAFE_INTEGER ? 0 : min;

  const clamp = useCallback(
    (value: number) => {
      return Math.max(min, Math.min(max, value));
    },
    [min, max]
  );

  const changeInputValue = useCallback(
    (event: React.SyntheticEvent | Event, newValue: number | '') => {
      if (!isControlled) setUncontrolledValue(newValue);
      if (onChange)
        onChange(
          event,
          typeof newValue === 'number' ? toRealValue(newValue) : newValue
        );
    },
    [isControlled, onChange, toRealValue]
  );

  const increase = useCallback(
    (event: React.SyntheticEvent | Event, stepMultiple: number = 1) => {
      changeInputValue(
        event,
        noInputValue ? baseInputValue : clamp(inputValue + step * stepMultiple)
      );
    },
    [baseInputValue, inputValue, noInputValue, step, clamp, changeInputValue]
  );

  const decrease = useCallback(
    (event: React.SyntheticEvent | Event, stepMultiple: number = 1) => {
      changeInputValue(
        event,
        noInputValue ? baseInputValue : clamp(inputValue - step * stepMultiple)
      );
    },
    [baseInputValue, inputValue, noInputValue, step, clamp, changeInputValue]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const parsedValue = parser(newValue);
    adjustFactor(parsedValue);
    if (parsedValue === '' || isNumber(parsedValue)) {
      changeInputValue(
        event,
        parsedValue === '' ? '' : toInteger(Number(parsedValue))
      );
    }
  };

  return {
    inputValue,
    changeInputValue,
    increase,
    decrease,
    handleChange
  };
};

export const useClampOnBlur = ({
  min,
  max,
  inputValue,
  changeInputValue,
  disableClampOnBlur
}: UseClampOnBlurProps) => {
  const inputBaseElRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const inputBaseEl = inputBaseElRef.current;
    if (!inputBaseEl) return;

    const handleFocusOut = (event: FocusEvent) => {
      const newFocusedTarget = event.relatedTarget as Node;
      if (
        inputBaseEl.contains(newFocusedTarget) ||
        inputValue === '' ||
        disableClampOnBlur
      )
        return;

      if (inputValue < min) {
        changeInputValue(event, min);
      }
      if (max < inputValue) {
        changeInputValue(event, max);
      }
    };

    inputBaseEl.addEventListener('focusout', handleFocusOut);
    return () => {
      inputBaseEl.removeEventListener('focusout', handleFocusOut);
    };
  }, [min, max, inputValue, changeInputValue, disableClampOnBlur]);

  return { inputBaseElRef };
};

export const useKeyboardAccessibility = ({
  increase,
  decrease
}: UseKeyboardAccessibilityProps) => {
  const inputElRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const inputEl = inputElRef.current;
    if (!inputEl) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        increase(event, event.shiftKey ? 10 : 1);
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        decrease(event, event.shiftKey ? 10 : 1);
      }
    };

    inputEl.addEventListener('keydown', handleKeyDown);
    return () => {
      inputEl.removeEventListener('keydown', handleKeyDown);
    };
  }, [increase, decrease]);

  return { inputElRef };
};

export const useNumberInput = () => {
  const value = useContext(NumberInputContext);
  if (!value) throw new Error('NumberInputContext value is null');
  return value;
};

export const usePrecision = ({
  defaultValue,
  value,
  step,
  min,
  max
}: Pick<NumberInputProps, 'value'> &
  Required<
    Pick<NumberInputProps, 'defaultValue' | 'step' | 'min' | 'max'>
  >) => {
  const factorRef = useRef<number>(
    findMaxDecimalPow(defaultValue, value, step, min, max)
  );

  const adjustFactor = (...values: unknown[]) => {
    factorRef.current = findMaxDecimalPow(
      ...values,
      defaultValue,
      value,
      step,
      min,
      max
    );
  };

  const toInteger = (value: number) => value * factorRef.current;

  const toRealValue = useCallback(
    (value: number) => value / factorRef.current,
    []
  );

  return {
    normalizedDefaultValue:
      typeof defaultValue === 'number' ? toInteger(defaultValue) : defaultValue,
    normalizedValue: typeof value === 'number' ? toInteger(value) : value,
    normalizedStep: toInteger(step),
    normalizedMin: min === Number.MIN_SAFE_INTEGER ? min : toInteger(min),
    normalizedMax: max === Number.MAX_SAFE_INTEGER ? max : toInteger(max),
    toRealValue,
    toInteger,
    adjustFactor
  };
};
