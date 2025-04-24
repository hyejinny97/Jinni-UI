import './List.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

type ListProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
  children: React.ReactNode;
};

const List = <T extends AsType = 'div'>(props: ListProps<T>) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniList', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default List;
