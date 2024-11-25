import JinniContext from '@/contexts/JinniContext';
import { getJinniBreakPointValue } from '@/utils/breakpoint';

interface JinniProviderProps {
  children: React.ReactNode;
}

const JinniProvider = ({ children }: JinniProviderProps) => {
  const value = {
    breakpoints: {
      xs: getJinniBreakPointValue('xs'),
      sm: getJinniBreakPointValue('sm'),
      md: getJinniBreakPointValue('md'),
      lg: getJinniBreakPointValue('lg'),
      xl: getJinniBreakPointValue('xl')
    }
  };

  return (
    <JinniContext.Provider value={value}>{children}</JinniContext.Provider>
  );
};

export default JinniProvider;
