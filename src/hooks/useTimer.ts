import { useRef, useState, useCallback, useEffect } from 'react';
import { SECOND } from '@/constants/time';

type UseTimerProps = {
  time: number;
  intervalTime?: number; // 단위: ms
};

export const useTimer = (props: UseTimerProps) => {
  const { time, intervalTime = 1 * SECOND } = props;
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const [leftTime, setLeftTime] = useState(time);

  const removeInterval = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  }, []);
  const startTimer = useCallback(() => {
    removeInterval();
    intervalIdRef.current = setInterval(() => {
      setLeftTime((prev) => Math.max(0, prev - intervalTime));
    }, intervalTime);
  }, [intervalTime, removeInterval]);
  const pauseTimer = useCallback(() => {
    removeInterval();
  }, [removeInterval]);
  const resetTimer = useCallback(() => {
    removeInterval();
    setLeftTime(time);
  }, [time, removeInterval]);

  useEffect(() => {
    if (leftTime === 0) removeInterval();
  }, [leftTime, removeInterval]);

  return { leftTime, startTimer, pauseTimer, resetTimer };
};
