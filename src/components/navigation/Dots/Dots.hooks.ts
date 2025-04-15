import { useState } from 'react';
import { DotsProps } from './Dots';

type UseSelectedValueProps = {
  defaultValue: Required<DotsProps['defaultValue']>;
} & Pick<DotsProps, 'value' | 'onChange'>;

export const useSelectedValue = ({
  defaultValue,
  value,
  onChange
}: UseSelectedValueProps) => {
  const isControlled = value !== undefined;
  const [uncontrolledSelectedValue, setUncontrolledSelectedValue] =
    useState(defaultValue);

  const handleChange = (
    event: Event | React.SyntheticEvent,
    newValue: number
  ) => {
    if (!isControlled) setUncontrolledSelectedValue(newValue);
    if (onChange) onChange(event, newValue);
  };

  return {
    selectedValue: isControlled ? value : uncontrolledSelectedValue,
    handleChange
  };
};
