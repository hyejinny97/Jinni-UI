import {
  ColorType,
  CSSColorKeywords,
  HEX,
  RGB,
  RGBA,
  HSL,
  HSLA
} from '@/types/color';
import { CSS_COLOR_KEYWORDS } from '@/constants/color';
import {
  RGB_REG_EX,
  RGBA_REG_EX,
  HSL_REG_EX,
  HSLA_REG_EX,
  isValidHexColor,
  isValidRgbColor,
  isValidRgbaColor,
  isValidHslColor,
  isValidHslaColor
} from '@/utils/colorValidation';
import { editColor } from './color';

// r/g/b: 0~255 integer, a: 0~1 number
type RgbaObject = { r: number; g: number; b: number; a: number };
// h: 0~360 number, s/l: 0~100 percent, a: 0~1 number
type HslaObject = { h: number; s: number; l: number; a: number };

const isHex = (value: string): value is HEX => value.startsWith('#');
const isRgb = (value: string): value is RGB => RGB_REG_EX.test(value);
const isRgba = (value: string): value is RGBA => RGBA_REG_EX.test(value);
const isHsl = (value: string): value is HSL => HSL_REG_EX.test(value);
const isHsla = (value: string): value is HSLA => HSLA_REG_EX.test(value);
const isColorKeyword = (value: string): value is CSSColorKeywords =>
  Object.keys(CSS_COLOR_KEYWORDS).some((keyword) => keyword === value);

const validateRgbaObject = (value: RgbaObject): RgbaObject => {
  const { r, g, b, a } = value;
  const isValidChannel = (channel: number) =>
    Number.isInteger(channel) && channel >= 0 && channel <= 255;
  const isValidAlpha = (alpha: number) =>
    !Number.isNaN(alpha) && alpha >= 0 && alpha <= 1;
  if (
    !(
      isValidChannel(r) &&
      isValidChannel(g) &&
      isValidChannel(b) &&
      isValidAlpha(a)
    )
  ) {
    throw new Error(
      `${JSON.stringify(value)}는 올바른 RgbaObject 형태가 아닙니다.\n- r/g/b: 0~255 integer\n- a: 0~1 number`
    );
  }
  return value;
};

const validateHslaObject = (value: HslaObject): HslaObject => {
  const { h, s, l, a } = value;
  const isValidHue = (h: number) => !Number.isNaN(h) && h >= 0 && h <= 360;
  const isValidPercent = (val: number) =>
    !Number.isNaN(val) && val >= 0 && val <= 100;
  const isValidAlpha = (alpha: number) =>
    !Number.isNaN(alpha) && alpha >= 0 && alpha <= 1;
  if (
    !(
      isValidHue(h) &&
      isValidPercent(s) &&
      isValidPercent(l) &&
      isValidAlpha(a)
    )
  ) {
    throw new Error(
      `${JSON.stringify(value)}는 올바른 HslaObject 형태가 아닙니다.\n- h: 0~360 number\n- s/l: 0~100 percent\n- a: 0~1 number`
    );
  }
  return value;
};

export const hexToRgbaObject = (value: HEX): RgbaObject => {
  if (!isValidHexColor(value)) {
    throw new Error(
      `${value}는 올바른 HEX 형태가 아닙니다.\n- 올바른 HEX 형태: #RRGGBB[AA], #RGB[A])\n- R/G/B/A는 16진수`
    );
  }
  let normalizedValue = value.replace(/[^0-9a-f]/gi, '');
  if (normalizedValue.length === 3 || normalizedValue.length === 4) {
    normalizedValue = [...normalizedValue]
      .map((char) => char.repeat(2))
      .join('');
  }
  if (normalizedValue.length === 6) {
    normalizedValue = normalizedValue + 'ff';
  }
  const decimal = parseInt(normalizedValue, 16);
  return validateRgbaObject({
    r: (decimal >> 24) & 255,
    g: (decimal >> 16) & 255,
    b: (decimal >> 8) & 255,
    a: (decimal & 255) / 255
  });
};

export const rgbToRgbaObject = (value: RGB | RGBA): RgbaObject => {
  if (!isValidRgbColor(value) && !isValidRgbaColor(value)) {
    throw new Error(
      `${value}는 올바른 RGB(RGBA) 형태가 아닙니다.\n- 올바른 RGB(RGBA) 형태: rgb(R, G, B), rgba(R, G, B, A)\n- R/G/B: 0~255 integer\n- A: 0~1 number`
    );
  }
  const isRgba = value.startsWith('rgba');
  const match = isRgba ? value.match(RGBA_REG_EX) : value.match(RGB_REG_EX);
  if (!match) throw new Error('올바른 형태의 rgb(rgba)가 아닙니다.');
  return validateRgbaObject({
    r: parseInt(match[1]),
    g: parseInt(match[2]),
    b: parseInt(match[3]),
    a: isRgba ? parseFloat(match[4]) : 1
  });
};

export const hslToRgbaObject = (value: HSL | HSLA): RgbaObject => {
  if (!isValidHslColor(value) && !isValidHslaColor(value)) {
    throw new Error(
      `${value}는 올바른 HSL(HSLA) 형태가 아닙니다.\n- 올바른 HSL(HSLA) 형태: hsl(H, S, L), hsla(H, S, L, A)\n- H: 0~360 number\n- S/L: 0~100 percent\n- A: 0~1 number`
    );
  }
  const isHsla = value.startsWith('hsla');
  const match = isHsla ? value.match(HSLA_REG_EX) : value.match(HSL_REG_EX);
  if (!match) throw new Error('올바른 형태의 HSL(HSLA)가 아닙니다.');
  const h = parseInt(match[1]);
  const s = parseInt(match[2]) / 100;
  const l = parseInt(match[3]) / 100;
  const a = isHsla ? parseFloat(match[4]) : 1;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hh = h / 60;
  const x = c * (1 - Math.abs((hh % 2) - 1));
  const m = l - c / 2;

  let tempR = 0,
    tempG = 0,
    tempB = 0;
  if (hh >= 0 && hh < 1) [tempR, tempG, tempB] = [c, x, 0];
  else if (hh >= 1 && hh < 2) [tempR, tempG, tempB] = [x, c, 0];
  else if (hh >= 2 && hh < 3) [tempR, tempG, tempB] = [0, c, x];
  else if (hh >= 3 && hh < 4) [tempR, tempG, tempB] = [0, x, c];
  else if (hh >= 4 && hh < 5) [tempR, tempG, tempB] = [x, 0, c];
  else if (hh >= 5 && hh < 6) [tempR, tempG, tempB] = [c, 0, x];

  return validateRgbaObject({
    r: Math.round((tempR + m) * 255),
    g: Math.round((tempG + m) * 255),
    b: Math.round((tempB + m) * 255),
    a
  });
};

export const cssColorKeywordToRgbaObject = (
  value: CSSColorKeywords
): RgbaObject => {
  const hex = CSS_COLOR_KEYWORDS[value];
  return hexToRgbaObject(hex);
};

export const transparentToRgbaObject = (): RgbaObject => {
  return validateRgbaObject({ r: 0, g: 0, b: 0, a: 0 });
};

export const toRgbaObject = (color: ColorType): RgbaObject => {
  const normalizedColor = editColor(color);
  if (normalizedColor === 'transparent') return transparentToRgbaObject();
  else if (isHex(normalizedColor)) return hexToRgbaObject(normalizedColor);
  else if (isRgb(normalizedColor) || isRgba(normalizedColor))
    return rgbToRgbaObject(normalizedColor);
  else if (isHsl(normalizedColor) || isHsla(normalizedColor))
    return hslToRgbaObject(normalizedColor);
  else if (isColorKeyword(normalizedColor))
    return cssColorKeywordToRgbaObject(normalizedColor);

  throw new Error(`Unsupported color format: ${color}`);
};

export const rgbaObjectToHex = (value: RgbaObject): HEX => {
  validateRgbaObject(value);
  const { r, g, b, a } = value;
  const channelToHex = (channel: number) =>
    channel.toString(16).padStart(2, '0');
  const alphaToHex = (alpha: number) =>
    (alpha * 255).toString(16).padStart(2, '0');
  return `#${channelToHex(r)}${channelToHex(g)}${channelToHex(b)}${alphaToHex(a)}`;
};

export const rgbaObjectToHslaObject = (value: RgbaObject): HslaObject => {
  validateRgbaObject(value);
  const { r, g, b, a } = value;
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let l = (max + min) / 2;

  let s = 0;
  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
  }

  let h = 0;
  if (delta !== 0) {
    if (max === rNorm) {
      h = ((gNorm - bNorm) / delta) % 6;
    } else if (max === gNorm) {
      h = (bNorm - rNorm) / delta + 2;
    } else {
      h = (rNorm - gNorm) / delta + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }

  return validateHslaObject({
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
    a
  });
};
