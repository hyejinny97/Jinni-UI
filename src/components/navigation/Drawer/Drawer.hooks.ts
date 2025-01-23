import { useEffect } from 'react';
import { DrawerProps } from './Drawer';

type useKeydownProps = Pick<DrawerProps, 'onClose'>;

export const useKeydown = ({ onClose }: useKeydownProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      e.preventDefault();
      if (!onClose) return;
      if (e.key === 'Escape') {
        onClose(e, 'escapeKeydown');
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);
};
