import { Responsive } from '@/types/breakpoint';
import { BREAKPOINTS } from '@/constants/breakpoint';

export const isResponsive = <T>(element: unknown): element is Responsive<T> => {
  if (!element || typeof element !== 'object') return false;
  return Object.keys(element).every((key) =>
    BREAKPOINTS.some((bp) => bp === key)
  );
};
