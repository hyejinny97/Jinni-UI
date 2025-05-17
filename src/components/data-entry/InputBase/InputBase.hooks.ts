import { useState } from 'react';
import { InputBaseProps } from './InputBase';
import { AsType } from '@/types/default-component-props';

export const useInputValue = <T extends AsType = 'input'>({
  defaultValue,
  value,
  onChange
}: Pick<InputBaseProps<T>, 'value' | 'onChange' | 'defaultValue'>) => {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<
    string | number | undefined
  >(defaultValue);

  const handleChange = (
    event: T extends 'input'
      ? React.ChangeEvent<HTMLInputElement>
      : React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    if (!isControlled) setUncontrolledValue(newValue);
    if (onChange) onChange(event);
  };

  return {
    inputValue: isControlled ? value : uncontrolledValue,
    handleChange
  };
};
