'use client';

import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { useSwipeableDrawerContext } from '../SwipeableDrawer';

export type SwipeableDrawerHeaderProps<T extends AsType = 'div'> =
  DefaultComponentProps<T>;

const SwipeableDrawerHeader = <T extends AsType = 'div'>(
  props: SwipeableDrawerHeaderProps<T>
) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const drawerContext = useSwipeableDrawerContext();
  const newStyle = useStyle(style);

  return (
    <Component
      id={drawerContext?.drawerHeaderId}
      className={cn('JinniSwipeableDrawerHeader', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default SwipeableDrawerHeader;
