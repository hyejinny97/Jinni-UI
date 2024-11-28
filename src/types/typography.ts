import { TYPOGRAPHY } from '@/constants/typography';

export type TypographyType = (typeof TYPOGRAPHY)[number];

export type TypographySpec = Record<
  'fontSize' | 'lineHeight' | 'letterSpacing' | 'fontWeight',
  string
>;
