import { StyleType } from '@/types/style';
import { JinniColorScheme, JinniColorPalette } from '@/types/color';
import useBreakpoint from '@/hooks/useBreakpoint';
import useJinni from '@/hooks/useJinni';
import { CSS_COLOR_PROPERTIES } from '@/constants/color';
import { COLOR_SCHEME, COLOR_PALETTE } from '@/constants/color';
import { TYPOGRAPHY } from '@/constants/typography';
import { ELEVATION_LEVELS } from '@/constants/elevation';
import { TypographyType } from '@/types/typography';
import { ElevationLevelType } from '@/types/elevation';
import { isResponsive, editResponsive } from '@/utils/responsive';
import { EASING_SET, DURATIONS } from '@/constants/motion';
import { EasingType, DurationType } from '@/types/motion';
import { kebabToCamelCase } from '@/utils/kebabToCamelCase';

type DefaultStyleType = React.CSSProperties & {
  [key: string]: React.CSSProperties[keyof React.CSSProperties];
};

const isInlineCssVariable = (key: string) => key.startsWith('--');
const isColorProperty = (key: string) =>
  CSS_COLOR_PROPERTIES.some((propName) => propName === key);
const isSchemeColor = (
  value: StyleType[keyof StyleType]
): value is JinniColorScheme => COLOR_SCHEME.some((color) => color === value);
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
const isTimingFunctionProperty = (key: string) =>
  key === 'transitionTimingFunction' || key === 'animationTimingFunction';
const isDurationProperty = (key: string) =>
  key === 'transitionDuration' || key === 'animationDuration';
const isEasingToken = (
  value: StyleType[keyof StyleType]
): value is EasingType => EASING_SET.some((easing) => easing === value);
const isDurationToken = (
  value: StyleType[keyof StyleType]
): value is DurationType => DURATIONS.some((duration) => duration === value);

const useStyle = (
  style: StyleType | undefined
): DefaultStyleType | undefined => {
  const {
    color: { scheme, palette },
    typography,
    boxShadow,
    whiteOverlay,
    blackOverlay,
    elevation,
    easing,
    duration
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
    if (
      (isColorProperty(key) || isInlineCssVariable(key)) &&
      isSchemeColor(editedValue)
    ) {
      editedStyle[key] = scheme[editedValue];
      return;
    }
    if (
      (isColorProperty(key) || isInlineCssVariable(key)) &&
      isPaletteColor(editedValue)
    ) {
      editedStyle[key] = palette[editedValue];
      return;
    }
    if (isTypography(key, editedValue)) {
      const typographyStyle = typography[editedValue];
      const typographyStyleInCamelCase: { [key: string]: string } = {};
      Object.entries(typographyStyle).forEach(([key, value]) => {
        typographyStyleInCamelCase[kebabToCamelCase(key)] = value;
      });
      Object.assign(editedStyle, typographyStyleInCamelCase);
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
      const elevationStyle = elevation[editedValue];
      const elevationStyleInCamelCase: { [key: string]: string } = {};
      Object.entries(elevationStyle).forEach(([key, value]) => {
        elevationStyleInCamelCase[kebabToCamelCase(key)] = value;
      });
      Object.assign(editedStyle, elevationStyleInCamelCase);
      return;
    }
    if (isTimingFunctionProperty(key) && isEasingToken(editedValue)) {
      editedStyle[key] = easing[editedValue];
      return;
    }
    if (isDurationProperty(key) && isDurationToken(editedValue)) {
      editedStyle[key] = duration[editedValue];
      return;
    }
    editedStyle[key] = editedValue;
  });

  return editedStyle;
};

export default useStyle;
