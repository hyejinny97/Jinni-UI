import { useState } from 'react';
import { InputBaseProps } from './InputBase';

export const useInputValue = ({
  defaultValue,
  value,
  onChange
}: Pick<InputBaseProps, 'defaultValue' | 'value' | 'onChange'>) => {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

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
