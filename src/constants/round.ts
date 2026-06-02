export const DEFAULT_ROUND = {
  none: '0px',
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  xxl: '28px',
  full: '1000px'
} as const;

export const ROUND = Object.keys(
  DEFAULT_ROUND
) as (keyof typeof DEFAULT_ROUND)[];
