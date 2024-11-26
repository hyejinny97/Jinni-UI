import { ColorType } from '@/types/color';
import { CSS_COLOR_PROPERTIES } from '@/constants/css-color-properties';
import { Responsive } from '@/types/breakpoint';

type CSSColorProperties = (typeof CSS_COLOR_PROPERTIES)[number];

type BaseCSSProperties = Omit<React.CSSProperties, CSSColorProperties> &
  Partial<Record<CSSColorProperties, ColorType>>;
type ResponsiveCSSProperties = {
  [K in keyof BaseCSSProperties]?:
    | BaseCSSProperties[K]
    | Responsive<BaseCSSProperties[K]>;
};

export type StyleType = ResponsiveCSSProperties;
