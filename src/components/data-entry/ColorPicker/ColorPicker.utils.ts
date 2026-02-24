import { RGBObject, HSBObject } from './ColorPicker.types';
import { RGB, RGBA } from '@/types/color';
import { isObject } from '@/utils/isObject';
import { isNumber } from '@/utils/isNumber';

// Color Validation
export const isRgbObject = (value: unknown): value is RGBObject => {
  if (!isObject(value)) return false;

  const keys = Object.keys(value);
  if (!(keys.length === 3 || keys.length === 4)) return false;
  if (!['r', 'g', 'b'].every((key) => key in value)) return false;
  if (keys.length === 4 && !('a' in value)) return false;

  return true;
};

export const validateRgbObject = (rgbObj: RGBObject): rgbObj is RGBObject => {
  const { r, g, b, a } = rgbObj;
  const isValidChannel = (channel: number) =>
    isNumber(channel) && channel >= 0 && channel <= 255;
  const isValidAlpha = (alpha: number) =>
    isNumber(alpha) && alpha >= 0 && alpha <= 1;

  if (!(isValidChannel(r) && isValidChannel(g) && isValidChannel(b))) {
    throw new Error(
      `${JSON.stringify(rgbObj)}는 올바른 RgbObject 형태가 아닙니다.\n- r/g/b: 0~255 number`
    );
  }
  if (a !== undefined && !isValidAlpha(a)) {
    throw new Error(
      `${JSON.stringify(rgbObj)}는 올바른 RgbObject 형태가 아닙니다.\n- a: 0~1 number`
    );
  }

  return true;
};

export const isHsbObject = (value: unknown): value is HSBObject => {
  if (!isObject(value)) return false;

  const keys = Object.keys(value);
  if (!(keys.length === 3 || keys.length === 4)) return false;
  if (!['h', 's', 'b'].every((key) => key in value)) return false;
  if (keys.length === 4 && !('a' in value)) return false;

  return true;
};

export const validateHsbObject = (hsbObj: HSBObject): hsbObj is HSBObject => {
  const { h, s, b, a } = hsbObj;
  const isPercentNumber = (val: number) =>
    isNumber(val) && val >= 0 && val <= 100;
  const isValidAlpha = (alpha: number) =>
    isNumber(alpha) && alpha >= 0 && alpha <= 1;

  if (!(isNumber(h) && isPercentNumber(s) && isPercentNumber(b))) {
    throw new Error(
      `${JSON.stringify(hsbObj)}는 올바른 HsbObject 형태가 아닙니다.\n- h: 0~360 number\n- s/b: 0~100 number`
    );
  }
  if (a !== undefined && !isValidAlpha(a)) {
    throw new Error(
      `${JSON.stringify(hsbObj)}는 올바른 RgbObject 형태가 아닙니다.\n- a: 0~1 number`
    );
  }

  return true;
};

// Color Format Transform
export const rgbObjToRgbCss = (rgbObj: RGBObject): RGB | RGBA => {
  const { r, g, b, a } = rgbObj;
  return a !== undefined ? `rgba(${r},${g},${b},${a})` : `rgb(${r},${g},${b})`;
};

export const hsbObjToRgbObj = (hsbObj: HSBObject): RGBObject => {
  const { h, s, b, a } = hsbObj;

  const hue = ((h % 360) + 360) % 360;
  const saturation = Math.max(0, Math.min(100, s)) / 100;
  const brightness = Math.max(0, Math.min(100, b)) / 100;

  const c = brightness * saturation;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = brightness - c;

  let r1 = 0;
  let g1 = 0;
  let b1 = 0;

  if (hue < 60) {
    r1 = c;
    g1 = x;
    b1 = 0;
  } else if (hue < 120) {
    r1 = x;
    g1 = c;
    b1 = 0;
  } else if (hue < 180) {
    r1 = 0;
    g1 = c;
    b1 = x;
  } else if (hue < 240) {
    r1 = 0;
    g1 = x;
    b1 = c;
  } else if (hue < 300) {
    r1 = x;
    g1 = 0;
    b1 = c;
  } else {
    r1 = c;
    g1 = 0;
    b1 = x;
  }

  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
    a
  };
};
