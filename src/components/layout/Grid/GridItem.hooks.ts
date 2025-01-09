import useBreakpoint from '@/hooks/useBreakpoint';
import { isResponsive, editResponsive } from '@/hooks/useStyle';
import { GridItemProps, DefaultSpanType } from './GridItem';

type UseGridItemAreaProps = Pick<
  GridItemProps,
  'rowSpan' | 'columnSpan' | 'rowStart' | 'rowEnd' | 'columnStart' | 'columnEnd'
>;

const transformSpan = (span: DefaultSpanType | undefined) => {
  if (!span) return { start: undefined, end: undefined };
  switch (span) {
    case 'auto':
      return { start: 'auto', end: 'auto' };
    case 'full':
      return { start: 1, end: -1 };
    default:
      return { start: `span ${span}`, end: `span ${span}` };
  }
};

export const useGridItemArea = ({
  rowSpan,
  columnSpan,
  rowStart,
  rowEnd,
  columnStart,
  columnEnd
}: UseGridItemAreaProps) => {
  const breakpoint = useBreakpoint();
  const newRowSpan = isResponsive(rowSpan)
    ? editResponsive(rowSpan, breakpoint)
    : rowSpan;
  const newColumnSpan = isResponsive(columnSpan)
    ? editResponsive(columnSpan, breakpoint)
    : columnSpan;

  const { start: defaultRowStart, end: defaultRowEnd } =
    transformSpan(newRowSpan);
  const { start: defaultColumnStart, end: defaultColumnEnd } =
    transformSpan(newColumnSpan);

  return {
    gridRowStart: rowStart || defaultRowStart,
    gridRowEnd: rowEnd || defaultRowEnd,
    gridColumnStart: columnStart || defaultColumnStart,
    gridColumnEnd: columnEnd || defaultColumnEnd
  };
};
