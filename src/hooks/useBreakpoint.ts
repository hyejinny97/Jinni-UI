import { useState, useEffect } from 'react';
import { BreakpointType } from '@/types/breakpoint';
import useJinni from '@/hooks/useJinni';

const getCurrentBreakpoint = (breakpoints: Record<BreakpointType, number>) => {
  const { xl, lg, md, sm } = breakpoints;
  const windowWidth = window.innerWidth;

  if (windowWidth >= xl) return 'xl';
  else if (windowWidth >= lg) return 'lg';
  else if (windowWidth >= md) return 'md';
  else if (windowWidth >= sm) return 'sm';
  else return 'xs';
};

const useBreakpoint = (): BreakpointType => {
  const { breakpoints } = useJinni();
  const initBreakpoint = getCurrentBreakpoint(breakpoints);
  const [breakpoint, setBreakpoint] = useState<BreakpointType>(initBreakpoint);

  useEffect(() => {
    const handleResize = () => {
      const currentBreakpoint = getCurrentBreakpoint(breakpoints);
      setBreakpoint(currentBreakpoint);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoints]);

  return breakpoint;
};

export default useBreakpoint;
