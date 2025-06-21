import { useState } from 'react';
import { ColorPickerProps } from './ColorPicker';
import { RgbaObject } from '@/utils/colorFormat';
import { ColorType, RGBA } from '@/types/color';

type UseColorValueProps = Required<Pick<ColorPickerProps, 'defaultValue'>> &
  Pick<ColorPickerProps, 'value' | 'onChange'>;

export const useColor = ({
  defaultValue,
  value,
  onChange
}: UseColorValueProps) => {
  const isControlled = value !== undefined;
  const [uncontrolledColorValue, setUncontrolledColorValue] =
    useState<ColorType>(defaultValue);

  const handleChange = (
    event: Event | React.SyntheticEvent,
    value: RgbaObject
  ) => {
    const { r, g, b, a } = value;
    const rgbaString: RGBA = `rgba(${r},${g},${b},${a})`;
    if (!isControlled) setUncontrolledColorValue(rgbaString);
    if (onChange) onChange(event, value);
  };

  return {
    colorValue: isControlled ? value : uncontrolledColorValue,
    handleChange
  };
};
