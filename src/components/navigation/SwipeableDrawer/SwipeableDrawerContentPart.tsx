import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { useSwipeableDrawerContext } from './SwipeableDrawer.hooks';

export type SwipeableDrawerContentPartProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    partName?: 'Header' | 'Body' | 'Footer';
    children: React.ReactNode;
  };

const SwipeableDrawerContentPart = <T extends AsType = 'div'>(
  props: SwipeableDrawerContentPartProps<T>
) => {
  const {
    partName,
    children,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const drawerContext = useSwipeableDrawerContext();
  const newStyle = useStyle(style);

  let id = undefined;
  switch (partName) {
    case 'Header':
      id = drawerContext?.drawerHeaderId;
      break;
    case 'Body':
      id = drawerContext?.drawerBodyId;
  }

  return (
    <Component
      id={id}
      className={cn(`JinniSwipeableDrawer${partName}`, className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export const SwipeableDrawerHeader = (props: SwipeableDrawerContentPartProps) =>
  SwipeableDrawerContentPart({ partName: 'Header', ...props });

export const SwipeableDrawerBody = (props: SwipeableDrawerContentPartProps) =>
  SwipeableDrawerContentPart({ partName: 'Body', ...props });

export const SwipeableDrawerFooter = (props: SwipeableDrawerContentPartProps) =>
  SwipeableDrawerContentPart({ partName: 'Footer', ...props });
