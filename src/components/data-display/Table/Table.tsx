import './Table.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import TableContext from './Table.contexts';

export type TableProps<T extends AsType = 'table'> =
  DefaultComponentProps<T> & {
    size?: 'medium' | 'small';
    stickyHeader?: boolean;
  };

const Table = <T extends AsType = 'table'>(props: TableProps<T>) => {
  const {
    children,
    size = 'medium',
    stickyHeader,
    className,
    style,
    as: Component = 'table',
    ...rest
  } = props;
  const newStyle = useStyle(style);

  return (
    <TableContext.Provider value={{ size, stickyHeader }}>
      <Component
        className={cn('JinniTable', { stickyHeader }, className)}
        style={newStyle}
        {...rest}
      >
        {children}
      </Component>
    </TableContext.Provider>
  );
};

export default Table;
