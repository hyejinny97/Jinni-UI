import { createContext } from 'react';
import { BreakpointType } from '@/types/breakpoint';
import { JinniColorTheme, JinniColorPalette } from '@/types/color';

export interface JinniValueType {
  breakpoints: Record<BreakpointType, number>;
  color: {
    theme: Record<JinniColorTheme, string>;
    palette: Record<JinniColorPalette, string>;
  };
}

const JinniContext = createContext<JinniValueType | null>(null);

export default JinniContext;
