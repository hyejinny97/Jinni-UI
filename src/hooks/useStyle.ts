import { StyleType } from '@/types/style';
import { JinniColorTheme, JinniColorPalette } from '@/types/color';
import useBreakpoint from '@/hooks/useBreakpoint';
import useJinni from '@/hooks/useJinni';
import { BREAKPOINTS } from '@/constants/breakpoint';
import { COLOR_THEME, COLOR_PALETTE } from '@/constants/color';
import { TYPOGRAPHY } from '@/constants/typography';
import { Responsive, BreakpointType } from '@/types/breakpoint';
import { TypographyType } from '@/types/typography';

type DefaultStyleType = React.CSSProperties & {
  [key: string]: React.CSSProperties[keyof React.CSSProperties];
};

const isResponsive = <T>(element: unknown): element is Responsive<T> => {
  if (!element || typeof element !== 'object') return false;
  return Object.keys(element).every((key) =>
    BREAKPOINTS.some((bp) => bp === key)
  );
};
const isThemeColor = (
  value: StyleType[keyof StyleType]
): value is JinniColorTheme => COLOR_THEME.some((color) => color === value);
const isPaletteColor = (
  value: StyleType[keyof StyleType]
): value is JinniColorPalette => COLOR_PALETTE.some((color) => color === value);
const isTypography = (
  value: StyleType[keyof StyleType]
): value is TypographyType => TYPOGRAPHY.some((typo) => typo === value);

const editResponsive = <T>(
  value: Responsive<T>,
  breakpoint: BreakpointType
): T | undefined => {
  let bpIndex = BREAKPOINTS.indexOf(breakpoint);
  while (bpIndex >= 0) {
    const editedValue = value[BREAKPOINTS[bpIndex]];
    if (editedValue) return editedValue;
    bpIndex -= 1;
  }
};

const useStyle = (
  style: StyleType | undefined
): DefaultStyleType | undefined => {
  const {
    color: { theme, palette },
    typography
  } = useJinni();
  const breakpoint = useBreakpoint();

  if (!style) return;

  const editedStyle: DefaultStyleType = {};
  Object.entries(style).forEach(([key, value]) => {
    let editedValue = value;
    if (isResponsive(editedValue)) {
      const val = editResponsive(editedValue, breakpoint);
      if (!val) return;
      editedValue = val;
    }
    if (isThemeColor(editedValue)) {
      editedValue = theme[editedValue];
    }
    if (isPaletteColor(editedValue)) {
      editedValue = palette[editedValue];
    }
    if (key === 'typography' && isTypography(editedValue)) {
      const typographyStyle = typography[editedValue];
      Object.assign(editedStyle, typographyStyle);
      return;
    }
    editedStyle[key] = editedValue;
  });

  return editedStyle;
};

export default useStyle;
