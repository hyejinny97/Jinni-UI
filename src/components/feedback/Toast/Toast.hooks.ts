import { useEffect, useState, useRef, useCallback } from 'react';
import { ToastProps } from './Toast';
import { SECOND } from '@/constants/time';

type useManualCloseProps = Pick<ToastProps, 'onClose' | 'open'>;
type useAutoCloseProps = Pick<
  ToastProps,
  'onClose' | 'open' | 'autoHideDuration'
>;
type useCloseProps = useAutoCloseProps;

const INTERVAL_TIME = 1 * SECOND;

const useAutoClose = ({
  onClose,
  open,
  autoHideDuration
}: useAutoCloseProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const timeRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = useCallback(() => {
    if (!timerRef.current) return;
    clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const initTime = useCallback(() => {
    if (autoHideDuration) {
      timeRef.current = autoHideDuration * SECOND;
      setIsRunning(true);
    }
  }, [autoHideDuration]);

  const resetTime = useCallback(() => {
    clearTimer();
    timeRef.current = 0;
    setIsRunning(false);
  }, [clearTimer]);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resumeTimer = useCallback(() => {
    if (autoHideDuration && timeRef.current > 0) {
      setIsRunning(true);
    }
  }, [autoHideDuration]);

  useEffect(() => {
    if (open) initTime();
    else resetTime();
  }, [open, resetTime, initTime]);

  useEffect(() => {
    if (!open) return;

    if (isRunning) {
      timerRef.current = setInterval(() => {
        if (timeRef.current <= 0) {
          resetTime();
          onClose?.(null, 'timeout');
        }
        timeRef.current -= INTERVAL_TIME;
      }, INTERVAL_TIME);
    } else clearTimer();
    return clearTimer;
  }, [onClose, open, isRunning, clearTimer, resetTime]);

  return {
    pauseTimer,
    resumeTimer
  };
};

const useManualClose = ({ onClose, open }: useManualCloseProps) => {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.(e, 'escapeKeydown');
      }
    };
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.JinniToast')) return;
      onClose?.(e, 'backgroundClick');
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleClick, { capture: true });
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, [onClose, open]);
};

export const useClose = ({
  onClose,
  open,
  autoHideDuration
}: useCloseProps) => {
  useManualClose({ onClose, open });
  return useAutoClose({
    onClose,
    open,
    autoHideDuration
  });
};

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
];

export const useActionFocus = ({ open }: Pick<ToastProps, 'open'>) => {
  const toastElRef = useRef<HTMLElement>(null);

  const getFocusableElements = useCallback(
    (element: HTMLElement | Document): HTMLElement[] => {
      return Array.from(
        element.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS.join(','))
      ).filter(
        (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
      );
    },
    []
  );

  const getNextFocusableElement = useCallback(
    (element: HTMLElement): HTMLElement | null => {
      const allFocusableEls = getFocusableElements(document);
      const elementIdx = allFocusableEls.indexOf(element);
      return allFocusableEls[elementIdx + 1];
    },
    [getFocusableElements]
  );

  useEffect(() => {
    const toastEl = toastElRef.current;
    const triggerEl = document.activeElement;
    if (!open || !toastEl || !triggerEl) return;

    const focusableEls = getFocusableElements(toastEl);
    if (focusableEls.length === 0) return;

    const firstToastEl = focusableEls[0];
    const lastToastEl = focusableEls[focusableEls.length - 1];
    const nextOfTrigger = getNextFocusableElement(triggerEl as HTMLElement);

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const activeEl = document.activeElement as HTMLElement | null;

      if (!e.shiftKey && activeEl === triggerEl) {
        e.preventDefault();
        firstToastEl?.focus();
        return;
      }
      if (!e.shiftKey && activeEl === lastToastEl) {
        e.preventDefault();
        nextOfTrigger?.focus();
        return;
      }
      if (e.shiftKey && activeEl === nextOfTrigger) {
        e.preventDefault();
        lastToastEl?.focus();
        return;
      }
      if (e.shiftKey && activeEl === firstToastEl) {
        e.preventDefault();
        (triggerEl as HTMLElement).focus();
        return;
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [open, getFocusableElements, getNextFocusableElement]);

  return { toastElRef };
};
