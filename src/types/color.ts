import { COLOR_THEME, COLOR_PALETTE } from '@/constants/color';
import { CSS_COLOR_KEYWORDS } from '@/constants/color';

export type CSSColorKeywords = keyof typeof CSS_COLOR_KEYWORDS;
export type HEX = `#${string}`;
export type RGB = `rgb(${number},${number},${number})`;
export type RGBA = `rgba(${number},${number},${number},${number})`;

export type JinniColorTheme = (typeof COLOR_THEME)[number];
export type JinniColorPalette = (typeof COLOR_PALETTE)[number];
type JinniColor = JinniColorTheme | JinniColorPalette;

export type ColorType =
  | CSSColorKeywords
  | HEX
  | RGB
  | RGBA
  | JinniColor
  | 'transparent';
