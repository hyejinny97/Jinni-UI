import JinniContext, {
  JinniValueType,
  DesignSystemType
} from '@/contexts/JinniContext';
import { getJinniBreakPointValue } from '@/utils/breakpoint';
import { getJinniColorValue } from '@/utils/color';
import { getJinniTypographyValue } from '@/utils/typography';
import {
  getJinniWhiteOverlayValue,
  getJinniBlackOverlayValue
} from '@/utils/overlay';
import { getJinniBoxShadowValue } from '@/utils/boxShadow';
import { BREAKPOINTS } from '@/constants/breakpoint';
import { COLOR_THEME, COLOR_PALETTE } from '@/constants/color';
import { TYPOGRAPHY } from '@/constants/typography';
import { ELEVATION_LEVELS } from '@/constants/elevation';
import { ElevationLevelType } from '@/types/elevation';
import { ThemeModeType } from '@/types/theme-mode';

interface JinniProviderProps {
  children: React.ReactNode;
}

const JinniProvider = ({ children }: JinniProviderProps) => {
  const getThemeMode = (): ThemeModeType => {
    const rootEl = document.querySelector(':root');
    if (!rootEl) throw Error('root element를 가져오지 못함');
    return rootEl.classList.contains('dark') ? 'dark' : 'light';
  };

  const themeMode = getThemeMode();

  const designSystem = {
    breakpoints: BREAKPOINTS.reduce(
      (cul, bp) => ({ ...cul, [bp]: getJinniBreakPointValue(bp) }),
      {}
    ),
    color: {
      theme: COLOR_THEME.reduce(
        (cul, color) => ({ ...cul, [color]: getJinniColorValue(color) }),
        {}
      ),
      palette: COLOR_PALETTE.reduce(
        (cul, color) => ({ ...cul, [color]: getJinniColorValue(color) }),
        {}
      )
    },
    typography: TYPOGRAPHY.reduce(
      (cul, typo) => ({ ...cul, [typo]: getJinniTypographyValue(typo) }),
      {}
    ),
    boxShadow: ELEVATION_LEVELS.reduce(
      (cul, level) => ({ ...cul, [level]: getJinniBoxShadowValue(level) }),
      {}
    ),
    whiteOverlay: ELEVATION_LEVELS.reduce(
      (cul, level) => ({ ...cul, [level]: getJinniWhiteOverlayValue(level) }),
      {}
    ),
    blackOverlay: ELEVATION_LEVELS.reduce(
      (cul, level) => ({ ...cul, [level]: getJinniBlackOverlayValue(level) }),
      {}
    )
  } as DesignSystemType;

  const functions = {
    getElevation: (elevationLevel: ElevationLevelType) => {
      const { boxShadow, whiteOverlay } = designSystem;
      switch (themeMode) {
        case 'light':
          return {
            boxShadow: boxShadow[elevationLevel]
          };
        case 'dark':
          return {
            boxShadow: boxShadow[elevationLevel],
            backgroundImage: whiteOverlay[elevationLevel]
          };
      }
    }
  };

  const value = { themeMode, ...designSystem, ...functions } as JinniValueType;

  return (
    <JinniContext.Provider value={value}>{children}</JinniContext.Provider>
  );
};

export default JinniProvider;
