import { RGBObject, HSBObject } from './ColorPicker.types';
import { RGB, RGBA, HEX, CSSColorKeywords } from '@/types/color';
import { CSS_COLOR_KEYWORDS } from '@/constants/color';
import { isObject } from '@/utils/isObject';
import { isNumber } from '@/utils/isNumber';

const HEX_REG_EX = /^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const RGB_REG_EX =
  /^rgb\(\s*(\d{1,3})(?:\s*,\s*|\s+)?(\d{1,3})(?:\s*,\s*|\s+)?(\d{1,3})\s*\)$/;
const RGBA_REG_EX =
  /^rgba\(\s*(\d{1,3})(?:\s*,\s*|\s+)?(\d{1,3})(?:\s*,\s*|\s+)?(\d{1,3})(?:\s*,\s*|\s+)?((?:0(?:\.\d+)?|1(?:\.0+)?))\s*\)$/;

// Color Validation (Simple)
export const isHex = (value: unknown): value is HEX => {
  return typeof value === 'string' && value.startsWith('#');
};

export const isRgbObject = (value: unknown): value is RGBObject => {
  if (!isObject(value)) return false;

  const keys = Object.keys(value);
  if (!(keys.length === 3 || keys.length === 4)) return false;
  if (!['r', 'g', 'b'].every((key) => key in value)) return false;
  if (keys.length === 4 && !('a' in value)) return false;

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

export const isCssColorKeyword = (
  value: unknown
): value is CSSColorKeywords => {
  return (
    typeof value === 'string' &&
    Object.keys(CSS_COLOR_KEYWORDS).some((keyword) => keyword === value)
  );
};

export const isRgbCss = (value: unknown): value is RGB | RGBA => {
  return (
    typeof value === 'string' &&
    (RGB_REG_EX.test(value) || RGBA_REG_EX.test(value))
  );
};

// Color Validation (Delicate)
export const validateHex = (hex: HEX): hex is HEX => {
  if (!HEX_REG_EX.test(hex)) {
    throw new Error(
      `${hex}는 올바른 HEX 형태가 아닙니다.\n- #RRGGBB\n- #RRGGBBAA\n- #RGB\n- #RGBA\n- R/G/B/A는 16진수여야 함`
    );
  }
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

export const rgbCssToRgbObj = (rgbCss: RGB | RGBA): RGBObject => {
  const isRgba = rgbCss.startsWith('rgba');
  const match = isRgba ? rgbCss.match(RGBA_REG_EX) : rgbCss.match(RGB_REG_EX);
  if (!match) throw new Error('올바른 형태의 rgb(rgba)가 아닙니다.');

  return {
    r: parseInt(match[1]),
    g: parseInt(match[2]),
    b: parseInt(match[3]),
    a: isRgba ? parseFloat(match[4]) : undefined
  };
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

export const rgbObjToHsbObj = (
  rgbObj: RGBObject,
  previousHue = 0
): HSBObject => {
  const { r, g, b, a } = rgbObj;

  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  const brightness = max;
  const saturation = max === 0 ? 0 : delta / max;

  let hue = previousHue;
  if (delta !== 0) {
    if (max === rNorm) {
      hue = (gNorm - bNorm) / delta;
    } else if (max === gNorm) {
      hue = (bNorm - rNorm) / delta + 2;
    } else {
      hue = (rNorm - gNorm) / delta + 4;
    }

    hue *= 60;

    if (hue < 0) {
      hue += 360;
    }
  }

  return {
    h: hue,
    s: saturation * 100,
    b: brightness * 100,
    a
  };
};

const hexToRgbObj = (hex: HEX): RGBObject => {
  const raw = hex.slice(1);

  let r: number;
  let g: number;
  let b: number;
  let a: number | undefined;

  if (raw.length === 3 || raw.length === 4) {
    r = parseInt(raw[0] + raw[0], 16);
    g = parseInt(raw[1] + raw[1], 16);
    b = parseInt(raw[2] + raw[2], 16);

    if (raw.length === 4) {
      a = parseInt(raw[3] + raw[3], 16) / 255;
    }
  } else {
    r = parseInt(raw.slice(0, 2), 16);
    g = parseInt(raw.slice(2, 4), 16);
    b = parseInt(raw.slice(4, 6), 16);

    if (raw.length === 8) {
      a = parseInt(raw.slice(6, 8), 16) / 255;
    }
  }

  return a !== undefined ? { r, g, b, a } : { r, g, b };
};

const rgbObjToHex = (rgbObj: RGBObject): HEX => {
  const { r, g, b, a } = rgbObj;
  const toHex = (channel: number) => channel.toString(16).padStart(2, '0');
  const rHex = toHex(r);
  const gHex = toHex(g);
  const bHex = toHex(b);

  return a
    ? `#${rHex}${gHex}${bHex}${toHex(Math.round(a * 255))}`
    : `#${rHex}${gHex}${bHex}`;
};

export const hexToHsbObj = (hex: HEX): HSBObject => {
  const rgbObj = hexToRgbObj(hex);
  return rgbObjToHsbObj(rgbObj);
};

export const hsbObjToHex = (hsbObj: HSBObject): HEX => {
  const rgbObj = hsbObjToRgbObj(hsbObj);
  return rgbObjToHex(rgbObj);
};
