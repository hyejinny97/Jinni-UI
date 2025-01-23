import './Drawer.scss';
import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { Backdrop } from '@/components/feedback/Backdrop';
import { Box, BoxProps } from '@/components/layout/Box';
import { useKeydown } from './Drawer.hooks';

export type CloseReason = 'escapeKeydown' | 'backdropClick';

export type DrawerProps<
  T extends AsType = 'div',
  P extends AsType = 'div'
> = DefaultComponentProps<T> & {
  open: boolean;
  onClose?: (event: React.SyntheticEvent | Event, reason: CloseReason) => void;
  children: React.ReactNode;
  anchor?: 'left' | 'right' | 'top' | 'bottom';
  DrawerContentProps?: BoxProps<P>;
};

const Drawer = <T extends AsType = 'div', P extends AsType = 'div'>(
  props: DrawerProps<T, P>
) => {
  const {
    open,
    onClose,
    children,
    anchor = 'left',
    DrawerContentProps,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const newStyle = useStyle(style);
  useKeydown({ onClose });

  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    const { target, currentTarget } = e;
    if (target !== currentTarget || !onClose) return;
    onClose(e, 'backdropClick');
  };

  return (
    <Backdrop open={open}>
      <Component
        className={cn('JinniDrawer', anchor, className)}
        style={newStyle}
        onClick={handleBackdropClick}
        {...rest}
      >
        <Box
          className="JinniDrawerContent"
          elevation={15}
          {...(DrawerContentProps as BoxProps<P>)}
        >
          {children}
        </Box>
      </Component>
    </Backdrop>
  );
};

export default Drawer;
