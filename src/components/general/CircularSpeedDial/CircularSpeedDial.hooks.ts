import { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { CircularSpeedDialProps } from './CircularSpeedDial';
import { calculateActionCenterPosition } from './CircularSpeedDial.utils';

export const useHandleEvent = ({
  anchorElRef,
  speedDialRef,
  open,
  onOpen,
  onClose
}: Pick<
  CircularSpeedDialProps,
  'anchorElRef' | 'open' | 'onOpen' | 'onClose'
> & {
  speedDialRef: React.RefObject<HTMLElement>;
}) => {
  useEffect(() => {
    const anchorEl = anchorElRef.current;
    if (!anchorEl) return;

    const handleClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      const clickAnchorEl = anchorEl.contains(target);
      if (clickAnchorEl && onOpen) onOpen(event, 'anchorClick');
      if (!clickAnchorEl && onClose) onClose(event, 'backgroundClick');
    };
    const handleMouseEnter = (event: MouseEvent) => {
      if (!onOpen) return;
      onOpen(event, 'mouseEnter');
    };
    const handleMouseLeave = (event: MouseEvent) => {
      const relatedTarget = event.relatedTarget as Node;
      const speedDialEl = speedDialRef.current;
      if (speedDialEl && speedDialEl.contains(relatedTarget)) return;
      if (!onClose) return;
      onClose(event, 'mouseLeave');
    };
    const handleFocus = (event: FocusEvent) => {
      if (!onOpen) return;
      onOpen(event, 'focus');
    };
    const handleBlur = (event: FocusEvent) => {
      if (!onClose) return;
      onClose(event, 'blur');
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Escape' && onClose) onClose(event, 'escapeKeyDown');
    };

    document.addEventListener('click', handleClick);
    anchorEl.addEventListener('mouseenter', handleMouseEnter);
    anchorEl.addEventListener('mouseleave', handleMouseLeave);
    anchorEl.addEventListener('focus', handleFocus);
    anchorEl.addEventListener('blur', handleBlur);
    anchorEl.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleClick);
      anchorEl.removeEventListener('mouseenter', handleMouseEnter);
      anchorEl.removeEventListener('mouseleave', handleMouseLeave);
      anchorEl.removeEventListener('focus', handleFocus);
      anchorEl.removeEventListener('blur', handleBlur);
      anchorEl.removeEventListener('keydown', handleKeyDown);
    };
  }, [anchorElRef, speedDialRef, open, onOpen, onClose]);
};

export const useActionPosition = ({
  mainCircleRadius,
  circularSpeedDialContentRadius,
  rotationAngle
}: {
  mainCircleRadius: number;
  circularSpeedDialContentRadius: number;
  rotationAngle: number;
}) => {
  const actionElRef = useRef<HTMLElement>(null);
  const [actionPosition, setActionPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    const actionEl = actionElRef.current;
    if (!actionEl) return;

    const actionRadius = actionEl.offsetWidth / 2;
    const { cx, cy } = calculateActionCenterPosition({
      mainCircleRadius,
      circularSpeedDialContentRadius,
      actionRadius,
      rotationAngle
    });
    setActionPosition({
      top: cy - actionRadius,
      left: cx - actionRadius
    });
  }, [mainCircleRadius, circularSpeedDialContentRadius, rotationAngle]);

  return { actionElRef, actionPosition };
};
