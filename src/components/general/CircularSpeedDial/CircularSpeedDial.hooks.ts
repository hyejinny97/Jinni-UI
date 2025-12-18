import { useRef, useLayoutEffect, useEffect, useContext } from 'react';
import { CircularSpeedDialProps } from './CircularSpeedDial';
import {
  findRadius,
  findElementByLayer,
  getRotationAngleList,
  calculateActionCenterPosition
} from './CircularSpeedDial.utils';
import { CircularSpeedDialContext } from './CircularSpeedDial.contexts';

type UseSpeedDialContentProps = Pick<
  CircularSpeedDialProps,
  'open' | 'anchorElRef' | 'placement'
> &
  Required<Pick<CircularSpeedDialProps, 'offset'>> & {
    speedDialContentElRef: React.RefObject<HTMLDivElement>;
  };

type UseCloseProps = Pick<
  CircularSpeedDialProps,
  'anchorElRef' | 'open' | 'onClose'
> &
  Required<Pick<CircularSpeedDialProps, 'container'>>;

type UseKeyboardAccessibilityProps = Pick<CircularSpeedDialProps, 'open'> &
  Required<Pick<CircularSpeedDialProps, 'container'>> & {
    speedDialContentElRef: React.RefObject<HTMLDivElement>;
  };

export const useSpeedDialContent = ({
  open,
  offset,
  placement,
  anchorElRef,
  speedDialContentElRef
}: UseSpeedDialContentProps) => {
  useLayoutEffect(() => {
    const anchorEl = anchorElRef?.current;
    const speedDialContentEl = speedDialContentElRef.current;
    if (!open || !speedDialContentEl) return;

    const actions = findElementByLayer({
      root: speedDialContentEl,
      elementClassNameToFind: 'JinniCircularSpeedDialActionWrapper'
    });
    const anchorRadius = anchorEl ? findRadius(anchorEl) : 0;
    const actionRadius = actions.reduce(
      (maxRadius, action) => Math.max(findRadius(action), maxRadius),
      0
    );
    const speedDialContentRadius = anchorRadius + offset + actionRadius * 2;

    const setSpeedDialContentSize = () => {
      speedDialContentEl.style.width = `${speedDialContentRadius * 2}px`;
      speedDialContentEl.style.height = `${speedDialContentRadius * 2}px`;
    };
    const setSpeedDialActionPosition = () => {
      const rotationAngleList = getRotationAngleList({
        actionsNumber: actions.length,
        placement
      });
      const actionCenterPositionList = rotationAngleList.map((rotationAngle) =>
        calculateActionCenterPosition({
          speedDialContentRadius,
          anchorRadius,
          offset,
          actionRadius,
          rotationAngle
        })
      );
      actionCenterPositionList.forEach((actionCenterPosition, idx) => {
        actions[idx].style.top = `${actionCenterPosition.cy}px`;
        actions[idx].style.left = `${actionCenterPosition.cx}px`;
        actions[idx].dataset.rotationAngle = `${rotationAngleList[idx]}`;
      });
    };

    setSpeedDialContentSize();
    setSpeedDialActionPosition();
  }, [open, offset, placement, anchorElRef, speedDialContentElRef]);
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
  speedDialContentElRef,
  container
}: UseKeyboardAccessibilityProps) => {
  useEffect(() => {
    const speedDialContentEl = speedDialContentElRef.current;
    if (!open || !speedDialContentEl) return;

    const actions = findElementByLayer({
      root: speedDialContentEl,
      elementClassNameToFind: 'JinniCircularSpeedDialAction'
    });
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
      } else if (e.key === 'ArrowUp') {
        newActiveActionIdx = getNextActiveActionIdx();
      } else if (e.key === 'ArrowDown') {
        newActiveActionIdx = getPrevActiveActionIdx();
      }

      actions[newActiveActionIdx].focus();
      activeActionIdx = newActiveActionIdx;
    };
    container.addEventListener('keydown', handleKeyDown);
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, speedDialContentElRef, container]);
};

export const useCircularDial = () => {
  const value = useContext(CircularSpeedDialContext);
  if (!value)
    throw new Error('CircularSpeedDialContext 값을 가져올 수 없습니다.');
  return value;
};
