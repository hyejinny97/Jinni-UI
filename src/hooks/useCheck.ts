import { useState } from 'react';
import { isBoolean } from '@/utils/isBoolean';

type useCheckProps = {
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const useCheck = ({ defaultChecked, checked, onChange }: useCheckProps) => {
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

export default useCheck;
