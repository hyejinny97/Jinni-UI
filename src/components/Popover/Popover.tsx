'use client';

import './Popover.scss';
import cn from 'classnames';
import { Fragment } from 'react';
import { AsType } from '@/types/default-component-props';
import Backdrop from '@/components/Backdrop';
import Box, { BoxProps } from '@/components/Box';
import { useKeyboardAccessibility } from './Popover.hooks';
import Popper, { PopperProps } from '@/components/Popper';
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
  WrapperComponent?: React.ComponentType<{ children: React.ReactNode }>;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  TransitionComponent?: React.ComponentType<any>;
};

const DEFAULT_ANCHOR_ORIGIN: PopperProps['anchorOrigin'] = {
  horizontal: 'left',
  vertical: 'bottom'
};
const DEFAULT_POPOVER_ORIGIN: PopperProps['popperOrigin'] = {
  horizontal: 'left',
  vertical: 'top'
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
    WrapperComponent = Fragment,
    TransitionComponent,
    className,
    style,
    ...rest
  } = props;
  const { boxElRef } = useKeyboardAccessibility({ open, onClose, anchorElRef });

  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!onClose) return;
    onClose(e.nativeEvent, 'backdropClick');
  };

  const popperAnchorProps: PopperProps<T> =
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
            data-testid="popover-backdrop"
          />
          <Popper
            role="dialog"
            className={cn('JinniPopover', className)}
            as={TransitionComponent}
            {...popperAnchorProps}
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
        </>
      )}
    </WrapperComponent>
  );
};

export default Popover;
