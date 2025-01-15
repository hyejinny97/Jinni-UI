import { useEffect, useState, useRef, useCallback } from 'react';
import { ToastProps } from './Toast';
import { SECOND } from '@/constants/time';

type useManualCloseProps = Pick<ToastProps, 'onClose' | 'open'>;
type useAutoCloseProps = Pick<
  ToastProps,
  'onClose' | 'open' | 'autoHideDuration'
>;
type useCloseProps = useAutoCloseProps;

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
    setIsRunning(!!autoHideDuration);
    timeRef.current = autoHideDuration ? autoHideDuration * SECOND : 0;
  }, [autoHideDuration]);

  const resetTime = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    timeRef.current = 0;
  }, [clearTimer]);

  useEffect(() => {
    if (open) initTime();
    else resetTime();
  }, [open, resetTime, initTime]);

  useEffect(() => {
    if (!onClose || !open) return;
    if (isRunning) {
      timerRef.current = setInterval(() => {
        if (timeRef.current <= 0) {
          clearTimer();
          setIsRunning(false);
          onClose(null, 'timeout');
        }
        timeRef.current -= 1 * SECOND;
      }, 1 * SECOND);
    } else clearTimer();
    return clearTimer;
  }, [onClose, open, isRunning, clearTimer]);

  return {
    pauseTimer: () => setIsRunning(false),
    resumeTimer: () => setIsRunning(true)
  };
};

const useManualClose = ({ onClose, open }: useManualCloseProps) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      e.preventDefault();
      if (!onClose || !isOpen) return;
      if (e.key === 'Escape') {
        onClose(e, 'escapeKeydown');
      }
    };
    const handleClick = (e: MouseEvent) => {
      if (!onClose || !isOpen) return;
      const target = e.target as HTMLElement;
      if (target.closest('.JinniToastContent')) return;
      onClose(e, 'clickAway');
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClick);
    };
  }, [onClose, isOpen]);
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
