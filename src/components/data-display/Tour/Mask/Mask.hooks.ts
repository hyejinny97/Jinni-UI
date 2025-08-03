import { useLayoutEffect, useState } from 'react';
import { MaskProps } from './Mask';

export const useMaskSize = () => {
  const [size, setSize] = useState({ height: 0 });

  useLayoutEffect(() => {
    const updateSize = () => {
      const { scrollHeight } = document.documentElement;
      setSize({ height: scrollHeight });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return { size };
};

export const useHole = ({
  excludeEl,
  maskHolePadding
}: Pick<MaskProps, 'excludeEl' | 'maskHolePadding'>) => {
  const [hole, setHole] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useLayoutEffect(() => {
    const setExcludeArea = () => {
      const { left, top, width, height } = excludeEl.getBoundingClientRect();
      const absoluteLeft = window.scrollX + left;
      const absoluteTop = window.scrollY + top;
      setHole({
        x: absoluteLeft - maskHolePadding,
        y: absoluteTop - maskHolePadding,
        width: width + 2 * maskHolePadding,
        height: height + 2 * maskHolePadding
      });
    };

    setExcludeArea();
    window.addEventListener('resize', setExcludeArea);
    return () => {
      window.removeEventListener('resize', setExcludeArea);
    };
  }, [excludeEl]);

  return { hole };
};
