import { ColorType, CSSColorKeywords, HEX, RGB, RGBA } from '@/types/color';
import { CSS_COLOR_KEYWORDS } from '@/utils/cssColorKeywords';
import { editColor } from './editColorStyle';

type RgbObject = { r: number; g: number; b: number };

const rgbRegEx = /^rgb(a?)\((\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s]+([\d.]+))?\)$/;
const isHex = (value: string): value is HEX => value.startsWith('#');
const isRgb = (value: string): value is RGB | RGBA => rgbRegEx.test(value);
const isColorKeyword = (value: string): value is CSSColorKeywords =>
  Object.keys(CSS_COLOR_KEYWORDS).some((keyword) => keyword === value);

const hexToRgbObject = (hex: HEX): RgbObject => {
  let normalizedHex = hex.replace(/[^0-9a-f]/gi, '');
  if (hex.length === 3) {
    normalizedHex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  const decimal = parseInt(normalizedHex, 16);
  return {
    r: (decimal >> 16) & 255,
    g: (decimal >> 8) & 255,
    b: decimal & 255
  };
};

const rgbToRgbObject = (rgb: RGB | RGBA): RgbObject => {
  const rgbMatch = rgb.match(rgbRegEx);
  if (!rgbMatch) throw new Error('올바른 형태의 rgb(rgba) color가 아닙니다.');
  return {
    r: parseInt(rgbMatch[2]),
    g: parseInt(rgbMatch[3]),
    b: parseInt(rgbMatch[4])
  };
};

const cssColorKeywordToRgbObject = (keyword: CSSColorKeywords): RgbObject => {
  const hex = CSS_COLOR_KEYWORDS[keyword];
  return hexToRgbObject(hex);
};

const toRgbObject = (color: ColorType): RgbObject => {
  const normalizedColor = editColor(color);
  if (isHex(normalizedColor)) return hexToRgbObject(normalizedColor);
  if (isRgb(normalizedColor)) return rgbToRgbObject(normalizedColor);
  if (isColorKeyword(normalizedColor))
    return cssColorKeywordToRgbObject(normalizedColor);

  throw new Error(`Unsupported color format: ${color}`);
};

const rgbObjectToHex = ({ r, g, b }: RgbObject): HEX => {
  const toHex = (val: number) =>
    Math.max(0, Math.min(255, val)).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const adjustLuminance = (color: ColorType, luminance: number): HEX => {
  if (luminance < -1 || luminance > 1) {
    throw new Error('luminance는 반드시 -1과 1 사이여야 합니다.');
  }

  const adjustChannel = (channel: number, luminance: number): number =>
    Math.round(channel + (255 - channel) * luminance);

  const { r, g, b } = toRgbObject(color);
  const adjustedColor = {
    r: adjustChannel(r, luminance),
    g: adjustChannel(g, luminance),
    b: adjustChannel(b, luminance)
  };

  return rgbObjectToHex(adjustedColor);
};

export const lighten = (color: ColorType, luminance: number) =>
  adjustLuminance(color, luminance);
export const darken = (color: ColorType, luminance: number) =>
  adjustLuminance(color, -luminance);
