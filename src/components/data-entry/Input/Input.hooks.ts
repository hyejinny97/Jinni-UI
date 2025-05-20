import { useState } from 'react';
import { InputProps } from './Input';

export const useInputValue = ({
  defaultValue,
  value,
  onChange
}: Pick<InputProps, 'value' | 'onChange' | 'defaultValue'>) => {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<
    string | number | undefined
  >(defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (!isControlled) setUncontrolledValue(newValue);
    if (onChange) onChange(event);
  };

  return {
    inputValue: isControlled ? value : uncontrolledValue,
    handleChange
  };
};
