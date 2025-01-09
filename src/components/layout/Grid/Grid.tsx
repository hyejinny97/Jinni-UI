import './Grid.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { Responsive } from '@/types/breakpoint';

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

const Grid = <T extends AsType = 'div'>(props: GridProps<T>) => {
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
    gridRowGap: rowSpacing || spacing,
    gridColumnGap: columnSpacing || spacing,
    ...style
  });

  return (
    <Component
      className={cn('JinniGrid', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Grid;
