import './Popover.scss';
import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { Backdrop } from '@/components/feedback/Backdrop';
import { Box, BoxProps } from '@/components/layout/Box';
import { useKeydown } from './Popover.hooks';
import { PopperType, OriginType } from '@/types/popper';
import usePopperPosition from '@/hooks/usePopperPosition';

type CloseReason = 'escapeKeydown' | 'backdropClick';

type PopoverPopperType = Omit<Partial<PopperType>, 'popperOrigin'> & {
  popoverOrigin?: PopperType['popperOrigin'];
};

export type PopoverProps<T extends AsType = 'div'> = DefaultComponentProps<T> &
  PopoverPopperType & {
    children: React.ReactNode;
    open: boolean;
    onClose: (event: MouseEvent | KeyboardEvent, reason: CloseReason) => void;
    BoxProps?: BoxProps;
  };

const DEFAULT_ANCHOR_ORIGIN = {
  horizontal: 'left',
  vertical: 'bottom'
} as OriginType;
const DEFAULT_POPOVER_ORIGIN = {
  horizontal: 'left',
  vertical: 'top'
} as OriginType;

const Menu = <T extends AsType = 'div'>(props: PopoverProps<T>) => {
  const {
    children,
    open,
    onClose,
    BoxProps,
    anchorReference = 'anchorEl',
    anchorEl,
    anchorOrigin = DEFAULT_ANCHOR_ORIGIN,
    anchorPosition,
    popoverOrigin = DEFAULT_POPOVER_ORIGIN,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const { popperRef: popoverRef, popperPosition: popoverPosition } =
    usePopperPosition({
      anchorReference,
      anchorEl,
      anchorOrigin,
      anchorPosition,
      popperOrigin: popoverOrigin,
      open
    });
  const newStyle = useStyle({
    ...popoverPosition,
    transformOrigin: `${popoverOrigin.vertical} ${popoverOrigin.horizontal}`,
    ...style
  });
  useKeydown({ onClose });

  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    onClose(e.nativeEvent, 'backdropClick');
  };

  return (
    <Backdrop open={open} invisible onClick={handleBackdropClick}>
      <Component
        ref={popoverRef}
        className={cn('JinniPopover', className)}
        style={newStyle}
        {...rest}
      >
        <Box elevation={5} round={4} style={{ padding: '16px' }} {...BoxProps}>
          {children}
        </Box>
      </Component>
    </Backdrop>
  );
};

export default Menu;
