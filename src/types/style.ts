import { ColorType } from '@/types/color';
import { CSS_COLOR_PROPERTIES } from '@/constants/color';
import { Responsive } from '@/types/breakpoint';
import { TypographyType } from '@/types/typography';
import { ElevationLevelType } from '@/types/elevation';
import { EasingType, DurationType } from '@/types/motion';

type CSSColorProperties = (typeof CSS_COLOR_PROPERTIES)[number];
type CSSVariable = { [key: `--${string}`]: string | number };
type Color = Partial<Record<CSSColorProperties, ColorType>>;
type Typography = {
  typography?: TypographyType;
};
type BoxShadow = {
  boxShadow?: ElevationLevelType | React.CSSProperties['boxShadow'];
};
type WhiteOverlay = { whiteOverlay?: ElevationLevelType };
type BlackOverlay = { blackOverlay?: ElevationLevelType };
type Elevation = { elevation?: ElevationLevelType };
type Easing = {
  transitionTimingFunction?: EasingType | string;
  animationTimingFunction?: EasingType | string;
};
type Duration = {
  transitionDuration?: DurationType | string;
  animationDuration?: DurationType | string;
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
  Duration;

type ResponsiveCSSProperties = {
  [K in keyof BaseCSSProperties]?:
    | BaseCSSProperties[K]
    | Responsive<BaseCSSProperties[K]>;
};

export type StyleType = ResponsiveCSSProperties;
