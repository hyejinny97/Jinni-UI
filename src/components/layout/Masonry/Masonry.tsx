import './Masonry.scss';
import React, { useLayoutEffect, useRef } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { Responsive } from '@/types/breakpoint';
import { useSpacing, useColumns } from './Masonry.hooks';
import { DEFAULT_COLUMNS, DEFAULT_SPACING } from './Masonry.constants';

export type MasonryProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'children'
> & {
  children: React.ReactNode;
  columns?: number | Responsive<number>;
  spacing?: number | Responsive<number>;
  sequential?: boolean;
};

const Masonry = <T extends AsType = 'div'>(props: MasonryProps<T>) => {
  const {
    children,
    columns = DEFAULT_COLUMNS,
    spacing = DEFAULT_SPACING,
    sequential = false,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const masonryElRef = useRef<HTMLElement>(null);
  const gap = useSpacing({ spacing });
  const columnsCount = useColumns({ columns });
  const newStyle = useStyle({
    '--columnsCount': columnsCount,
    ...style
  });

  useLayoutEffect(() => {
    const masonryEl = masonryElRef.current;
    if (!masonryEl) return;
    const childNodes = [...masonryEl.children];

    const placeItems = () => {
      let order = 0;
      childNodes.forEach((node) => {
        const height = node.getBoundingClientRect().height;
        (node as HTMLElement).style.gridRow = `span ${Math.ceil(height) + gap}`;
        (node as HTMLElement).style.margin = `${gap / 2}px`;
        if (sequential) {
          (node as HTMLElement).style.gridColumn =
            `${(order % columnsCount) + 1}`;
        }
        order += 1;
      });
    };

    const resizeObserver = new ResizeObserver(placeItems);
    childNodes.forEach((node) => resizeObserver.observe(node));
    return () => {
      childNodes.forEach((node) => resizeObserver.unobserve(node));
    };
  }, [children, gap, sequential, columnsCount]);

  return (
    <Component
      ref={masonryElRef}
      className={cn('JinniMasonry', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Masonry;
