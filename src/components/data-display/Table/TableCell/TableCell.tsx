import './TableCell.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useTableHead } from '../TableHead';
import { useTable } from '../Table.hooks';

type TableCellElement = 'td' | 'th';

type TableCellProps<T extends AsType = TableCellElement> =
  DefaultComponentProps<T> & {
    align?: 'left' | 'center' | 'right';
  };

const TableCell = <T extends AsType = TableCellElement>(
  props: TableCellProps<T>
) => {
  const isInTableHead = useTableHead();
  const {
    children,
    align = 'left',
    className,
    style,
    as: Component = isInTableHead ? 'th' : 'td',
    ...rest
  } = props;
  const tableContext = useTable();
  const newStyle = useStyle({
    '--table-cell-padding':
      tableContext?.size === 'small' ? '6px 16px' : '16px',
    ...style
  });

  return (
    <Component
      className={cn(
        'JinniTableCell',
        { bold: Component === 'th' },
        align,
        className
      )}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default TableCell;
