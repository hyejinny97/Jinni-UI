import { BREAKPOINTS } from '@/constants/breakpoint';
import { Responsive, BreakpointType } from '@/types/breakpoint';

export const isResponsive = <T>(element: unknown): element is Responsive<T> => {
  if (!element || typeof element !== 'object') return false;
  return Object.keys(element).every((key) =>
    BREAKPOINTS.some((bp) => bp === key)
  );
};

export const editResponsive = <T>(
  value: Responsive<T>,
  breakpoint: BreakpointType
): T | undefined => {
  let bpIndex = BREAKPOINTS.indexOf(breakpoint);
  while (bpIndex >= 0) {
    const editedValue = value[BREAKPOINTS[bpIndex]];
    if (editedValue) return editedValue;
    bpIndex -= 1;
  }
};
