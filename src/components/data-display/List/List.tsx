import './List.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import ListContext from './List.contexts';

export type ListProps<T extends AsType = 'ul'> = DefaultComponentProps<T> & {
  children: React.ReactNode;
  dense?: boolean;
};

const List = <T extends AsType = 'ul'>(props: ListProps<T>) => {
  const {
    children,
    dense = false,
    className,
    style,
    as: Component = 'ul',
    ...rest
  } = props;
  const newStyle = useStyle(style);

  return (
    <ListContext.Provider value={{ dense }}>
      <Component
        className={cn('JinniList', className)}
        style={newStyle}
        {...rest}
      >
        {children}
      </Component>
    </ListContext.Provider>
  );
};

export default List;
