import { StackProps } from './Stack';
import { isNumber } from '@/utils/isNumber';
import { BreakpointType, Responsive } from '@/types/breakpoint';

export const computeChildren = (
  children: React.ReactNode,
  divider: React.ReactNode
): React.ReactNode => {
  if (!children || !Array.isArray(children) || !divider) return children;

  const isLastChild = (idx: number) => idx === children.length - 1;
  return children
    .flatMap((child, idx) => (isLastChild(idx) ? [child] : [child, divider]))
    .map((child, idx) => ({ ...child, key: child.key || idx }));
};

export const computeSpacing = (spacing: NonNullable<StackProps['spacing']>) => {
  if (isNumber(spacing)) return `${spacing}px`;

  const computedSpacing: Responsive<string> = {};
  Object.keys(spacing).forEach((key) => {
    const breakpointKey = key as BreakpointType;
    computedSpacing[breakpointKey] = `${spacing[breakpointKey]}px`;
  });
  return computedSpacing;
};
