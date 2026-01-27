import './ListItem.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useList } from '../List.hooks';

type ListItemProps<T extends AsType = 'li'> = DefaultComponentProps<T> & {
  children: React.ReactNode;
};

const ListItem = <T extends AsType = 'li'>(props: ListItemProps<T>) => {
  const { children, className, style, as: Component = 'li', ...rest } = props;
  const listContext = useList();
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniListItem', { dense: listContext?.dense }, className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default ListItem;
