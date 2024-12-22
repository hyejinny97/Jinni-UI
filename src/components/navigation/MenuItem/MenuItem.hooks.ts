import { useEffect } from 'react';
import { MenuItemProps } from './MenuItem';

type UseFocusProps = Pick<MenuItemProps, 'focus'> & {
  rippleTargetRef: React.RefObject<HTMLElement>;
};

type UseKeydownProps = Pick<MenuItemProps, 'onClick' | 'href' | 'focus'> & {
  rippleTargetRef: React.RefObject<HTMLElement>;
};

export const useFocus = ({ rippleTargetRef, focus }: UseFocusProps) => {
  useEffect(() => {
    const menuItemEl = rippleTargetRef.current;
    if (!menuItemEl) return;
    if (focus) menuItemEl.focus();
  }, [rippleTargetRef, focus]);
};

export const useKeydown = ({
  rippleTargetRef,
  onClick,
  href,
  focus
}: UseKeydownProps) => {
  useEffect(() => {
    const menuItemEl = rippleTargetRef.current;
    if (!menuItemEl) return;

    const handleKeydown = (e: KeyboardEvent) => {
      if (!(e.code === 'Enter' && focus)) return;
      if (onClick) onClick(e);
      if (href) window.location.assign(href);
    };

    menuItemEl.addEventListener('keydown', handleKeydown);
    return () => {
      menuItemEl.removeEventListener('keydown', handleKeydown);
    };
  }, [onClick, focus, rippleTargetRef, href]);
};
