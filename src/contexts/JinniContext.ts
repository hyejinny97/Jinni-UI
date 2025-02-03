import { createContext } from 'react';
import { BreakpointType } from '@/types/breakpoint';
import { JinniColorTheme, JinniColorPalette } from '@/types/color';
import { TypographyType, TypographySpec } from '@/types/typography';
import { ElevationLevelType } from '@/types/elevation';
import { ThemeModeType } from '@/types/theme-mode';
import { EasingType, DurationType } from '@/types/motion';

type ThemeType = {
  themeMode: ThemeModeType;
};

export type DesignSystemType = {
  breakpoints: Record<BreakpointType, number>;
  color: {
    theme: Record<JinniColorTheme, string>;
    palette: Record<JinniColorPalette, string>;
  };
  typography: Record<TypographyType, TypographySpec>;
  boxShadow: Record<ElevationLevelType, string>;
  whiteOverlay: Record<ElevationLevelType, string>;
  blackOverlay: Record<ElevationLevelType, string>;
  easing: Record<EasingType, string>;
  duration: Record<DurationType, string>;
};

type FunctionsType = {
  getElevation: (elevationLevel: ElevationLevelType) => {
    boxShadow: string;
    backgroundImage?: string;
  };
};

export type JinniValueType = ThemeType & DesignSystemType & FunctionsType;

const JinniContext = createContext<JinniValueType | null>(null);

export default JinniContext;
