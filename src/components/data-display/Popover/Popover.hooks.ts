import { useEffect } from 'react';
import { PopoverProps } from './Popover';

type useKeydownProps = Pick<PopoverProps, 'onClose'>;

export const useKeydown = ({ onClose }: useKeydownProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      e.preventDefault();
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
