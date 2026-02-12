import { useEffect, useRef } from 'react';
import { MenuProps } from './Menu';

export const useKeyboardAccessibility = ({
  open,
  onClose,
  anchorElRef,
  disableMenuListFocused
}: Pick<
  MenuProps,
  'open' | 'onClose' | 'anchorElRef' | 'disableMenuListFocused'
>) => {
  const menuListElRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open || !onClose) return;

    const anchorEl = anchorElRef?.current;
    const menuListEl = menuListElRef.current;
    if (!disableMenuListFocused) {
      menuListEl?.focus();
    }

    const handleEscapeAndTap = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose(e, 'escapeKeyDown');
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        onClose(e, 'tabKeyDown');
      }
    };

    document.addEventListener('keydown', handleEscapeAndTap);
    return () => {
      document.removeEventListener('keydown', handleEscapeAndTap);
      anchorEl?.focus();
    };
  }, [open, onClose, anchorElRef, disableMenuListFocused]);

  return { menuListElRef };
};
