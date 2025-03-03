import { useEffect, useState } from 'react';

type UseDebounceProps<T> = {
  value: T;
  delay?: number;
};

const useDebounce = <T>({ value, delay }: UseDebounceProps<T>): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
