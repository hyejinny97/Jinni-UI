import { Responsive } from '@/types/breakpoint';

export const insertDivider = (
  children: React.ReactNode,
  divider: React.ReactNode
): React.ReactNode => {
  if (!children || !Array.isArray(children) || !divider) return children;

  const isLastChild = (idx: number) => idx === children.length - 1;
  return children
    .flatMap((child, idx) => (isLastChild(idx) ? [child] : [child, divider]))
    .map((child, idx) => ({ ...child, key: idx }));
};

export const isResponsive = <T>(element: unknown): element is Responsive<T> => {
  if (!element || typeof element !== 'object') return false;

  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];
  return Object.keys(element).every((key) => breakpoints.includes(key));
};
