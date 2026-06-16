import { useLayoutEffect, useState, useEffect, useMemo } from 'react';
import { JinniContextDesignSystemType } from '@/contexts/JinniContext';
import { TypographySpec } from '@/types/typography';
import { ElevationSpecType } from '@/types/elevation';
import { ThemeModeType } from '@/types/theme-mode';
import { ContrastType } from '@/types/contrast';
import { OverlayAlphaType } from '@/types/overlay';

type OverlayType = Record<OverlayAlphaType | string, string>;

export const useAddStyleTag = ({
  computedDesignSystem
}: {
  computedDesignSystem: JinniContextDesignSystemType;
}) => {
  useLayoutEffect(() => {
    const {
      color: { scheme, palette },
      typography,
      overlayAlpha,
      whiteOverlay,
      blackOverlay,
      boxShadow,
      elevation,
      easing,
      duration,
      fontWeight,
      zIndex,
      round
    } = computedDesignSystem;
    const PREFIX = '--jinni';

    const colorSchemeCss = Object.entries(scheme).map(
      ([key, value]) => `${[PREFIX, 'color', key].join('-')}: ${value};`
    );
    const colorPaletteCss = Object.entries(palette).map(
      ([key, value]) => `${[PREFIX, 'color', key].join('-')}: ${value};`
    );
    const boxShadowCss = Object.entries(boxShadow).map(
      ([key, value]) => `${[PREFIX, 'box-shadow', key].join('-')}: ${value};`
    );
    const overlayAlphaCss = Object.entries(overlayAlpha).map(
      ([key, value]) => `${[PREFIX, 'overlay-alpha', key].join('-')}: ${value};`
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
    const roundCss = Object.entries(round).map(
      ([key, value]) => `${[PREFIX, 'round', key].join('-')}: ${value};`
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
      ...colorSchemeCss,
      ...colorPaletteCss,
      ...overlayAlphaCss,
      ...whiteOverlayCss,
      ...blackOverlayCss,
      ...boxShadowCss,
      ...easingCss,
      ...durationCss,
      ...fontWeightCss,
      ...zIndexCss,
      ...roundCss
    ].join('\n');

    const prevStyleEl = document.querySelector(
      'head > style.jinni-design-system'
    );
    if (prevStyleEl !== null) {
      prevStyleEl.remove();
    }

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
};

export const useTheme = ({
  theme,
  useSystemColorScheme
}: {
  theme: ThemeModeType;
  useSystemColorScheme?: boolean;
}) => {
  const initTheme = useMemo<ThemeModeType>(() => {
    if (useSystemColorScheme) {
      const isDarkMode =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      return isDarkMode ? 'dark' : 'light';
    }
    return theme;
  }, [useSystemColorScheme, theme]);
  const [computedTheme, setComputedTheme] = useState<ThemeModeType>(initTheme);

  useEffect(() => {
    if (!useSystemColorScheme) return;

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMediaChange = (event: MediaQueryListEvent) => {
      const newColorScheme = event.matches ? 'dark' : 'light';
      setComputedTheme(newColorScheme);
    };

    media.addEventListener('change', handleMediaChange);
    return () => {
      media.removeEventListener('change', handleMediaChange);
    };
  }, [useSystemColorScheme]);

  const changeTheme = (themeToApply: ThemeModeType) => {
    setComputedTheme(themeToApply);
  };

  return { computedTheme, changeTheme };
};

export const useContrast = ({ contrast }: { contrast: ContrastType }) => {
  const [computedContrast, setComputedContrast] =
    useState<ContrastType>(contrast);

  const changeContrast = (contrastToApply: ContrastType) => {
    setComputedContrast(contrastToApply);
  };

  return { computedContrast, changeContrast };
};

export const useOverlay = ({
  overlayAlpha
}: {
  overlayAlpha: Record<OverlayAlphaType | string, number>;
}) => {
  const { whiteOverlay, blackOverlay } = useMemo(() => {
    const whiteOverlay = {} as OverlayType;
    const blackOverlay = {} as OverlayType;
    Object.entries(overlayAlpha).forEach(([key, alpha]) => {
      const overlayType = (Number(key) || key) as OverlayAlphaType | string;
      whiteOverlay[overlayType] = `linear-gradient(rgba(255,255,255,${alpha}))`;
      blackOverlay[overlayType] = `linear-gradient(rgba(0,0,0,${alpha}))`;
    });
    return { whiteOverlay, blackOverlay };
  }, [overlayAlpha]);

  return { whiteOverlay, blackOverlay };
};
