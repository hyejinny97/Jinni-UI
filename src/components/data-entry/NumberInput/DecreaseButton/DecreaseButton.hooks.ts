import { useRef, useCallback, useEffect } from 'react';
import { usePress } from '@/hooks/usePress';
import { useNumberInput } from '../NumberInput.hooks';
import { SECOND } from '@/constants/time';

export const useButtonPress = () => {
  const { decrease } = useNumberInput();
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const decreaseRef = useRef(decrease);

  useEffect(() => {
    decreaseRef.current = decrease;
  }, [decrease]);

  const onPressed = useCallback(
    (event: PointerEvent) => {
      decrease(event);
    },
    [decrease]
  );

  const onLongPressed = useCallback((event: PointerEvent) => {
    intervalIdRef.current = setInterval(() => {
      decreaseRef.current(event);
    }, 0.1 * SECOND);
  }, []);

  const onPressedEnd = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  }, []);

  return usePress({
    longPressTime: 0.5 * SECOND,
    onPressed,
    onLongPressed,
    onPressedEnd
  });
};
