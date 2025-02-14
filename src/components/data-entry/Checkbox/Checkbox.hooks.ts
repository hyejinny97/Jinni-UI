import { useState } from 'react';
import { CheckboxProps } from './Checkbox';
import { isBoolean } from '@/utils/isBoolean';

export const useCheck = ({
  defaultChecked,
  checked,
  onChange
}: Pick<CheckboxProps, 'defaultChecked' | 'checked' | 'onChange'>) => {
  const isControlledCheckbox = checked !== undefined && isBoolean(checked);
  const [uncontrolledChecked, setUncontrolledChecked] =
    useState<boolean>(!!defaultChecked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlledCheckbox) setUncontrolledChecked(event.target.checked);
    if (onChange) {
      onChange(event);
    }
  };

  return {
    isChecked: isControlledCheckbox ? checked : uncontrolledChecked,
    handleChange
  };
};
