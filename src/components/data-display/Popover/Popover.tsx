import './Popover.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Backdrop } from '@/components/feedback/Backdrop';
import { Box, BoxProps } from '@/components/layout/Box';
import { useKeyboardAccessibility } from './Popover.hooks';
import { Popper, PopperProps } from '@/components/_share/Popper';
import { Motion } from '@/components/motion/Motion';
import { AnimatePresence } from '@/components/motion/AnimatePresence';
import { DistributiveOmit } from '@/types/distributiveOmit';

export type CloseReason = 'escapeKeyDown' | 'backdropClick';

export type PopoverProps<T extends AsType = 'div'> = DistributiveOmit<
  PopperProps<T>,
  'popperOrigin'
> & {
  popoverOrigin?: PopperProps['popperOrigin'];
  open: boolean;
  onClose?: (event: MouseEvent | KeyboardEvent, reason: CloseReason) => void;
  BoxProps?: BoxProps;
  disableScroll?: boolean;
  TransitionComponent?: React.ComponentType<{ children: React.ReactNode }>;
};

const DEFAULT_ANCHOR_ORIGIN: PopperProps['anchorOrigin'] = {
  horizontal: 'left',
  vertical: 'bottom'
};
const DEFAULT_POPOVER_ORIGIN: PopperProps['popperOrigin'] = {
  horizontal: 'left',
  vertical: 'top'
};

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
    TransitionComponent = ScaleFade,
    className,
    style,
    ...rest
  } = props;
  const { boxElRef } = useKeyboardAccessibility({ open, onClose, anchorElRef });

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
    <AnimatePresence>
      {open && (
        <>
          <Backdrop
            invisible
            disableScroll={disableScroll}
            onClick={handleBackdropClick}
            data-testid="popover-backdrop"
          />
          <Popper
            role="dialog"
            className={cn('JinniPopover', className)}
            {...popperAnchorProps}
            popperOrigin={popoverOrigin}
            style={{
              '--transform-origin': `${popoverOrigin.horizontal} ${popoverOrigin.vertical}`,
              ...style
            }}
            {...rest}
          >
            <TransitionComponent>
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
            </TransitionComponent>
          </Popper>
        </>
      )}
    </AnimatePresence>
  );
};

export default Popover;
