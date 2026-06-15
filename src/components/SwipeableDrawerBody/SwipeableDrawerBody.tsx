import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { useSwipeableDrawerContext } from '../SwipeableDrawer';

export type SwipeableDrawerBodyProps<T extends AsType = 'div'> =
  DefaultComponentProps<T>;

const SwipeableDrawerBody = <T extends AsType = 'div'>(
  props: SwipeableDrawerBodyProps<T>
) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const drawerContext = useSwipeableDrawerContext();
  const newStyle = useStyle(style);

  return (
    <Component
      id={drawerContext?.drawerBodyId}
      className={cn('JinniSwipeableDrawerBody', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default SwipeableDrawerBody;
