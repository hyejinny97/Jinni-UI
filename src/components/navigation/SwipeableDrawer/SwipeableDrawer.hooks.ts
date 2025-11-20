import { useEffect, useRef, useContext } from 'react';
import { SwipeableDrawerProps } from './SwipeableDrawer';
import SwipeableDrawerContext from './SwipeableDrawer.contexts';
import { TRIGGER_REGION } from './SwipeableDrawer.constants';
import { getTranslate } from './SwipeableDrawer.utils';

export const useSwipeableDrawerContext = () => {
  const value = useContext(SwipeableDrawerContext);
  return value;
};

export const useKeyboardAccessibility = ({
  open,
  onClose
}: Pick<SwipeableDrawerProps, 'open' | 'onClose'>) => {
  const boxElRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    const triggerEl = document.activeElement;
    const boxEl = boxElRef.current;
    if (!boxEl) return;

    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ];
    const focusableEls = Array.from(
      boxEl.querySelectorAll<HTMLElement>(focusableSelectors.join(','))
    );
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    (firstEl || boxEl).focus();

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.(e, 'escapeKeydown');
      }
      if (e.key === 'Tab') {
        if (focusableEls.length === 0) {
          e.preventDefault();
          return;
        }
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      if (triggerEl) (triggerEl as HTMLElement).focus();
    };
  }, [open, onClose]);

  return { boxElRef };
};

export const useDrawerTranslateWatcher = ({
  ref,
  anchorOrigin,
  maxTranslate,
  onProgress
}: {
  ref: React.RefObject<HTMLElement>;
  anchorOrigin: NonNullable<SwipeableDrawerProps['anchorOrigin']>;
  maxTranslate: number;
  onProgress: (progress: number) => void;
}) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame: number;
    let prevProgress = -1;

    const loop = () => {
      const { x, y } = getTranslate(element);
      let translate = 0;
      switch (anchorOrigin) {
        case 'left':
        case 'right':
          translate = x;
          break;
        case 'top':
        case 'bottom':
          translate = y;
          break;
      }

      const clamped = Math.min(Math.max(translate, -maxTranslate), 0);
      const progress = 1 - Math.abs(clamped) / maxTranslate;

      if (progress !== prevProgress) {
        prevProgress = progress;
        onProgress(progress);
      }

      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frame);
  }, [ref, anchorOrigin, maxTranslate, onProgress]);
};

export const useSwipe = ({
  drawerElRef,
  anchorOrigin,
  onSwipeStart,
  onSwipe,
  onSwipeEnd
}: {
  drawerElRef: React.RefObject<HTMLElement>;
  anchorOrigin: NonNullable<SwipeableDrawerProps['anchorOrigin']>;
  onSwipeStart: (event: PointerEvent, trigger: boolean) => void;
  onSwipe: (event: PointerEvent) => void;
  onSwipeEnd: (event: PointerEvent) => void;
}) => {
  const isPointerDownRef = useRef<boolean>(false);

  useEffect(() => {
    const drawerEl = drawerElRef.current;
    if (!drawerEl) return;

    const handlePointerDown = (event: PointerEvent) => {
      isPointerDownRef.current = true;
      const pointerPosition = ['left', 'right'].includes(anchorOrigin)
        ? event.clientX
        : event.clientY;
      if (event.target && drawerEl.contains(event.target as Node)) {
        onSwipeStart(event, false);
        return;
      }
      if (pointerPosition <= TRIGGER_REGION) {
        onSwipeStart(event, true);
      }
    };
    const handlePointerMove = (event: PointerEvent) => {
      const isPointerDown = isPointerDownRef.current;
      if (!isPointerDown) return;
      onSwipe(event);
    };
    const handlePointerUp = (event: PointerEvent) => {
      isPointerDownRef.current = false;
      onSwipeEnd(event);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [drawerElRef, anchorOrigin, onSwipeStart, onSwipe, onSwipeEnd]);
};
