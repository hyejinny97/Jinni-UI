import { useState, useEffect } from 'react';
import { BreakpointType } from '@/types/breakpoint';
import useJinni from '@/hooks/useJinni';

const getCurrentBreakpoint = (
  breakpoints: Record<BreakpointType, number>
): BreakpointType => {
  const bpArr = Object.entries(breakpoints) as Array<[BreakpointType, number]>;
  const bpSortedInDesc = bpArr.sort((bpA, bpB) => bpB[1] - bpA[1]);
  const windowWidth = window.innerWidth;

  for (const [bpType, bpValue] of bpSortedInDesc) {
    if (windowWidth >= bpValue) {
      return bpType;
    }
  }
  return bpSortedInDesc[bpSortedInDesc.length - 1][0];
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
