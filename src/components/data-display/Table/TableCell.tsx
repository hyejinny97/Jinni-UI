import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useTableHead } from './Table.hooks';

type TableCellElement = 'td' | 'th';

type TableCellProps<T extends AsType = TableCellElement> =
  DefaultComponentProps<T> & {
    align?: 'left' | 'center' | 'right';
  };

const TableCell = <T extends AsType = TableCellElement>(
  props: TableCellProps<T>
) => {
  const { children, align = 'left', className, style, as, ...rest } = props;
  const isInTableHead = useTableHead();
  const Component = as ?? (isInTableHead ? 'th' : 'td');
  const newStyle = useStyle(style);

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
