import { DesignSystemType } from './JinniProvider.types';
import { DEFAULT_BREAKPOINT } from '@/constants/breakpoint';
import { DEFAULT_COLOR_PALETTE, DEFAULT_COLOR_SCHEME } from '@/constants/color';
import { DEFAULT_TYPOGRAPHY } from '@/constants/typography';
import { DEFAULT_BOX_SHADOW } from '@/constants/boxShadow';
import { DEFAULT_OVERLAY_ALPHA } from '@/constants/overlay';
import { DEFAULT_EASING_SET, DEFAULT_DURATION } from '@/constants/motion';
import { DEFAULT_FONT_WEIGHT } from '@/constants/fontWeight';
import { DEFAULT_Z_INDEX } from '@/constants/zIndex';
import { DEFAULT_ROUND } from '@/constants/round';

export const DEFAULT_DESIGN_SYSTEM: DesignSystemType = {
  theme: 'light',
  contrast: 'standard',
  color: {
    scheme: DEFAULT_COLOR_SCHEME,
    palette: DEFAULT_COLOR_PALETTE
  },
  typography: DEFAULT_TYPOGRAPHY,
  breakpoint: DEFAULT_BREAKPOINT,
  overlayAlpha: DEFAULT_OVERLAY_ALPHA,
  boxShadow: DEFAULT_BOX_SHADOW,
  easing: DEFAULT_EASING_SET,
  duration: DEFAULT_DURATION,
  fontWeight: DEFAULT_FONT_WEIGHT,
  zIndex: DEFAULT_Z_INDEX,
  round: DEFAULT_ROUND
};
