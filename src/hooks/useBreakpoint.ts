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
  const { breakpoint } = useJinni();
  const [currentBreakpoint, setCurrentBreakpoint] = useState<BreakpointType>(
    getCurrentBreakpoint(breakpoint)
  );

  useEffect(() => {
    const handleResize = () => {
      setCurrentBreakpoint(getCurrentBreakpoint(breakpoint));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return currentBreakpoint;
};

export default useBreakpoint;
