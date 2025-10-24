import './Popover.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Backdrop } from '@/components/feedback/Backdrop';
import { Box, BoxProps } from '@/components/layout/Box';
import { useKeyboardAccessibility } from './Popover.hooks';
import { OriginType } from '@/types/popper';
import { Popper, PopperProps } from '@/components/_share/Popper';

type CloseReason = 'escapeKeydown' | 'backdropClick';

export type PopoverProps<T extends AsType = 'div'> = Omit<
  Partial<PopperProps<T>>,
  'popperOrigin'
> & {
  popoverOrigin?: PopperProps['popperOrigin'];
  open: boolean;
  onClose?: (event: MouseEvent | KeyboardEvent, reason: CloseReason) => void;
  BoxProps?: BoxProps;
  disableScroll?: boolean;
};

const DEFAULT_ANCHOR_ORIGIN = {
  horizontal: 'left',
  vertical: 'bottom'
} as OriginType;
const DEFAULT_POPOVER_ORIGIN = {
  horizontal: 'left',
  vertical: 'top'
} as OriginType;

const Popover = <T extends AsType = 'div'>(props: PopoverProps<T>) => {
  const {
    children,
    open,
    onClose,
    BoxProps,
    anchorReference = 'anchorEl',
    anchorElRef,
    anchorOrigin = DEFAULT_ANCHOR_ORIGIN,
    anchorPosition,
    popoverOrigin = DEFAULT_POPOVER_ORIGIN,
    disableScroll = false,
    className,
    style,
    ...rest
  } = props;
  const { boxElRef } = useKeyboardAccessibility({ open, onClose, anchorElRef });

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
        data-testid="popover-backdrop"
      />
      {open && (
        <Popper
          className={cn('JinniPopover', className)}
          anchorReference={anchorReference}
          anchorElRef={anchorElRef}
          anchorOrigin={anchorOrigin}
          anchorPosition={anchorPosition}
          popperOrigin={popoverOrigin}
          style={{
            '--transform-origin': `${popoverOrigin.horizontal} ${popoverOrigin.vertical}`,
            ...style
          }}
          {...rest}
        >
          <Box
            ref={boxElRef}
            className="JinniPopoverContent"
            elevation={5}
            round={4}
            tabIndex={0}
            {...BoxProps}
          >
            {children}
          </Box>
        </Popper>
      )}
    </>
  );
};

export default Popover;
