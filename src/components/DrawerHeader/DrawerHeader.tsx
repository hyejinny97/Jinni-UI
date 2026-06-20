'use client';

import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { useDrawerContext } from '../Drawer';

export type DrawerHeaderProps<T extends AsType = 'div'> =
  DefaultComponentProps<T>;

const DrawerHeader = <T extends AsType = 'div'>(
  props: DrawerHeaderProps<T>
) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const drawerContext = useDrawerContext();
  const newStyle = useStyle(style);

  return (
    <Component
      id={drawerContext?.drawerHeaderId}
      className={cn('JinniDrawerHeader', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default DrawerHeader;
