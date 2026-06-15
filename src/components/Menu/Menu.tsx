import './Menu.scss';
import cn from 'classnames';
import { Fragment } from 'react';
import { AsType } from '@/types/default-component-props';
import Backdrop from '@/components/Backdrop';
import MenuList, { MenuListProps } from '@/components/MenuList';
import Popper, { PopperProps } from '@/components/Popper';
import { useKeyboardAccessibility } from './Menu.hooks';
import { DistributiveOmit } from '@/types/distributiveOmit';

export type CloseReason = 'escapeKeyDown' | 'tabKeyDown' | 'backdropClick';

export type MenuProps<T extends AsType = 'div'> = DistributiveOmit<
  PopperProps<T>,
  'popperOrigin'
> & {
  menuOrigin?: PopperProps['popperOrigin'];
  open: boolean;
  onClose?: (event: MouseEvent | KeyboardEvent, reason: CloseReason) => void;
  MenuListProps?: MenuListProps;
  disableScroll?: boolean;
  disableMenuListFocused?: boolean;
  WrapperComponent?: React.ComponentType<{ children: React.ReactNode }>;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  TransitionComponent?: React.ComponentType<any>;
};

const DEFAULT_ANCHOR_ORIGIN: PopperProps['anchorOrigin'] = {
  horizontal: 'left',
  vertical: 'bottom'
};
const DEFAULT_MENU_ORIGIN: PopperProps['popperOrigin'] = {
  horizontal: 'left',
  vertical: 'top'
};

const Menu = <T extends AsType = 'div'>(props: MenuProps<T>) => {
  const {
    children,
    open,
    onClose,
    MenuListProps,
    anchorReference = 'anchorEl',
    anchorElRef,
    anchorOrigin = DEFAULT_ANCHOR_ORIGIN,
    anchorPosition,
    menuOrigin = DEFAULT_MENU_ORIGIN,
    disableScroll = false,
    disableMenuListFocused,
    WrapperComponent = Fragment,
    TransitionComponent,
    className,
    style,
    ...rest
  } = props;
  const { menuListElRef } = useKeyboardAccessibility({
    open,
    onClose,
    anchorElRef,
    disableMenuListFocused
  });

  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!onClose) return;
    onClose(e.nativeEvent, 'backdropClick');
  };

  const popperAnchorProps: PopperProps =
    anchorReference === 'anchorEl'
      ? {
          anchorReference: 'anchorEl',
          anchorElRef: anchorElRef!,
          anchorOrigin
        }
      : {
          anchorReference: 'anchorPosition',
          anchorPosition: anchorPosition!
        };

  return (
    <WrapperComponent>
      {open && (
        <>
          <Backdrop
            invisible
            disableScroll={disableScroll}
            onClick={handleBackdropClick}
            data-testid="menu-backdrop"
          />
          <Popper
            className={cn('JinniMenu', className)}
            as={TransitionComponent}
            {...popperAnchorProps}
            popperOrigin={menuOrigin}
            style={{
              '--transform-origin': `${menuOrigin.horizontal} ${menuOrigin.vertical}`,
              ...style
            }}
            {...rest}
          >
            <MenuList ref={menuListElRef} elevation={5} {...MenuListProps}>
              {children}
            </MenuList>
          </Popper>
        </>
      )}
    </WrapperComponent>
  );
};

export default Menu;
