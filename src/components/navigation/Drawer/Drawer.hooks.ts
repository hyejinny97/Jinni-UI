import { useEffect, useRef, useContext } from 'react';
import { DrawerProps } from './Drawer';
import DrawerContext from './Drawer.contexts';

export const useKeyboardAccessibility = ({
  open,
  onClose,
  variant
}: Pick<DrawerProps, 'open' | 'onClose' | 'variant'>) => {
  const boxElRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open || variant !== 'temporary') return;

    const triggerEl = document.activeElement;
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

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.(e, 'escapeKeydown');
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

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      if (triggerEl) (triggerEl as HTMLElement).focus();
    };
  }, [open, onClose, variant]);

  return { boxElRef };
};

export const useDrawerContext = () => {
  const value = useContext(DrawerContext);
  return value;
};
