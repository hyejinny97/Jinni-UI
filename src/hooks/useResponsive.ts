import { useCallback, useMemo } from 'react';
import useJinni from '@/hooks/useJinni';
import useBreakpoint from '@/hooks/useBreakpoint';
import { Responsive, BreakpointType } from '@/types/breakpoint';

const useResponsive = () => {
  const { breakpoint } = useJinni();
  const currentBreakpoint = useBreakpoint();

  const { bpTypes, bpTypesSortedInAsc } = useMemo(() => {
    const bpTypes = Object.keys(breakpoint) as BreakpointType[];
    const bpTypesSortedInAsc = bpTypes.sort(
      (typeA, typeB) => breakpoint[typeA] - breakpoint[typeB]
    );
    return { bpTypes, bpTypesSortedInAsc };
  }, [breakpoint]);

  const isResponsive = useCallback(
    <T>(element: unknown): element is Responsive<T> => {
      if (!element || typeof element !== 'object') return false;
      return Object.keys(element).every((key) =>
        bpTypes.some((bp) => bp === key)
      );
    },
    [bpTypes]
  );

  const editResponsive = useCallback(
    <T>(value: Responsive<T>): T | undefined => {
      let bpIndex = bpTypesSortedInAsc.indexOf(currentBreakpoint);
      while (bpIndex >= 0) {
        const editedValue = value[bpTypesSortedInAsc[bpIndex]];
        if (editedValue) return editedValue;
        bpIndex -= 1;
      }
    },
    [bpTypesSortedInAsc, currentBreakpoint]
  );

  return { isResponsive, editResponsive };
};

export default useResponsive;
