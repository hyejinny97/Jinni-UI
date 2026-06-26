import { useEffect, useRef } from 'react';
import { PopoverProps } from './Popover';
import { findFocusableSelectors } from './Popover.utils';

export const useKeyboardAccessibility = ({
  open,
  onClose,
  anchorElRef
}: Pick<PopoverProps, 'open' | 'onClose' | 'anchorElRef'>) => {
  const boxElRef = useRef<HTMLDivElement>(null);
  const focusableElRef = useRef<{
    focusableEls: HTMLElement[];
    firstEl?: HTMLElement;
    lastEl?: HTMLElement;
  }>({ focusableEls: [] });

  useEffect(() => {
    if (!open) return;

    const anchorEl = anchorElRef?.current;
    const boxEl = boxElRef.current;
    if (!boxEl) return;

    focusableElRef.current = findFocusableSelectors(boxEl);
    if (!boxEl.contains(document.activeElement)) {
      (focusableElRef.current.firstEl || boxEl).focus();
    }

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.(e, 'escapeKeyDown');
      }
      if (e.key === 'Tab') {
        const { focusableEls, firstEl, lastEl } = focusableElRef.current;
        if (focusableEls.length === 0) {
          e.preventDefault();
          return;
        }
        if (e.shiftKey) {
          if (lastEl && document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (firstEl && document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);
    const observer = new MutationObserver(() => {
      focusableElRef.current = findFocusableSelectors(boxEl);
    });
    observer.observe(boxEl, {
      attributes: true,
      childList: true,
      subtree: true
    });
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      observer.disconnect();
      anchorEl?.focus();
    };
  }, [open, onClose, anchorElRef]);

  return { boxElRef };
};
