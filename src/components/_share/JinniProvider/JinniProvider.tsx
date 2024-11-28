import JinniContext, { JinniValueType } from '@/contexts/JinniContext';
import { getJinniBreakPointValue } from '@/utils/breakpoint';
import { getJinniColorValue } from '@/utils/color';
import { getJinniTypographyValue } from '@/utils/typography';
import { BREAKPOINTS } from '@/constants/breakpoint';
import { COLOR_THEME, COLOR_PALETTE } from '@/constants/color';
import { TYPOGRAPHY } from '@/constants/typography';

interface JinniProviderProps {
  children: React.ReactNode;
}

const JinniProvider = ({ children }: JinniProviderProps) => {
  const value = {
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
    )
  } as JinniValueType;

  return (
    <JinniContext.Provider value={value}>{children}</JinniContext.Provider>
  );
};

export default JinniProvider;
