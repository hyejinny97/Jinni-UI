import { createContext } from 'react';
import { BreakpointType } from '@/types/breakpoint';
import { JinniColorTheme, JinniColorPalette } from '@/types/color';
import { TypographyType, TypographySpec } from '@/types/typography';
import { ElevationLevelType } from '@/types/elevation';
import { ThemeModeType } from '@/types/theme-mode';

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
