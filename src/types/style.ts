import { ColorType } from '@/types/color';
import { CSS_COLOR_PROPERTIES } from '@/constants/css-color-properties';
import { Responsive } from '@/types/breakpoint';

type CSSColorProperties = (typeof CSS_COLOR_PROPERTIES)[number];
type ResponsiveCSSProperties = {
  [K in keyof React.CSSProperties]?:
    | React.CSSProperties[K]
    | Responsive<React.CSSProperties[K]>;
};
type ResponsiveCSSColorProperties = Partial<
  Record<CSSColorProperties, ColorType | Responsive<ColorType>>
>;

export type StyleType = Omit<ResponsiveCSSProperties, CSSColorProperties> &
  ResponsiveCSSColorProperties;
