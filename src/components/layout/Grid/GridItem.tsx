import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { Responsive } from '@/types/breakpoint';
import { useGridItemArea } from './GridItem.hooks';

export type DefaultSpanType = 'auto' | number | 'full';
type SpanType = DefaultSpanType | Responsive<DefaultSpanType>;
type GridLineType = number | Responsive<number>;

export type GridItemProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    children: React.ReactNode;
    rowSpan?: SpanType;
    columnSpan?: SpanType;
    rowStart?: GridLineType;
    rowEnd?: GridLineType;
    columnStart?: GridLineType;
    columnEnd?: GridLineType;
  };

const GridItem = <T extends AsType = 'div'>(props: GridItemProps<T>) => {
  const {
    children,
    rowSpan = 'auto',
    columnSpan = 'auto',
    rowStart,
    rowEnd,
    columnStart,
    columnEnd,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const gridItemArea = useGridItemArea({
    rowSpan,
    columnSpan,
    rowStart,
    rowEnd,
    columnStart,
    columnEnd
  });
  const newStyle = useStyle({ ...gridItemArea, ...style });

  return (
    <Component
      className={cn('JinniGridItem', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default GridItem;
