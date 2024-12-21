import './Menu.scss';
import cn from 'classnames';
import { useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { Backdrop } from '@/components/feedback/Backdrop';
import MenuList, { MenuListProps } from './MenuList';
import useMenuPosition from './Menu.hooks';

export type OriginType = {
  horizontal: 'center' | 'left' | 'right' | number;
  vertical: 'bottom' | 'center' | 'top' | number;
};

type CloseReason = 'escapeKeydown' | 'backdropClick' | 'tabKeyDown';

export type MenuProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
  children: Array<JSX.Element>;
  open: boolean;
  onClose: (event: object, reason: CloseReason) => void;
  MenuListProps?: Omit<MenuListProps, 'children'>;
  anchorReference?: 'anchorEl' | 'anchorPosition';
  anchorEl?: HTMLElement | null;
  anchorOrigin?: OriginType;
  anchorPosition?: { left: number; top: number };
  menuOrigin?: OriginType;
};

const Menu = <T extends AsType = 'div'>(props: MenuProps<T>) => {
  const {
    children,
    open,
    onClose,
    MenuListProps,
    anchorReference = 'anchorEl',
    anchorEl,
    anchorOrigin: anchorOriginProp,
    anchorPosition,
    menuOrigin: menuOriginProp,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const menuListRef = useRef<HTMLElement>(null);
  const anchorOrigin = useMemo(
    () =>
      anchorOriginProp ||
      ({ horizontal: 'left', vertical: 'bottom' } as OriginType),
    [anchorOriginProp]
  );
  const menuOrigin = useMemo(
    () =>
      menuOriginProp || ({ horizontal: 'left', vertical: 'top' } as OriginType),
    [menuOriginProp]
  );
  const { menuRef, menuPosition } = useMenuPosition({
    anchorReference,
    anchorEl,
    anchorOrigin,
    anchorPosition,
    menuOrigin,
    open
  });
  const newStyle = useStyle({
    ...menuPosition,
    transformOrigin: `${menuOrigin.vertical} ${menuOrigin.horizontal}`,
    ...style
  });

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === 'Escape') {
        onClose(e, 'escapeKeydown');
      }
      if (e.key === 'Tab') {
        onClose(e, 'tabKeyDown');
      }
    };

    const handleClick = (e: MouseEvent) => {
      const clickedTarget = e.target as Node;
      const menuListEl = menuListRef.current;
      if (!menuListEl || menuListEl.contains(clickedTarget)) return;
      if (anchorEl && anchorEl.contains(clickedTarget)) return;
      onClose(e, 'backdropClick');
    };

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('click', handleClick);
    };
  }, [onClose, anchorEl]);

  return (
    <>
      {open &&
        createPortal(
          <Backdrop>
            <Component
              ref={menuRef}
              className={cn('JinniMenu', className)}
              style={newStyle}
              {...rest}
            >
              <MenuList ref={menuListRef} {...MenuListProps}>
                {children}
              </MenuList>
            </Component>
          </Backdrop>,
          document.body
        )}
    </>
  );
};

export default Menu;
