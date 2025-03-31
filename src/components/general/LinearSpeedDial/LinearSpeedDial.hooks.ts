import { useEffect } from 'react';
import { LinearSpeedDialProps } from './LinearSpeedDial';

export const useHandleEvent = ({
  anchorElRef,
  speedDialRef,
  open,
  onOpen,
  onClose
}: Pick<LinearSpeedDialProps, 'anchorElRef' | 'open' | 'onOpen' | 'onClose'> & {
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
