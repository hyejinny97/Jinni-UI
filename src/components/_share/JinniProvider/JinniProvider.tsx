import JinniContext, { JinniValueType } from '@/contexts/JinniContext';
import { getJinniBreakPointValue } from '@/utils/breakpoint';
import { getJinniColorValue } from '@/utils/editColorStyle';
import { BREAKPOINTS } from '@/constants/breakpoint';
import { COLOR_THEME, COLOR_PALETTE } from '@/constants/color';

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
    }
  } as JinniValueType;

  return (
    <JinniContext.Provider value={value}>{children}</JinniContext.Provider>
  );
};

export default JinniProvider;
