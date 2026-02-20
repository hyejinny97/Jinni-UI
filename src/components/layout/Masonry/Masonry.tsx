import './Masonry.scss';
import React from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { Responsive } from '@/types/breakpoint';
import { useColumns, useOrdering } from './Masonry.hooks';
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
    sequential,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;

  const columnsCount = useColumns({ columns });
  const { masonryElRef } = useOrdering({
    children,
    spacing,
    sequential,
    columnsCount
  });
  const newStyle = useStyle({
    '--columns-count': columnsCount,
    ...style
  });

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
