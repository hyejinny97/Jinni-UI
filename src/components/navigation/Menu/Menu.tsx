import './Menu.scss';
import cn from 'classnames';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { Backdrop } from '@/components/feedback/Backdrop';
import { MenuList, MenuListProps } from '@/components/navigation/MenuList';
import { useClose } from './Menu.hooks';
import { PopperType, OriginType } from '@/types/popper';
import usePopperPosition from '@/hooks/usePopperPosition';

type CloseReason =
  | 'escapeKeydown'
  | 'backdropClick'
  | 'tabKeyDown'
  | 'backgroundClick';

type MenuPopperType = Omit<Partial<PopperType>, 'popperOrigin'> & {
  menuOrigin?: PopperType['popperOrigin'];
};

export type MenuProps<T extends AsType = 'div'> = DefaultComponentProps<T> &
  MenuPopperType & {
    children: Array<JSX.Element>;
    open: boolean;
    onClose?: (event: MouseEvent | KeyboardEvent, reason: CloseReason) => void;
    onClick?: (event: MouseEvent | KeyboardEvent) => void;
    MenuListProps?: Omit<MenuListProps, 'children'>;
    noBackdrop?: boolean;
  };

const DEFAULT_ANCHOR_ORIGIN = {
  horizontal: 'left',
  vertical: 'bottom'
} as OriginType;
const DEFAULT_MENU_ORIGIN = {
  horizontal: 'left',
  vertical: 'top'
} as OriginType;

const Menu = <T extends AsType = 'div'>(props: MenuProps<T>) => {
  const {
    children,
    open,
    onClose,
    onClick,
    MenuListProps,
    anchorReference = 'anchorEl',
    anchorElRef,
    anchorOrigin = DEFAULT_ANCHOR_ORIGIN,
    anchorPosition,
    menuOrigin = DEFAULT_MENU_ORIGIN,
    noBackdrop = false,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const menuListRef = useRef<HTMLElement>(null);
  const { popperRef: menuRef, popperPosition: menuPosition } =
    usePopperPosition({
      anchorReference,
      anchorElRef,
      anchorOrigin,
      anchorPosition,
      popperOrigin: menuOrigin,
      open
    });
  const newStyle = useStyle({
    ...menuPosition,
    transformOrigin: `${menuOrigin.vertical} ${menuOrigin.horizontal}`,
    ...style
  });
  useClose({ anchorElRef, menuRef, noBackdrop, onClose, onClick });

  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!onClose) return;
    onClose(e.nativeEvent, 'backdropClick');
  };

  const menu = (
    <Component
      ref={menuRef}
      className={cn('JinniMenu', className)}
      style={newStyle}
      onClick={onClick}
      {...rest}
    >
      <MenuList ref={menuListRef} {...MenuListProps}>
        {children}
      </MenuList>
    </Component>
  );

  if (noBackdrop) {
    return open && createPortal(menu, document.body);
  }

  return (
    <Backdrop open={open} invisible onClick={handleBackdropClick}>
      {menu}
    </Backdrop>
  );
};

export default Menu;
