import './TableHead.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { TableHeadContext } from './TableHead.contexts';
import { useTable } from '../Table.hooks';

type TableHeadProps<T extends AsType = 'thead'> = DefaultComponentProps<T> & {};

const TableHead = <T extends AsType = 'thead'>(props: TableHeadProps<T>) => {
  const {
    children,
    className,
    style,
    as: Component = 'thead',
    ...rest
  } = props;
  const tableContext = useTable();
  const newStyle = useStyle(style);

  return (
    <TableHeadContext.Provider value={true}>
      <Component
        className={cn(
          'JinniTableHead',
          { stickyHeader: tableContext?.stickyHeader },
          className
        )}
        style={newStyle}
        {...rest}
      >
        {children}
      </Component>
    </TableHeadContext.Provider>
  );
};

export default TableHead;
