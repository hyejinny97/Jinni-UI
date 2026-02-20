import { useCallback, useLayoutEffect, useRef } from 'react';
import { MasonryProps } from './Masonry';
import useBreakpoint from '@/hooks/useBreakpoint';
import { isResponsive, editResponsive } from '@/utils/responsive';
import { DEFAULT_COLUMNS, DEFAULT_SPACING } from './Masonry.constants';
import { isSameArr, padEndArray } from './Masonry.utils';

type UseOrderingType = Required<Pick<MasonryProps, 'children' | 'spacing'>> &
  Pick<MasonryProps, 'sequential'> & {
    columnsCount: number;
  };

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

export const useOrdering = ({
  children,
  spacing,
  sequential,
  columnsCount
}: UseOrderingType) => {
  const masonryElRef = useRef<HTMLElement>(null);
  const prevChildNodesRef = useRef<Element[]>([]);
  const gap = useSpacing({ spacing });

  const placeItems = useCallback(
    (nodesToOrder: Element[], startNodeIdx: number) => {
      let order = ((startNodeIdx + columnsCount) % columnsCount) + 1;
      nodesToOrder.forEach((node) => {
        const height = node.getBoundingClientRect().height;
        (node as HTMLElement).style.gridRow = `span ${Math.ceil(height) + gap}`;
        (node as HTMLElement).style.margin = `${gap / 2}px`;
        if (sequential) {
          (node as HTMLElement).style.gridColumn = `${order}`;
          order = ((order - 1) % columnsCount) + 1;
        }
      });
    },
    [columnsCount, gap, sequential]
  );

  useLayoutEffect(() => {
    const masonryEl = masonryElRef.current;
    if (!masonryEl) return;

    const prevChildNodes = prevChildNodesRef.current;
    const childNodes = [...masonryEl.children];

    if (
      prevChildNodes.length <= childNodes.length &&
      !isSameArr(prevChildNodes, childNodes)
    ) {
      const maxLength = Math.max(prevChildNodes.length, childNodes.length);
      const prevChildNodesPadded = padEndArray(prevChildNodes, maxLength, 1);
      const childNodesPadded = padEndArray(childNodes, maxLength, 1);
      const firstItemIdxChanged = prevChildNodesPadded.findIndex(
        (node, idx) => node !== childNodesPadded[idx]
      );
      if (firstItemIdxChanged !== -1) {
        placeItems(childNodes.slice(firstItemIdxChanged), firstItemIdxChanged);
      }
    }
    prevChildNodesRef.current = childNodes;
  }, [children, placeItems]);

  useLayoutEffect(() => {
    const masonryEl = masonryElRef.current;
    if (!masonryEl) return;

    const childNodes = [...masonryEl.children];
    const preBorderBoxSizes: ResizeObserverSize[] = [];

    const callback: ResizeObserverCallback = (entries) => {
      entries.forEach((entry) => {
        const nodeIdxResized = childNodes.findIndex(
          (childNode) => childNode === entry.target
        );
        if (!preBorderBoxSizes[nodeIdxResized]) {
          preBorderBoxSizes[nodeIdxResized] = entry.borderBoxSize[0];
          return;
        }

        const { blockSize, inlineSize } = entry.borderBoxSize[0];
        if (
          !(
            preBorderBoxSizes[nodeIdxResized]?.blockSize === blockSize &&
            preBorderBoxSizes[nodeIdxResized]?.inlineSize === inlineSize
          )
        ) {
          placeItems(childNodes.slice(nodeIdxResized), nodeIdxResized);
          preBorderBoxSizes[nodeIdxResized] = entry.borderBoxSize[0];
        }
      });
    };

    const resizeObserver = new ResizeObserver(callback);
    childNodes.forEach((node) => resizeObserver.observe(node));
    return () => {
      resizeObserver.disconnect();
    };
  }, [children, placeItems]);

  return { masonryElRef };
};
