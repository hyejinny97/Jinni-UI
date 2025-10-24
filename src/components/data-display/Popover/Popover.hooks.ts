import { useEffect, useRef } from 'react';
import { PopoverProps } from './Popover';

export const useKeyboardAccessibility = ({
  open,
  onClose,
  anchorElRef
}: Pick<PopoverProps, 'open' | 'onClose' | 'anchorElRef'>) => {
  const boxElRef = useRef<HTMLElement>(null);
  const prevOpenRef = useRef<boolean>(open);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        const boxEl = boxElRef.current;
        boxEl?.focus();
      }, 0);
    } else if (prevOpenRef.current === true && open === false) {
      const anchorEl = anchorElRef?.current;
      anchorEl?.focus();
    }
    prevOpenRef.current = open;
  }, [open, anchorElRef]);

  useEffect(() => {
    if (!open || !onClose) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose(e, 'escapeKeydown');
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  return { boxElRef };
};
