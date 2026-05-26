export const DEFAULT_BREAKPOINT = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536
} as const;

export const BREAKPOINTS = Object.keys(
  DEFAULT_BREAKPOINT
) as (keyof typeof DEFAULT_BREAKPOINT)[];
