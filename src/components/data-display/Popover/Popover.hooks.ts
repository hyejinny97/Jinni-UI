import { useEffect, useRef } from 'react';
import { PopoverProps } from './Popover';

export const useKeyboardAccessibility = ({
  open,
  onClose,
  anchorElRef
}: Pick<PopoverProps, 'open' | 'onClose' | 'anchorElRef'>) => {
  const boxElRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    const anchorEl = anchorElRef?.current;
    const boxEl = boxElRef.current;
    if (!boxEl) return;

    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ];
    const focusableEls = Array.from(
      boxEl.querySelectorAll<HTMLElement>(focusableSelectors.join(','))
    );
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    (firstEl || boxEl).focus();

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.(e, 'escapeKeyDown');
      }
      if (e.key === 'Tab') {
        if (focusableEls.length === 0) {
          e.preventDefault();
          return;
        }
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      anchorEl?.focus();
    };
  }, [open, onClose, anchorElRef]);

  return { boxElRef };
};
