import { useState } from 'react';
import { ColorPickerProps } from './ColorPicker';
import { ColorValueType, HSBObject } from './ColorPicker.types';

type UseColorValueProps = Required<Pick<ColorPickerProps, 'defaultValue'>> &
  Pick<ColorPickerProps, 'value' | 'onChange'>;

export const useColorValue = ({
  defaultValue,
  value,
  onChange
}: UseColorValueProps) => {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] =
    useState<ColorValueType>(defaultValue);
  const colorValue = isControlled ? value : uncontrolledValue;

  const handleChange = (
    event: Event | React.SyntheticEvent,
    newValue: HSBObject
  ) => {
    if (!isControlled) setUncontrolledValue(newValue);
    if (onChange) onChange(event, newValue);
  };

  return {
    colorValue,
    handleChange
  };
};
