import { TYPOGRAPHY } from '@/constants/typography';

export type TypographyType = (typeof TYPOGRAPHY)[number];

export type TypographySpec = Record<
  'font-size' | 'line-height' | 'letter-spacing' | 'font-weight',
  string
>;
