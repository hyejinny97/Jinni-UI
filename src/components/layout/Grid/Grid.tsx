import './Grid.scss';
import { forwardRef } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { Responsive } from '@/types/breakpoint';
import { transformNumberToPx } from './Grid.utils';

type GridTemplateType = number | 'auto' | Responsive<number | 'auto'>;
type SpacingType = number | string | Responsive<number | string>;

export type GridProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
  children: React.ReactNode;
  rows?: GridTemplateType;
  columns?: GridTemplateType;
  spacing?: SpacingType;
  rowSpacing?: SpacingType;
  columnSpacing?: SpacingType;
  flow?: 'row' | 'column' | 'dense' | 'row-dense' | 'column-dense';
};

const Grid = forwardRef(
  <T extends AsType = 'div'>(
    props: GridProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      rows = 'auto',
      columns = 'auto',
      spacing,
      rowSpacing,
      columnSpacing,
      flow = 'row',
      children,
      className,
      style,
      as: Component = 'div',
      ...rest
    } = props;
    const newStyle = useStyle({
      '--flow': flow.replace('-', ' '),
      '--rows': rows,
      '--columns': columns,
      '--grid-row-gap': transformNumberToPx(rowSpacing || spacing),
      '--grid-column-gap': transformNumberToPx(columnSpacing || spacing),
      ...style
    });

    return (
      <Component
        ref={ref}
        className={cn('JinniGrid', className)}
        style={newStyle}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

export default Grid;
