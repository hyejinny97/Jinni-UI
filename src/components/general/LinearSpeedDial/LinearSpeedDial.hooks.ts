import { useEffect, useRef, useContext, useLayoutEffect } from 'react';
import { LinearSpeedDialProps } from './LinearSpeedDial';
import { LinearSpeedDialContext } from './LinearSpeedDial.contexts';
import { findSpeedDialActionsByLayer } from './LinearSpeedDial.utils';

type UseCloseProps = Pick<
  LinearSpeedDialProps,
  'anchorElRef' | 'open' | 'onClose'
>;

type UseKeyboardAccessibilityProps = Pick<LinearSpeedDialProps, 'open'> &
  Required<Pick<LinearSpeedDialProps, 'placement'>> & {
    speedDialContentElRef: React.RefObject<HTMLDivElement>;
  };

type UseStaggeredTransitionProps = Pick<
  LinearSpeedDialProps,
  'open' | 'disableStaggeredTransition'
> & { speedDialContentElRef: React.RefObject<HTMLDivElement> };

export const useClose = ({ open, onClose, anchorElRef }: UseCloseProps) => {
  const speedDialElRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const speedDialEl = speedDialElRef.current;
    const anchorEl = anchorElRef?.current;
    if (!open || !speedDialEl) return;

    const handleClick = (e: MouseEvent) => {
      if (!e.target) return;
      const target = e.target as Node;

      if (speedDialEl.contains(target) || anchorEl?.contains(target)) return;
      onClose?.(e, 'backgroundClick');
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!e.target) return;
      const target = e.target as Node;

      if (speedDialEl.contains(target) || anchorEl?.contains(target)) return;
      onClose?.(e, 'mouseLeave');
    };
    const handleFocusIn = (e: FocusEvent) => {
      if (!e.target) return;
      const target = e.target as Node;

      if (speedDialEl.contains(target) || anchorEl?.contains(target)) return;
      onClose?.(e, 'blur');
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.(e, 'escapeKeyDown');
        if (anchorEl) anchorEl.focus();
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose, anchorElRef]);

  return { speedDialElRef };
};

export const useKeyboardAccessibility = ({
  open,
  placement,
  speedDialContentElRef
}: UseKeyboardAccessibilityProps) => {
  useEffect(() => {
    const speedDialContentEl = speedDialContentElRef.current;
    if (!open || !speedDialContentEl) return;

    const actions = findSpeedDialActionsByLayer(speedDialContentEl);
    const MAX = actions.length;
    let activeActionIdx: number | null = null;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        ![
          'ArrowUp',
          'ArrowDown',
          'ArrowLeft',
          'ArrowRight',
          'Home',
          'End'
        ].includes(e.key)
      )
        return;

      e.preventDefault();
      const getNextActiveActionIdx = () =>
        activeActionIdx === null ? 0 : (activeActionIdx + 1) % MAX;
      const getPrevActiveActionIdx = () =>
        activeActionIdx === null ? MAX - 1 : (activeActionIdx - 1 + MAX) % MAX;

      let newActiveActionIdx: number = -1;
      if (e.key === 'Home') {
        newActiveActionIdx = 0;
      } else if (e.key === 'End') {
        newActiveActionIdx = MAX - 1;
      } else {
        switch (placement) {
          case 'up': {
            if (e.key === 'ArrowUp')
              newActiveActionIdx = getNextActiveActionIdx();
            if (e.key === 'ArrowDown')
              newActiveActionIdx = getPrevActiveActionIdx();
            break;
          }
          case 'down': {
            if (e.key === 'ArrowDown')
              newActiveActionIdx = getNextActiveActionIdx();
            if (e.key === 'ArrowUp')
              newActiveActionIdx = getPrevActiveActionIdx();
            break;
          }
          case 'left': {
            if (e.key === 'ArrowLeft')
              newActiveActionIdx = getNextActiveActionIdx();
            if (e.key === 'ArrowRight')
              newActiveActionIdx = getPrevActiveActionIdx();
            break;
          }
          case 'right': {
            if (e.key === 'ArrowRight')
              newActiveActionIdx = getNextActiveActionIdx();
            if (e.key === 'ArrowLeft')
              newActiveActionIdx = getPrevActiveActionIdx();
          }
        }
      }

      actions[newActiveActionIdx].focus();
      activeActionIdx = newActiveActionIdx;
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, placement, speedDialContentElRef]);
};

export const useStaggeredTransition = ({
  open,
  disableStaggeredTransition,
  speedDialContentElRef
}: UseStaggeredTransitionProps) => {
  useLayoutEffect(() => {
    const speedDialContentEl = speedDialContentElRef.current;
    if (disableStaggeredTransition || !speedDialContentEl) return;

    const actions = findSpeedDialActionsByLayer(speedDialContentEl);
    const reversedActions = [...actions].reverse();

    const DELAY_STEP = 0.1;
    let count = 0;
    (open ? actions : reversedActions).forEach((action) => {
      action.style.transitionDelay = `${count * DELAY_STEP}s`;
      count += 1;
    });
  }, [disableStaggeredTransition, open, speedDialContentElRef]);

  return { speedDialContentElRef };
};

export const useLinearDial = () => {
  const value = useContext(LinearSpeedDialContext);
  if (!value)
    throw new Error('LinearSpeedDialContext 값을 가져올 수 없습니다.');
  return value;
};
