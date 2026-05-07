import { BreakpointType } from '@/types/breakpoint';
import { JinniColorScheme, JinniColorPalette } from '@/types/color';
import { TypographyType, TypographySpec } from '@/types/typography';
import { ElevationLevelType } from '@/types/elevation';
import { ThemeModeType } from '@/types/theme-mode';
import { EasingType, DurationType } from '@/types/motion';
import { ContrastType } from '@/types/contrast';
import { FontWeightType } from '@/types/fontWeight';
import { ZIndexType } from '@/types/zIndex';

export interface DesignSystemType {
  theme: ThemeModeType;
  contrast: ContrastType;
  breakpoint: Record<BreakpointType, number>;
  color: {
    scheme: Record<
      ThemeModeType,
      Record<ContrastType, Record<JinniColorScheme, string>>
    >;
    palette: Record<JinniColorPalette, string>;
  };
  typography: Record<TypographyType, TypographySpec>;
  boxShadow: Record<ElevationLevelType, string>;
  whiteOverlay: Record<ElevationLevelType, string>;
  blackOverlay: Record<ElevationLevelType, string>;
  easing: Record<EasingType, string>;
  duration: Record<DurationType, string>;
  fontWeight: Record<FontWeightType, number>;
  zIndex: Record<ZIndexType, number>;
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
