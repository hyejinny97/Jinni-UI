import { useState } from 'react';
import { InputProps } from './Input';
import { useIsControlled } from '@/hooks/useIsControlled';

type UseInputValueProps = Required<Pick<InputProps, 'defaultValue'>> &
  Pick<InputProps, 'value' | 'onChange'>;

export const useInputValue = ({
  defaultValue,
  value,
  onChange
}: UseInputValueProps) => {
  const isControlled = useIsControlled(value);
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
