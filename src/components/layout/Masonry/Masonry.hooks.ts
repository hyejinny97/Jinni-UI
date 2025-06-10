import { MasonryProps } from './Masonry';
import useBreakpoint from '@/hooks/useBreakpoint';
import { isResponsive, editResponsive } from '@/utils/responsive';
import { DEFAULT_COLUMNS, DEFAULT_SPACING } from './Masonry.constants';

export const useSpacing = ({
  spacing
}: Required<Pick<MasonryProps, 'spacing'>>) => {
  const breakpoint = useBreakpoint();
  return isResponsive(spacing)
    ? editResponsive(spacing, breakpoint) || DEFAULT_SPACING
    : spacing;
};

export const useColumns = ({
  columns
}: Required<Pick<MasonryProps, 'columns'>>) => {
  const breakpoint = useBreakpoint();
  return isResponsive(columns)
    ? editResponsive(columns, breakpoint) || DEFAULT_COLUMNS
    : columns;
};
