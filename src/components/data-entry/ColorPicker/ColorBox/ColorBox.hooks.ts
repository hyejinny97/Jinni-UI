import { useState, useCallback, useContext } from 'react';
import { ColorBoxProps } from './ColorBox';
import { HSBObject } from '../ColorPicker.types';
import { ColorValueType } from '../ColorPicker.types';
import {
  isHsbObject,
  isRgbObject,
  isHex,
  isCssColorKeyword,
  isRgbCss,
  validateHsbObject,
  validateRgbObject,
  validateHex,
  hexToHsbObj,
  rgbObjToHsbObj,
  rgbCssToRgbObj
} from '../ColorPicker.utils';
import { CSS_COLOR_KEYWORDS } from '@/constants/color';
import useJinni from '@/hooks/useJinni';
import ColorBoxContext from './ColorBox.contexts';
import { FORMAT } from './ColorBox.constants';

type UseColorValueProps = Required<Pick<ColorBoxProps, 'defaultValue'>> &
  Pick<ColorBoxProps, 'value' | 'onChange'>;

export const useToHsbObject = () => {
  const {
    color: { palette, scheme }
  } = useJinni();

  const toHsbObject = useCallback(
    (color: ColorValueType): HSBObject => {
      if (color === 'transparent') {
        return { h: 0, s: 0, b: 0, a: 0 };
      } else if (isHsbObject(color) && validateHsbObject(color)) {
        return color;
      } else if (isRgbObject(color) && validateRgbObject(color)) {
        return rgbObjToHsbObj(color);
      } else if (isHex(color) && validateHex(color)) {
        return hexToHsbObj(color);
      } else if (isCssColorKeyword(color)) {
        const hex = CSS_COLOR_KEYWORDS[color];
        return hexToHsbObj(hex);
      } else if (Object.keys(palette).some((pal) => pal === color)) {
        const value = palette[color];
        if (isHex(value)) {
          validateHex(value);
          return hexToHsbObj(value);
        }
      } else if (Object.keys(scheme).some((sch) => sch === color)) {
        const value = scheme[color];
        if (isRgbCss(value)) {
          const rgbObj = rgbCssToRgbObj(value);
          validateRgbObject(rgbObj);
          return rgbObjToHsbObj(rgbObj);
        }
      }
      throw new Error(`${color}를 HSBObject로 변환할 수 없습니다.`);
    },
    [palette, scheme]
  );

  return { toHsbObject };
};

export const useColorValue = ({
  defaultValue,
  value,
  onChange
}: UseColorValueProps) => {
  const { toHsbObject } = useToHsbObject();
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<HSBObject>(
    toHsbObject(defaultValue)
  );
  const colorValue: HSBObject = isControlled
    ? toHsbObject(value)
    : uncontrolledValue;

  const changeColorValue = (
    event: Event | React.SyntheticEvent,
    newValue: HSBObject
  ) => {
    if (!isControlled) setUncontrolledValue(newValue);
    if (onChange) onChange(event, newValue);
  };

  return {
    colorValue,
    changeColorValue
  };
};

export const useFormat = () => {
  const [format, setFormat] = useState<(typeof FORMAT)[number]>('RGB');

  const changeFormat = (newFormat: (typeof FORMAT)[number]) => {
    setFormat(newFormat);
  };

  return {
    format,
    changeFormat
  };
};

export const useColorBoxContext = () => {
  const value = useContext(ColorBoxContext);
  if (!value) throw new Error('ColorBoxContext is null');
  return value;
};
