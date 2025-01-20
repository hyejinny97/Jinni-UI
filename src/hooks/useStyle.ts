import { StyleType } from '@/types/style';
import { JinniColorTheme, JinniColorPalette } from '@/types/color';
import useBreakpoint from '@/hooks/useBreakpoint';
import useJinni from '@/hooks/useJinni';
import { CSS_COLOR_PROPERTIES } from '@/constants/color';
import { COLOR_THEME, COLOR_PALETTE } from '@/constants/color';
import { TYPOGRAPHY } from '@/constants/typography';
import { ELEVATION_LEVELS } from '@/constants/elevation';
import { TypographyType } from '@/types/typography';
import { ElevationLevelType } from '@/types/elevation';
import { isResponsive, editResponsive } from '@/utils/responsive';

type DefaultStyleType = React.CSSProperties & {
  [key: string]: React.CSSProperties[keyof React.CSSProperties];
};

const isColorProperty = (key: string) =>
  CSS_COLOR_PROPERTIES.some((propName) => propName === key);
const isThemeColor = (
  value: StyleType[keyof StyleType]
): value is JinniColorTheme => COLOR_THEME.some((color) => color === value);
const isPaletteColor = (
  value: StyleType[keyof StyleType]
): value is JinniColorPalette => COLOR_PALETTE.some((color) => color === value);
const isTypography = (
  key: string,
  value: StyleType[keyof StyleType]
): value is TypographyType =>
  key === 'typography' && TYPOGRAPHY.some((typo) => typo === value);
const isBoxShadow = (key: string) => key === 'boxShadow';
const isWhiteOverlay = (key: string) => key === 'whiteOverlay';
const isBlackOverlay = (key: string) => key === 'blackOverlay';
const isElevation = (key: string) => key === 'elevation';
const isElevationLevel = (
  value: StyleType[keyof StyleType]
): value is ElevationLevelType =>
  ELEVATION_LEVELS.some((level) => level === value);

const useStyle = (
  style: StyleType | undefined
): DefaultStyleType | undefined => {
  const {
    color: { theme, palette },
    typography,
    boxShadow,
    whiteOverlay,
    blackOverlay,
    getElevation
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
    if (isColorProperty(key) && isThemeColor(editedValue)) {
      editedStyle[key] = theme[editedValue];
      return;
    }
    if (isColorProperty(key) && isPaletteColor(editedValue)) {
      editedStyle[key] = palette[editedValue];
      return;
    }
    if (isTypography(key, editedValue)) {
      const typographyStyle = typography[editedValue];
      Object.assign(editedStyle, typographyStyle);
      return;
    }
    if (isBoxShadow(key) && isElevationLevel(editedValue)) {
      editedStyle[key] = boxShadow[editedValue];
      return;
    }
    if (isWhiteOverlay(key) && isElevationLevel(editedValue)) {
      const val = whiteOverlay[editedValue];
      Object.assign(editedStyle, { backgroundImage: val });
      return;
    }
    if (isBlackOverlay(key) && isElevationLevel(editedValue)) {
      const val = blackOverlay[editedValue];
      Object.assign(editedStyle, { backgroundImage: val });
      return;
    }
    if (isElevation(key) && isElevationLevel(editedValue)) {
      const elevationStyle = getElevation(editedValue);
      Object.assign(editedStyle, elevationStyle);
      return;
    }
    editedStyle[key] = editedValue;
  });

  return editedStyle;
};

export default useStyle;
