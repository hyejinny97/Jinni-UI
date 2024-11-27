import { StyleType } from '@/types/style';
import { JinniColorTheme, JinniColorPalette } from '@/types/color';
import { isResponsive } from '@/utils/isResponsive';
import useBreakpoint from '@/hooks/useBreakpoint';
import useJinni from '@/hooks/useJinni';
import { BREAKPOINTS } from '@/constants/breakpoint';
import { COLOR_THEME, COLOR_PALETTE } from '@/constants/color';
import { Responsive, BreakpointType } from '@/types/breakpoint';

type DefaultStyleType = React.CSSProperties & {
  [key: string]: React.CSSProperties[keyof React.CSSProperties];
};

const isThemeColor = (
  value: StyleType[keyof StyleType]
): value is JinniColorTheme => COLOR_THEME.some((color) => color === value);
const isPaletteColor = (
  value: StyleType[keyof StyleType]
): value is JinniColorPalette => COLOR_PALETTE.some((color) => color === value);

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
    color: { theme, palette }
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
    editedStyle[key] = editedValue;
  });

  return editedStyle;
};

export default useStyle;
