import { useLayoutEffect, useMemo } from 'react';
import JinniContext, { JinniContextType } from '@/contexts/JinniContext';
import { BreakpointType } from '@/types/breakpoint';
import { JinniColorScheme, JinniColorPalette } from '@/types/color';
import { TypographyType, TypographySpec } from '@/types/typography';
import { ElevationLevelType, ElevationSpecType } from '@/types/elevation';
import { ThemeModeType } from '@/types/theme-mode';
import { EasingType, DurationType } from '@/types/motion';
import { ContrastType } from '@/types/contrast';
import { DEFAULT_DESIGN_SYSTEM } from './JinniProvider.constants';
import { ELEVATION_LEVELS } from '@/constants/elevation';
import { FontWeightType } from '@/types/fontWeight';
import { ZIndexType } from '@/types/zIndex';

export interface DesignSystemType {
  theme: ThemeModeType;
  contrast: ContrastType;
  breakpoint: Record<BreakpointType, number>;
  color: {
    scheme: Record<
      ThemeModeType,
      Record<ContrastType, Record<JinniColorScheme, string>>
    >;
    palette: Record<JinniColorPalette, string>;
  };
  typography: Record<TypographyType, TypographySpec>;
  boxShadow: Record<ElevationLevelType, string>;
  whiteOverlay: Record<ElevationLevelType, string>;
  blackOverlay: Record<ElevationLevelType, string>;
  easing: Record<EasingType, string>;
  duration: Record<DurationType, string>;
  fontWeight: Record<FontWeightType, number>;
  zIndex: Record<ZIndexType, number>;
}

interface JinniProviderProps {
  children: React.ReactNode;
  designSystem?: DesignSystemType;
}

const JinniProvider = ({
  children,
  designSystem = DEFAULT_DESIGN_SYSTEM
}: JinniProviderProps) => {
  const computedDesignSystem = useMemo<JinniContextType>(() => {
    const { theme, contrast, color, boxShadow, whiteOverlay } = designSystem;

    return {
      ...designSystem,
      color: {
        scheme: color.scheme[theme][contrast],
        palette: color.palette
      },
      elevation: ELEVATION_LEVELS.map((level) =>
        theme === 'dark'
          ? {
              'box-shadow': boxShadow[level],
              'background-image': whiteOverlay[level]
            }
          : {
              'box-shadow': boxShadow[level]
            }
      ).reduce(
        (acc, value, idx) => ({ ...acc, [idx]: value }),
        {} as JinniContextType['elevation']
      )
    };
  }, [designSystem]);

  useLayoutEffect(() => {
    const {
      theme,
      contrast,
      breakpoint,
      color: { scheme, palette },
      typography,
      boxShadow,
      whiteOverlay,
      blackOverlay,
      elevation,
      easing,
      duration,
      fontWeight,
      zIndex
    } = computedDesignSystem;
    const PREFIX = '--jinni';

    const themeCss = `${[PREFIX, 'theme'].join('-')}: ${theme};`;
    const contrastCss = `${[PREFIX, 'contrast'].join('-')}: ${contrast};`;
    const breakpointCss = Object.entries(breakpoint).map(
      ([key, value]) => `${[PREFIX, 'breakpoint', key].join('-')}: ${value};`
    );
    const colorSchemeCss = Object.entries(scheme).map(
      ([key, value]) => `${[PREFIX, 'color', key].join('-')}: ${value};`
    );
    const colorPaletteCss = Object.entries(palette).map(
      ([key, value]) => `${[PREFIX, 'color', key].join('-')}: ${value};`
    );
    const boxShadowCss = Object.entries(boxShadow).map(
      ([key, value]) => `${[PREFIX, 'box-shadow', key].join('-')}: ${value};`
    );
    const whiteOverlayCss = Object.entries(whiteOverlay).map(
      ([key, value]) => `${[PREFIX, 'white-overlay', key].join('-')}: ${value};`
    );
    const blackOverlayCss = Object.entries(blackOverlay).map(
      ([key, value]) => `${[PREFIX, 'black-overlay', key].join('-')}: ${value};`
    );
    const easingCss = Object.entries(easing).map(
      ([key, value]) => `${[PREFIX, 'easing', key].join('-')}: ${value};`
    );
    const durationCss = Object.entries(duration).map(
      ([key, value]) => `${[PREFIX, 'duration', key].join('-')}: ${value};`
    );
    const fontWeightCss = Object.entries(fontWeight).map(
      ([key, value]) => `${[PREFIX, 'font-weight', key].join('-')}: ${value};`
    );
    const zIndexCss = Object.entries(zIndex).map(
      ([key, value]) => `${[PREFIX, 'z-index', key].join('-')}: ${value};`
    );

    const typographySpecToString = (typographySpec: TypographySpec) => {
      return Object.entries(typographySpec)
        .map(([key, value]) => `${key}: ${value};`)
        .join('\n');
    };
    const typographyCss = Object.entries(typography).map(
      ([key, value]) => `.typo-${key} { ${typographySpecToString(value)} }`
    );
    const elevationSpecToString = (elevationSpec: ElevationSpecType) => {
      return Object.entries(elevationSpec)
        .map(([key, value]) => `${key}: ${value};`)
        .join('\n');
    };
    const elevationCss = Object.entries(elevation).map(
      ([key, value]) => `.elevation-${key} { ${elevationSpecToString(value)} }`
    );

    const rootCssVariables = [
      themeCss,
      contrastCss,
      ...breakpointCss,
      ...colorSchemeCss,
      ...colorPaletteCss,
      ...boxShadowCss,
      ...whiteOverlayCss,
      ...blackOverlayCss,
      ...easingCss,
      ...durationCss,
      ...fontWeightCss,
      ...zIndexCss
    ].join('\n');

    const styleEl = document.createElement('style');
    styleEl.classList.add('jinni-design-system');
    styleEl.textContent = `:root { ${rootCssVariables} }\n${typographyCss.join('\n')}\n${elevationCss.join('\n')}`;
    const { head } = document;
    const firstEl = head.firstChild;
    head.insertBefore(styleEl, firstEl);
    return () => {
      styleEl.remove();
    };
  }, [computedDesignSystem]);

  return (
    <JinniContext.Provider value={computedDesignSystem}>
      {children}
    </JinniContext.Provider>
  );
};

export default JinniProvider;
