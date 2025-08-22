import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

type TableFooterProps<T extends AsType = 'tfoot'> =
  DefaultComponentProps<T> & {};

const TableFooter = <T extends AsType = 'tfoot'>(
  props: TableFooterProps<T>
) => {
  const {
    children,
    className,
    style,
    as: Component = 'tfoot',
    ...rest
  } = props;
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniTableFooter', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default TableFooter;
