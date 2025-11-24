import { useState, useContext } from 'react';
import { CheckboxGroupProps } from './CheckboxGroup';
import CheckboxGroupContext from './CheckboxGroup.contexts';

type useCheckProps = Required<Pick<CheckboxGroupProps, 'defaultValue'>> &
  Pick<CheckboxGroupProps, 'value' | 'onChange'>;

export const useCheck = ({ defaultValue, value, onChange }: useCheckProps) => {
  const isControlled = value !== undefined;
  const [uncontrolledCheckedValue, setUncontrolledCheckedValue] =
    useState(defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      if (event.target.checked) {
        setUncontrolledCheckedValue((prev) => [...prev, event.target.value]);
      } else {
        setUncontrolledCheckedValue((prev) =>
          prev.filter((val) => val !== event.target.value)
        );
      }
    }
    onChange?.(event);
  };

  return {
    checkedValue: isControlled ? value : uncontrolledCheckedValue,
    handleChange
  };
};

export const useCheckboxGroupContext = () => {
  const value = useContext(CheckboxGroupContext);
  return value;
};
