import './SwipeableDrawer.scss';
import cn from 'classnames';
import { useId, useLayoutEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { Backdrop } from '@/components/feedback/Backdrop';
import { Box, BoxProps } from '@/components/layout/Box';
import {
  useKeyboardAccessibility,
  useDrawerTranslateWatcher,
  useSwipe
} from './SwipeableDrawer.hooks';
import SwipeableDrawerContext from './SwipeableDrawer.contexts';
import { TRIGGER_REGION } from './SwipeableDrawer.constants';
import { getTranslate } from './SwipeableDrawer.utils';

export type CloseReason = 'escapeKeydown' | 'backdropClick' | 'snap';
type SnapPoint = {
  threshold: number;
  snapTo: number;
};

export type SwipeableDrawerProps<
  T extends AsType = 'div',
  P extends AsType = 'div'
> = Omit<DefaultComponentProps<T>, 'children'> & {
  children: React.ReactNode;
  open: boolean;
  onOpen?: (event: React.SyntheticEvent | Event) => void;
  onClose?: (event: React.SyntheticEvent | Event, reason: CloseReason) => void;
  snapPoints?: Array<SnapPoint>;
  anchorOrigin?: 'left' | 'right' | 'top' | 'bottom';
  size?: number;
  BoxProps?: BoxProps<P>;
};

const DEFAULT_SNAP_POINTS: SnapPoint[] = [
  { threshold: 0.5, snapTo: 0 },
  { threshold: 1, snapTo: 1 }
];

const SwipeableDrawer = <T extends AsType = 'div', P extends AsType = 'div'>(
  props: SwipeableDrawerProps<T, P>
) => {
  const {
    children,
    open,
    onOpen,
    onClose,
    snapPoints = DEFAULT_SNAP_POINTS,
    anchorOrigin = 'left',
    size = 250,
    BoxProps,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const drawerHeaderId = useId();
  const drawerBodyId = useId();
  const drawerContainerElRef = useRef<HTMLDivElement>(null);
  const drawerElRef = useRef<HTMLElement>(null);
  const backdropElRef = useRef<HTMLElement>(null);

  const visibleDrawer = useCallback(() => {
    const drawerContainerEl = drawerContainerElRef.current;
    if (!drawerContainerEl) return;
    drawerContainerEl.style.visibility = 'visible';
  }, []);
  const hiddenDrawer = useCallback(() => {
    const drawerContainerEl = drawerContainerElRef.current;
    if (!drawerContainerEl) return;
    drawerContainerEl.style.visibility = 'hidden';
  }, []);
  const disableTransition = useCallback(() => {
    const drawerEl = drawerElRef.current;
    if (!drawerEl) return;
    drawerEl.style.transition = 'none';
  }, []);
  const activeTransition = useCallback(() => {
    const drawerEl = drawerElRef.current;
    if (!drawerEl) return;
    drawerEl.style.transition = open
      ? `transform var(--jinni-duration-short4) var(--jinni-easing-standard-decelerate)`
      : `transform var(--jinni-duration-short4) var(--jinni-easing-standard-accelerate)`;
  }, [open]);
  const getCurrentDisplayedSize = useCallback(() => {
    const drawerEl = drawerElRef.current;
    if (!drawerEl) return 0;
    const { x, y } = getTranslate(drawerEl);
    switch (anchorOrigin) {
      case 'left':
        return size + x;
      case 'right':
        return size - x;
      case 'top':
        return size + y;
      case 'bottom':
        return size - y;
    }
  }, [size, anchorOrigin]);
  const translateDrawer = useCallback(
    (displayedSize: number) => {
      const drawerEl = drawerElRef.current;
      if (!drawerEl) return;
      switch (anchorOrigin) {
        case 'left':
          drawerEl.style.transform = `translateX(${-size + displayedSize}px)`;
          break;
        case 'right':
          drawerEl.style.transform = `translateX(${size - displayedSize}px)`;
          break;
        case 'top':
          drawerEl.style.transform = `translateY(${-size + displayedSize}px)`;
          break;
        case 'bottom':
          drawerEl.style.transform = `translateY(${size - displayedSize}px)`;
          break;
      }
    },
    [size, anchorOrigin]
  );
  const translateDrawerByMovement = useCallback(
    (event: PointerEvent) => {
      const drawerEl = drawerElRef.current;
      if (!drawerEl) return;
      let displayedSize = getCurrentDisplayedSize();
      switch (anchorOrigin) {
        case 'left':
          displayedSize += event.movementX;
          break;
        case 'right':
          displayedSize -= event.movementX;
          break;
        case 'top':
          displayedSize += event.movementY;
          break;
        case 'bottom':
          displayedSize -= event.movementY;
      }
      translateDrawer(Math.max(Math.min(displayedSize, size), 0));
    },
    [anchorOrigin, size, translateDrawer, getCurrentDisplayedSize]
  );

  const onProgress = useCallback((progress: number) => {
    const backdropEl = backdropElRef.current;
    if (!backdropEl) return;
    backdropEl.style.opacity = `${progress}`;
  }, []);
  const onSwipeStart = useCallback(
    (event: PointerEvent, trigger: boolean) => {
      visibleDrawer();
      disableTransition();
      if (trigger) translateDrawer(TRIGGER_REGION);
      else translateDrawerByMovement(event);
    },
    [
      visibleDrawer,
      translateDrawer,
      translateDrawerByMovement,
      disableTransition
    ]
  );
  const onSwipe = useCallback(
    (event: PointerEvent) => {
      translateDrawerByMovement(event);
    },
    [translateDrawerByMovement]
  );
  const onSwipeEnd = useCallback(
    (event: PointerEvent) => {
      const drawerEl = drawerElRef.current;
      if (!drawerEl) return;
      activeTransition();
      const displayedSize = getCurrentDisplayedSize();
      const displayRatio = displayedSize / size;
      for (const snapPoint of snapPoints) {
        const { threshold, snapTo } = snapPoint;
        if (displayRatio <= threshold) {
          if (snapTo === 1) {
            if (open) translateDrawer(size);
            else onOpen?.(event);
          } else if (snapTo === 0) {
            if (open) onClose?.(event, 'snap');
            else {
              translateDrawer(0);
              drawerEl.addEventListener('transitionend', hiddenDrawer, {
                once: true
              });
            }
          } else {
            translateDrawer(size * snapTo);
          }
          break;
        }
      }
    },
    [
      size,
      open,
      snapPoints,
      activeTransition,
      onOpen,
      onClose,
      translateDrawer,
      getCurrentDisplayedSize,
      hiddenDrawer
    ]
  );

  const { boxElRef } = useKeyboardAccessibility({
    open,
    onClose
  });
  useDrawerTranslateWatcher({
    ref: drawerElRef,
    anchorOrigin,
    maxTranslate: size,
    onProgress
  });
  useSwipe({ drawerElRef, anchorOrigin, onSwipeStart, onSwipe, onSwipeEnd });
  const newStyle = useStyle({
    '--drawer-size': `${size}px`,
    ...style
  });

  useLayoutEffect(() => {
    if (open) {
      visibleDrawer();
      activeTransition();
      translateDrawer(size);
    } else {
      const drawerEl = drawerElRef.current;
      if (!drawerEl) return;
      activeTransition();
      translateDrawer(0);
      drawerEl.addEventListener('transitionend', hiddenDrawer, { once: true });
      return () => {
        drawerEl.removeEventListener('transitionend', hiddenDrawer);
      };
    }
  }, [
    open,
    size,
    visibleDrawer,
    hiddenDrawer,
    translateDrawer,
    activeTransition
  ]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    onClose?.(e, 'backdropClick');
  };

  return (
    <SwipeableDrawerContext.Provider value={{ drawerHeaderId, drawerBodyId }}>
      {createPortal(
        <div
          ref={drawerContainerElRef}
          className={cn('JinniSwipeableDrawerContainer')}
        >
          <Backdrop
            ref={backdropElRef}
            disablePortal
            disableScroll
            data-testid="swipeable-drawer-backdrop"
            onClick={handleBackdropClick}
          />
          <Component
            ref={drawerElRef}
            role="dialog"
            aria-modal={true}
            aria-labelledby={drawerHeaderId}
            aria-describedby={drawerBodyId}
            className={cn('JinniSwipeableDrawer', anchorOrigin, className)}
            style={newStyle}
            {...rest}
          >
            <Box
              ref={boxElRef}
              className="JinniSwipeableDrawerContent"
              elevation={15}
              {...BoxProps}
            >
              {children}
            </Box>
          </Component>
        </div>,
        document.body
      )}
    </SwipeableDrawerContext.Provider>
  );
};

export default SwipeableDrawer;
