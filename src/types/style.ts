import { ColorType } from '@/types/color';
import { CSS_COLOR_PROPERTIES } from '@/constants/color';
import { Responsive } from '@/types/breakpoint';
import { TypographyType } from '@/types/typography';

type CSSColorProperties = (typeof CSS_COLOR_PROPERTIES)[number];

type BaseCSSProperties = Omit<React.CSSProperties, CSSColorProperties> &
  Partial<Record<CSSColorProperties, ColorType>> & {
    typography?: TypographyType;
  };
type ResponsiveCSSProperties = {
  [K in keyof BaseCSSProperties]?:
    | BaseCSSProperties[K]
    | Responsive<BaseCSSProperties[K]>;
};

export type StyleType = ResponsiveCSSProperties;
