import { BreakpointValue } from '@/types/breakpoint';
import { JinniColorScheme, JinniColorPalette } from '@/types/color';
import { TypographyType, TypographySpec } from '@/types/typography';
import { ThemeModeType } from '@/types/theme-mode';
import { EasingType, DurationType } from '@/types/motion';
import { ContrastType } from '@/types/contrast';
import { FontWeightType } from '@/types/fontWeight';
import { ZIndexType } from '@/types/zIndex';
import { OverlayAlphaType } from '@/types/overlay';
import { BoxShadowType } from '@/types/boxShadow';

export interface DesignSystemType {
  theme: ThemeModeType;
  contrast: ContrastType;
  color: {
    scheme: Record<
      ThemeModeType,
      Record<ContrastType, Record<JinniColorScheme | string, string>>
    >;
    palette: Record<JinniColorPalette | string, string>;
  };
  typography: Record<TypographyType | string, TypographySpec>;
  breakpoint: BreakpointValue;
  overlayAlpha: Record<OverlayAlphaType | string, number>;
  boxShadow: Record<BoxShadowType | string, string>;
  easing: Record<EasingType | string, string>;
  duration: Record<DurationType, string>;
  fontWeight: Record<FontWeightType, number>;
  zIndex: Record<ZIndexType, number>;
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
