import { useState, useContext } from 'react';
import { RadioGroupProps } from './RadioGroup';
import RadioGroupContext from './RadioGroup.contexts';

type useCheckProps = Required<Pick<RadioGroupProps, 'defaultValue'>> &
  Pick<RadioGroupProps, 'value' | 'onChange'>;

export const useCheck = ({ defaultValue, value, onChange }: useCheckProps) => {
  const isControlled = value !== undefined;
  const [uncontrolledCheckedValue, setUncontrolledCheckedValue] =
    useState(defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setUncontrolledCheckedValue(event.target.value);
    onChange?.(event);
  };

  return {
    checkedValue: isControlled ? value : uncontrolledCheckedValue,
    handleChange
  };
};

export const useRadioGroupContext = () => {
  const value = useContext(RadioGroupContext);
  return value;
};
