import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

type TableRowProps<T extends AsType = 'tr'> = DefaultComponentProps<T> & {
  hover?: boolean;
  selected?: boolean;
};

const TableRow = <T extends AsType = 'tr'>(props: TableRowProps<T>) => {
  const {
    children,
    hover,
    selected,
    className,
    style,
    as: Component = 'tr',
    ...rest
  } = props;
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniTableRow', { hover, selected }, className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default TableRow;
