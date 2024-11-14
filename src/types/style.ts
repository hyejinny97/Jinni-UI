import { ColorType } from '@/types/color';
import { CSS_COLOR_PROPERTIES } from '@/constants/css-color-properties';

type CSSColorProperties = (typeof CSS_COLOR_PROPERTIES)[number];

export type CustomStyleType = Omit<React.CSSProperties, CSSColorProperties> &
  Partial<Record<CSSColorProperties, ColorType>>;
