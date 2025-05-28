import { useEffect } from 'react';
import { MenuProps } from './Menu';

type useKeydownProps = Pick<
  MenuProps,
  'onClose' | 'onClick' | 'noBackdrop' | 'anchorElRef'
> & {
  menuRef: React.RefObject<HTMLElement>;
};

export const useClose = ({
  anchorElRef,
  menuRef,
  noBackdrop,
  onClose,
  onClick
}: useKeydownProps) => {
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
    const handleClick = (e: MouseEvent) => {
      if (!noBackdrop || !anchorElRef) return;
      const anchorEl = anchorElRef.current;
      const menuEl = menuRef.current;
      const clickedEl = e.target as Node;
      if (!anchorEl || anchorEl.contains(clickedEl)) return;
      if (!menuEl || menuEl.contains(clickedEl)) return;
      if (onClose) onClose(e, 'backgroundClick');
    };

    document.addEventListener('keydown', handleEscapeAndTap);
    menuEl.addEventListener('keydown', handleEnter);
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('keydown', handleEscapeAndTap);
      menuEl.removeEventListener('keydown', handleEnter);
      document.removeEventListener('click', handleClick);
    };
  }, [onClose, onClick, menuRef, anchorElRef, noBackdrop]);
};
