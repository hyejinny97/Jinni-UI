import { useRef, useEffect } from 'react';
import { SECOND } from '@/constants/time';

type UsePressProps = {
  longPressTime?: number;
  onPressed?: (event: PointerEvent) => void;
  onLongPressed?: (event: PointerEvent) => void;
  onPressedEnd?: (event: PointerEvent) => void;
};

export const usePress = ({
  longPressTime = 1 * SECOND,
  onPressed,
  onLongPressed,
  onPressedEnd
}: UsePressProps) => {
  const targetElRef = useRef<HTMLElement>(null);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const targetEl = targetElRef.current;
    if (!targetEl) return;

    const handlePressStart = (event: PointerEvent) => {
      onPressed?.(event);
      if (event.button === 0) {
        timeoutIdRef.current = setTimeout(() => {
          onLongPressed?.(event);
        }, longPressTime);
      }
    };

    const handlePressEnd = (event: PointerEvent) => {
      onPressedEnd?.(event);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    };

    targetEl.addEventListener('pointerdown', handlePressStart);
    targetEl.addEventListener('pointerup', handlePressEnd);
    targetEl.addEventListener('pointerleave', handlePressEnd);
    targetEl.addEventListener('pointercancel', handlePressEnd);
    return () => {
      targetEl.removeEventListener('pointerdown', handlePressStart);
      targetEl.removeEventListener('pointerup', handlePressEnd);
      targetEl.removeEventListener('pointerleave', handlePressEnd);
      targetEl.removeEventListener('pointercancel', handlePressEnd);
    };
  }, [longPressTime, onPressed, onLongPressed, onPressedEnd]);

  return { targetElRef };
};
