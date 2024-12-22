import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { getAnchorCoordinate, getMenuCoordinate } from './Menu.utils';
import { MenuProps } from './Menu';

type UseMenuPositionProps = Pick<
  MenuProps,
  'anchorEl' | 'anchorPosition' | 'open'
> &
  Required<Pick<MenuProps, 'anchorReference' | 'anchorOrigin' | 'menuOrigin'>>;

type useKeydownProps = Pick<MenuProps, 'onClose' | 'onClick'> & {
  menuRef: React.RefObject<HTMLElement>;
};

export const useMenuPosition = ({
  anchorReference,
  anchorEl,
  anchorOrigin,
  anchorPosition,
  menuOrigin,
  open
}: UseMenuPositionProps) => {
  const menuRef = useRef<HTMLElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    const handleMenuPosition = () => {
      const menuEl = menuRef.current;
      if (!menuEl || !open) return;

      const anchorCoordinate = getAnchorCoordinate({
        anchorReference,
        anchorEl,
        anchorOrigin,
        anchorPosition
      });
      const menuCoordinate = getMenuCoordinate({
        anchorCoordinate,
        menuOrigin,
        menuEl
      });

      setMenuPosition(menuCoordinate);
    };

    handleMenuPosition();
    window.addEventListener('resize', handleMenuPosition);
    return () => {
      window.removeEventListener('resize', handleMenuPosition);
    };
  }, [
    anchorEl,
    anchorOrigin,
    anchorPosition,
    anchorReference,
    menuOrigin,
    open
  ]);

  return { menuRef, menuPosition };
};

export const useKeydown = ({ menuRef, onClose, onClick }: useKeydownProps) => {
  useEffect(() => {
    const menuEl = menuRef.current;
    if (!menuEl) return;

    const handleEscapeAndTap = (e: KeyboardEvent) => {
      e.preventDefault();
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
  }, [onClose, onClick, menuRef]);
};
