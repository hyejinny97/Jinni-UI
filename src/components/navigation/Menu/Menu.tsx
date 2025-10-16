import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Backdrop } from '@/components/feedback/Backdrop';
import { MenuList, MenuListProps } from '@/components/navigation/MenuList';
import { OriginType } from '@/types/popper';
import { Popper, PopperProps } from '@/components/_share/Popper';
import { useKeyboardAccessibility } from './Menu.hooks';

type CloseReason = 'escapeKeydown' | 'tabKeyDown' | 'backdropClick';

export type MenuProps<T extends AsType = 'div'> = Omit<
  Partial<PopperProps<T>>,
  'popperOrigin'
> & {
  menuOrigin?: PopperProps['popperOrigin'];
  open: boolean;
  onClose?: (event: MouseEvent | KeyboardEvent, reason: CloseReason) => void;
  MenuListProps?: Omit<MenuListProps, 'children'>;
  disableScroll?: boolean;
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
    MenuListProps,
    anchorReference = 'anchorEl',
    anchorElRef,
    anchorOrigin = DEFAULT_ANCHOR_ORIGIN,
    anchorPosition,
    menuOrigin = DEFAULT_MENU_ORIGIN,
    disableScroll = false,
    className,
    ...rest
  } = props;
  const { menuListElRef } = useKeyboardAccessibility({
    open,
    onClose,
    anchorElRef
  });

  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!onClose) return;
    onClose(e.nativeEvent, 'backdropClick');
  };

  return (
    <>
      <Backdrop
        open={open}
        invisible
        disableScroll={disableScroll}
        onClick={handleBackdropClick}
      />
      {open && (
        <Popper
          className={cn('JinniMenu', className)}
          anchorReference={anchorReference}
          anchorElRef={anchorElRef}
          anchorOrigin={anchorOrigin}
          anchorPosition={anchorPosition}
          popperOrigin={menuOrigin}
          {...rest}
        >
          <MenuList ref={menuListElRef} elevation={5} {...MenuListProps}>
            {children}
          </MenuList>
        </Popper>
      )}
    </>
  );
};

export default Menu;
