import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { useDrawerContext } from '../Drawer';

export type DrawerBodyProps<T extends AsType = 'div'> =
  DefaultComponentProps<T>;

const DrawerBody = <T extends AsType = 'div'>(props: DrawerBodyProps<T>) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const drawerContext = useDrawerContext();
  const newStyle = useStyle(style);

  return (
    <Component
      id={drawerContext?.drawerBodyId}
      className={cn('JinniDrawerBody', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default DrawerBody;
