import { createContext } from 'react';
import { BreakpointType } from '@/types/breakpoint';
import { JinniColorScheme, JinniColorPalette } from '@/types/color';
import { TypographyType, TypographySpec } from '@/types/typography';
import { ElevationLevelType, ElevationSpecType } from '@/types/elevation';
import { ThemeModeType } from '@/types/theme-mode';
import { EasingType, DurationType } from '@/types/motion';
import { ContrastType } from '@/types/contrast';

export interface JinniContextType {
  theme: ThemeModeType;
  contrast: ContrastType;
  breakpoint: Record<BreakpointType | string, number>;
  color: {
    scheme: Record<JinniColorScheme | string, string>;
    palette: Record<JinniColorPalette | string, string>;
  };
  typography: Record<TypographyType | string, TypographySpec>;
  boxShadow: Record<ElevationLevelType | string, string>;
  whiteOverlay: Record<ElevationLevelType | string, string>;
  blackOverlay: Record<ElevationLevelType | string, string>;
  elevation: Record<ElevationLevelType | string, ElevationSpecType>;
  easing: Record<EasingType | string, string>;
  duration: Record<DurationType | string, string>;
}

const JinniContext = createContext<JinniContextType | null>(null);

export default JinniContext;
