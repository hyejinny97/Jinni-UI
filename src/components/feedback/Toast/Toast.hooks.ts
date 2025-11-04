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
