import { useState } from 'react';
import { SwitchProps } from './Switch';
import { useIsControlled } from '@/hooks/useIsControlled';

type useCheckProps = Required<Pick<SwitchProps, 'defaultChecked'>> &
  Pick<SwitchProps, 'checked' | 'onChange'>;

export const useCheck = ({
  defaultChecked,
  checked,
  onChange
}: useCheckProps) => {
  const isControlled = useIsControlled(checked);
  const [uncontrolledChecked, setUncontrolledChecked] =
    useState<boolean>(defaultChecked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setUncontrolledChecked(event.target.checked);
    if (onChange) {
      onChange(event);
    }
  };

  return {
    isChecked: isControlled ? checked : uncontrolledChecked,
    handleChange
  };
};
