import { useEffect } from 'react';
import { MenuProps } from './Menu';

type useKeydownProps = Pick<MenuProps, 'onClose' | 'onClick'> & {
  menuRef: React.RefObject<HTMLElement>;
};

export const useKeydown = ({ menuRef, onClose, onClick }: useKeydownProps) => {
  useEffect(() => {
    const menuEl = menuRef.current;
    if (!menuEl) return;

    const handleEscapeAndTap = (e: KeyboardEvent) => {
      if (!onClose) return;
      if (e.key === 'Escape') {
        onClose(e, 'escapeKeydown');
      }
      if (e.key === 'Tab') {
        onClose(e, 'tabKeyDown');
      }
    };
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && onClick) {
        onClick(e);
      }
    };

    document.addEventListener('keydown', handleEscapeAndTap);
    menuEl.addEventListener('keydown', handleEnter);
    return () => {
      document.removeEventListener('keydown', handleEscapeAndTap);
      menuEl.removeEventListener('keydown', handleEnter);
    };
  }, [onClose]);
};
