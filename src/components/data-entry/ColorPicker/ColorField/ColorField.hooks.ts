import { useMemo } from 'react';
import { ColorValueType } from '../ColorPicker.types';
import {
  isRgbObject,
  isHsbObject,
  validateRgbObject,
  validateHsbObject,
  hsbObjToRgbObj,
  rgbObjToRgbCss
} from '../ColorPicker.utils';
import useJinni from '@/hooks/useJinni';

export const useToCssColor = ({ color }: { color: ColorValueType }) => {
  const {
    color: { palette, scheme }
  } = useJinni();

  const cssColor = useMemo<string>(() => {
    if (isRgbObject(color) && validateRgbObject(color)) {
      return rgbObjToRgbCss(color);
    } else if (isHsbObject(color) && validateHsbObject(color)) {
      const rgbObj = hsbObjToRgbObj(color);
      return rgbObjToRgbCss(rgbObj);
    } else if (Object.keys(palette).some((pal) => pal === color)) {
      return palette[color];
    } else if (Object.keys(scheme).some((sch) => sch === color)) {
      return scheme[color];
    } else {
      return color;
    }
  }, [color, palette, scheme]);

  return { cssColor };
};
