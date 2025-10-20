import { DesignSystemType } from './JinniProvider';
import { DEFAULT_BREAKPOINT } from '@/constants/breakpoint';
import { DEFAULT_COLOR_PALETTE, DEFAULT_COLOR_SCHEME } from '@/constants/color';
import { DEFAULT_TYPOGRAPHY } from '@/constants/typography';
import { DEFAULT_BOX_SHADOW } from '@/constants/boxShadow';
import {
  DEFAULT_WHITE_OVERLAY,
  DEFAULT_BLACK_OVERLAY
} from '@/constants/overlay';
import { DEFAULT_EASING_SET, DEFAULT_DURATION } from '@/constants/motion';
import { DEFAULT_FONT_WEIGHT } from '@/constants/fontWeight';
import { DEFAULT_Z_INDEX } from '@/constants/zIndex';

export const DEFAULT_DESIGN_SYSTEM: DesignSystemType = {
  theme: 'light',
  contrast: 'standard',
  breakpoint: DEFAULT_BREAKPOINT,
  color: {
    scheme: DEFAULT_COLOR_SCHEME,
    palette: DEFAULT_COLOR_PALETTE
  },
  typography: DEFAULT_TYPOGRAPHY,
  boxShadow: DEFAULT_BOX_SHADOW,
  whiteOverlay: DEFAULT_WHITE_OVERLAY,
  blackOverlay: DEFAULT_BLACK_OVERLAY,
  easing: DEFAULT_EASING_SET,
  duration: DEFAULT_DURATION,
  fontWeight: DEFAULT_FONT_WEIGHT,
  zIndex: DEFAULT_Z_INDEX
};
