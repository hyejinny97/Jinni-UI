'use client';

import './ColorField.scss';
import cn from 'classnames';
import InputBase, { InputBaseProps } from '@/components/InputBase';
import {
  ColorValueType,
  isRgbObject,
  isHsbObject,
  rgbObjToRgbCss,
  hsbObjToHex
} from '../ColorPicker';
import ColorBlock from '@/components/ColorBlock';
import { ColorType } from '@/types/color';

export type ColorFieldProps = InputBaseProps & {
  value?: ColorValueType;
};

const ColorField = ({ ref, ...props }: ColorFieldProps) => {
  const {
    value = 'primary',
    children = <ColorBlock color={value} />,
    className,
    ...rest
  } = props;

  let focusedColor: ColorType;
  if (isRgbObject(value)) {
    focusedColor = rgbObjToRgbCss(value);
  } else if (isHsbObject(value)) {
    focusedColor = hsbObjToHex(value);
  } else {
    focusedColor = value;
  }

  return (
    <InputBase
      ref={ref}
      className={cn('JinniColorField', className)}
      focusedColor={focusedColor}
      {...rest}
    >
      {children}
    </InputBase>
  );
};

export default ColorField;
