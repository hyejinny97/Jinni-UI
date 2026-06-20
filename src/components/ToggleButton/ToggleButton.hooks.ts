import { useState } from 'react';
import { ToggleButtonProps } from './ToggleButton';
import { useIsControlled } from '@/hooks/useIsControlled';

type UseSelectedProps = Required<Pick<ToggleButtonProps, 'defaultSelected'>> &
  Pick<ToggleButtonProps, 'selected' | 'onChange'>;

export const useSelected = ({
  defaultSelected,
  selected,
  onChange
}: UseSelectedProps) => {
  const isControlled = useIsControlled(selected);
  const [uncontrolledSelected, setUncontrolledSelected] =
    useState(defaultSelected);

  const handleChange = (event: React.MouseEvent) => {
    const newSelected = isControlled ? !selected : !uncontrolledSelected;
    if (!isControlled) setUncontrolledSelected(newSelected);
    if (onChange) onChange(event, newSelected);
  };

  return {
    isSelected: isControlled ? selected : uncontrolledSelected,
    handleChange
  };
};
