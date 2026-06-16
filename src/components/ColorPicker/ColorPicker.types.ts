import { HEX, CSSColorKeywords, JinniColor } from '@/types/color';

export type RGBObject = { r: number; g: number; b: number; a?: number };
export type HSBObject = { h: number; s: number; b: number; a?: number };

export type ColorValueType =
  | HEX
  | RGBObject
  | HSBObject
  | CSSColorKeywords
  | JinniColor
  | 'transparent';
