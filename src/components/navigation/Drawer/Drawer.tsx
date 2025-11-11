import './Drawer.scss';
import cn from 'classnames';
import { createPortal } from 'react-dom';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { Backdrop } from '@/components/feedback/Backdrop';
import { Box, BoxProps } from '@/components/layout/Box';
import { useKeyboardAccessibility } from './Drawer.hooks';

export type CloseReason = 'escapeKeydown' | 'backdropClick';

export type DrawerProps<
  T extends AsType = 'div',
  P extends AsType = 'div'
> = DefaultComponentProps<T> & {
  open?: boolean;
  onClose?: (event: React.SyntheticEvent | Event, reason: CloseReason) => void;
  children: React.ReactNode;
  variant?: 'temporary' | 'persistent' | 'permanent';
  anchorOrigin?: 'left' | 'right' | 'top' | 'bottom';
  container?: Element | DocumentFragment;
  BoxProps?: BoxProps<P>;
};

const Drawer = <T extends AsType = 'div', P extends AsType = 'div'>(
  props: DrawerProps<T, P>
) => {
  const {
    open,
    onClose,
    children,
    variant = 'temporary',
    anchorOrigin = 'left',
    container = document.body,
    BoxProps,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const { boxElRef } = useKeyboardAccessibility({
    open,
    onClose,
    variant
  });
  const newStyle = useStyle(style);

  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!onClose || variant !== 'temporary') return;
    onClose(e, 'backdropClick');
  };

  const content = (
    <Component
      className={cn('JinniDrawer', variant, anchorOrigin, className)}
      style={newStyle}
      {...rest}
    >
      <Box
        ref={boxElRef}
        className={cn(
          'JinniDrawerContent',
          open ? 'open' : 'close',
          anchorOrigin
        )}
        {...(variant === 'temporary' && { elevation: 15 })}
        {...BoxProps}
      >
        {children}
      </Box>
    </Component>
  );

  switch (variant) {
    case 'permanent':
    case 'persistent':
      return content;
    case 'temporary':
      return (
        <>
          {open &&
            createPortal(
              <div className="JinniDrawerContainer">
                <Backdrop
                  disablePortal
                  disableScroll
                  data-testid="drawer-backdrop"
                  onClick={handleBackdropClick}
                />
                {content}
              </div>,
              container
            )}
        </>
      );
  }
};

export default Drawer;
