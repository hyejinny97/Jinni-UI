import './ListItem.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

type ListItemProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
  children: React.ReactNode;
};

const ListItem = <T extends AsType = 'div'>(props: ListItemProps<T>) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniListItem', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default ListItem;
