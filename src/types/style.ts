import { ColorType } from '@/types/color';
import { CSS_COLOR_PROPERTIES } from '@/constants/color';
import { Responsive } from '@/types/breakpoint';
import { TypographyType } from '@/types/typography';
import { ElevationLevelType } from '@/types/elevation';
import { EasingType, DurationType } from '@/types/motion';
import { OverlayAlphaType } from '@/types/overlay';
import { BoxShadowType } from '@/types/boxShadow';
import { FontWeightType } from '@/types/fontWeight';
import { ZIndexType } from '@/types/zIndex';

type CSSColorProperties = (typeof CSS_COLOR_PROPERTIES)[number];
type CSSVariable = { [key: `--${string}`]: string | number };
type Color = Partial<Record<CSSColorProperties, ColorType>>;
type Typography = {
  typography?: TypographyType;
};
type WhiteOverlay = { whiteOverlay?: OverlayAlphaType };
type BlackOverlay = { blackOverlay?: OverlayAlphaType };
type BoxShadow = {
  boxShadow?: BoxShadowType | React.CSSProperties['boxShadow'];
};
type Elevation = { elevation?: ElevationLevelType };
type Easing = {
  transitionTimingFunction?: EasingType | string;
  animationTimingFunction?: EasingType | string;
};
type Duration = {
  transitionDuration?: DurationType | string;
  animationDuration?: DurationType | string;
};
type FontWeight = {
  fontWeight?: FontWeightType | React.CSSProperties['fontWeight'];
};
type ZIndex = {
  zIndex?: ZIndexType | React.CSSProperties['zIndex'];
};

type BaseCSSProperties = Omit<
  React.CSSProperties,
  CSSColorProperties | 'boxShadow'
> &
  CSSVariable &
  Color &
  Typography &
  BoxShadow &
  WhiteOverlay &
  BlackOverlay &
  Elevation &
  Easing &
  Duration &
  FontWeight &
  ZIndex;

type ResponsiveCSSProperties = {
  [K in keyof BaseCSSProperties]?:
    | BaseCSSProperties[K]
    | Responsive<BaseCSSProperties[K]>;
};

export type StyleType = ResponsiveCSSProperties;
