import { useEffect, useRef } from 'react';
import { MenuProps } from './Menu';

export const useKeyboardAccessibility = ({
  open,
  onClose,
  anchorElRef
}: Pick<MenuProps, 'open' | 'onClose' | 'anchorElRef'>) => {
  const menuListElRef = useRef<HTMLElement>(null);
  const prevOpenRef = useRef<boolean>(open);

  useEffect(() => {
    if (open) {
      const menuListEl = menuListElRef.current;
      menuListEl?.focus();
    } else if (prevOpenRef.current === true && open === false) {
      const anchorEl = anchorElRef?.current;
      anchorEl?.focus();
    }
    prevOpenRef.current = open;
  }, [open, anchorElRef]);

  useEffect(() => {
    if (!open || !onClose) return;

    const handleEscapeAndTap = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose(e, 'escapeKeydown');
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        onClose(e, 'tabKeyDown');
      }
    };

    document.addEventListener('keydown', handleEscapeAndTap);
    return () => {
      document.removeEventListener('keydown', handleEscapeAndTap);
    };
  }, [open, onClose]);

  return { menuListElRef };
};
