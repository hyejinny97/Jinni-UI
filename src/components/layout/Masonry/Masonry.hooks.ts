import { MasonryProps } from './Masonry';
import useResponsive from '@/hooks/useResponsive';
import { DEFAULT_COLUMNS, DEFAULT_SPACING } from './Masonry.constants';

export const useSpacing = ({
  spacing
}: Required<Pick<MasonryProps, 'spacing'>>) => {
  const { isResponsive, editResponsive } = useResponsive();
  return isResponsive(spacing)
    ? editResponsive(spacing) || DEFAULT_SPACING
    : spacing;
};

export const useColumns = ({
  columns
}: Required<Pick<MasonryProps, 'columns'>>) => {
  const { isResponsive, editResponsive } = useResponsive();
  return isResponsive(columns)
    ? editResponsive(columns) || DEFAULT_COLUMNS
    : columns;
};
