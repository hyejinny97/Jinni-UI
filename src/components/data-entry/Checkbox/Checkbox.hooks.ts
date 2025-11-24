import { useState } from 'react';
import { isBoolean } from '@/utils/isBoolean';
import { CheckboxProps } from './Checkbox';
import { useCheckboxGroupContext } from '@/components/data-entry/CheckboxGroup';

type useCheckProps = Required<Pick<CheckboxProps, 'defaultChecked'>> &
  Pick<CheckboxProps, 'checked' | 'onChange' | 'value'>;

const useCheck = ({
  defaultChecked,
  checked,
  onChange,
  value
}: useCheckProps) => {
  const checkboxGroupContext = useCheckboxGroupContext();
  const isControlled = checked !== undefined && isBoolean(checked);
  const [uncontrolledChecked, setUncontrolledChecked] =
    useState<boolean>(defaultChecked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setUncontrolledChecked(event.target.checked);
    if (onChange) {
      onChange(event);
    }
  };

  let isChecked: boolean;
  if (checkboxGroupContext) {
    isChecked = checkboxGroupContext.checkedValue.some((v) => v === value);
  } else {
    isChecked = isControlled ? checked : uncontrolledChecked;
  }

  return {
    isChecked,
    handleChange: checkboxGroupContext
      ? checkboxGroupContext.handleChange
      : handleChange
  };
};

export default useCheck;
