import { useEffect, useRef, useContext } from 'react';
import { LinearSpeedDialProps } from './LinearSpeedDial';
import { LinearSpeedDialContext } from './LinearSpeedDial.contexts';
import { findSpeedDialActionsByLayer } from './LinearSpeedDial.utils';

type UseCloseProps = Pick<
  LinearSpeedDialProps,
  'anchorElRef' | 'open' | 'onClose'
> &
  Required<Pick<LinearSpeedDialProps, 'container'>>;

type UseKeyboardAccessibilityProps = Pick<LinearSpeedDialProps, 'open'> &
  Required<Pick<LinearSpeedDialProps, 'placement' | 'container'>> & {
    speedDialContentElRef: React.RefObject<HTMLDivElement>;
  };

export const useClose = ({
  open,
  onClose,
  anchorElRef,
  container
}: UseCloseProps) => {
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
    const handleSpeedDialMouseLeave = (e: MouseEvent) => {
      if (!e.target) return;
      const relatedTarget = e.relatedTarget as Node;

      if (anchorEl?.contains(relatedTarget)) return;
      onClose?.(e, 'mouseLeave');
    };
    const handleAnchorMouseLeave = (e: MouseEvent) => {
      if (!e.target) return;
      const relatedTarget = e.relatedTarget as Node;

      if (speedDialEl.contains(relatedTarget)) return;
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
      }
      if (e.key === 'Tab') {
        anchorEl?.focus();
      }
    };

    container.addEventListener('click', handleClick);
    speedDialEl.addEventListener('mouseleave', handleSpeedDialMouseLeave);
    anchorEl?.addEventListener('mouseleave', handleAnchorMouseLeave);
    container.addEventListener('focusin', handleFocusIn);
    container.addEventListener('keydown', handleKeyDown);
    return () => {
      container.removeEventListener('click', handleClick);
      speedDialEl.removeEventListener('mouseleave', handleSpeedDialMouseLeave);
      anchorEl?.removeEventListener('mouseleave', handleAnchorMouseLeave);
      container.removeEventListener('focusin', handleFocusIn);
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose, anchorElRef, container]);

  return { speedDialElRef };
};

export const useKeyboardAccessibility = ({
  open,
  placement,
  speedDialContentElRef,
  container
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
    container.addEventListener('keydown', handleKeyDown);
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, placement, speedDialContentElRef, container]);
};

export const useLinearDial = () => {
  const value = useContext(LinearSpeedDialContext);
  if (!value)
    throw new Error('LinearSpeedDialContext 값을 가져올 수 없습니다.');
  return value;
};
