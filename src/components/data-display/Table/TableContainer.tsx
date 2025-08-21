import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

export type TableContainerProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {};

const TableContainer = <T extends AsType = 'div'>(
  props: TableContainerProps<T>
) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniTableContainer', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default TableContainer;
