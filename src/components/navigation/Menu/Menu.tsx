import './Menu.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Backdrop } from '@/components/feedback/Backdrop';
import { MenuList, MenuListProps } from '@/components/navigation/MenuList';
import { OriginType } from '@/types/popper';
import { Popper, PopperProps } from '@/components/_share/Popper';
import { useKeyboardAccessibility } from './Menu.hooks';
import { Motion } from '@/components/motion/Motion';
import { AnimatePresence } from '@/components/motion/AnimatePresence';

type CloseReason = 'escapeKeyDown' | 'tabKeyDown' | 'backdropClick';

export type MenuProps<T extends AsType = 'div'> = Omit<
  Partial<PopperProps<T>>,
  'popperOrigin'
> & {
  menuOrigin?: PopperProps['popperOrigin'];
  open: boolean;
  onClose?: (event: MouseEvent | KeyboardEvent, reason: CloseReason) => void;
  MenuListProps?: MenuListProps;
  disableScroll?: boolean;
  TransitionComponent?: React.ComponentType<{ children: React.ReactNode }>;
};

const DEFAULT_ANCHOR_ORIGIN = {
  horizontal: 'left',
  vertical: 'bottom'
} as OriginType;
const DEFAULT_MENU_ORIGIN = {
  horizontal: 'left',
  vertical: 'top'
} as OriginType;

const ScaleFade = ({ children }: { children: React.ReactNode }) => {
  return (
    <Motion
      initial={{ transform: 'scale(0.9)', opacity: 0 }}
      animate={{ transform: 'scale(1)', opacity: 1 }}
      exit={{ transform: 'scale(0.9)', opacity: 0 }}
      transition="transform var(--jinni-duration-short3) var(--jinni-easing-emphasized), opacity var(--jinni-duration-short3) var(--jinni-easing-emphasized)"
    >
      {children}
    </Motion>
  );
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
    TransitionComponent = ScaleFade,
    className,
    style,
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
    <AnimatePresence>
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
            anchorReference={anchorReference}
            anchorElRef={anchorElRef}
            anchorOrigin={anchorOrigin}
            anchorPosition={anchorPosition}
            popperOrigin={menuOrigin}
            style={{
              '--transform-origin': `${menuOrigin.horizontal} ${menuOrigin.vertical}`,
              ...style
            }}
            {...rest}
          >
            <TransitionComponent>
              <MenuList ref={menuListElRef} elevation={5} {...MenuListProps}>
                {children}
              </MenuList>
            </TransitionComponent>
          </Popper>
        </>
      )}
    </AnimatePresence>
  );
};

export default Menu;
