import { useRef, useLayoutEffect, useState } from 'react';
import { getAnchorCoordinate, getMenuCoordinate } from './Menu.utils';
import { MenuProps } from './Menu';

type UseMenuPositionProps = Pick<
  MenuProps,
  'anchorEl' | 'anchorPosition' | 'open'
> &
  Required<Pick<MenuProps, 'anchorReference' | 'anchorOrigin' | 'menuOrigin'>>;

const useMenuPosition = ({
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

export default useMenuPosition;
