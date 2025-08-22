import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

type TableBodyProps<T extends AsType = 'tbody'> = DefaultComponentProps<T> & {};

const TableBody = <T extends AsType = 'tbody'>(props: TableBodyProps<T>) => {
  const {
    children,
    className,
    style,
    as: Component = 'tbody',
    ...rest
  } = props;
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniTableBody', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default TableBody;
