import { COLOR_SCHEME, COLOR_PALETTE } from '@/constants/color';
import { CSS_COLOR_KEYWORDS } from '@/constants/color';

export type CSSColorKeywords = keyof typeof CSS_COLOR_KEYWORDS;
export type HEX = `#${string}`;
export type RGB = `rgb(${number},${number},${number})`;
export type RGBA = `rgba(${number},${number},${number},${number})`;
export type HSL = `hsl(${number},${number}%,${number}%)`;
export type HSLA = `hsla(${number},${number}%,${number}%,${number})`;

export type JinniColorScheme = (typeof COLOR_SCHEME)[number];
export type JinniColorPalette = (typeof COLOR_PALETTE)[number];
export type JinniColor = JinniColorScheme | JinniColorPalette;

export type ColorType =
  | CSSColorKeywords
  | HEX
  | RGB
  | RGBA
  | HSL
  | HSLA
  | JinniColor
  | 'transparent';
