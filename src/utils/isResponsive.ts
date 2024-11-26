import { Responsive } from '@/types/breakpoint';

export const isResponsive = <T>(element: unknown): element is Responsive<T> => {
  if (!element || typeof element !== 'object') return false;

  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];
  return Object.keys(element).every((key) => breakpoints.includes(key));
};
