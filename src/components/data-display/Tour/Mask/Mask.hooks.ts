import { useLayoutEffect, useState } from 'react';
import { MaskProps } from './Mask';

export const useMaskSize = () => {
  const [maskSize, setMaskSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const updateMaskSize = () => {
      const { clientWidth, scrollHeight } = document.documentElement;
      setMaskSize({ width: clientWidth, height: scrollHeight });
    };

    updateMaskSize();
    window.addEventListener('resize', updateMaskSize);
    return () => {
      window.removeEventListener('resize', updateMaskSize);
    };
  }, []);

  return { maskSize };
};

export const useSpotlightSize = ({
  spotlightElRef,
  spotlightPadding
}: Required<Pick<MaskProps, 'spotlightElRef' | 'spotlightPadding'>>) => {
  const [spotlightSize, setSpotlightSize] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });

  useLayoutEffect(() => {
    const spotlightEl = spotlightElRef.current;
    if (!spotlightEl) return;

    const updateSpotlightSize = () => {
      const { left, top, width, height } = spotlightEl.getBoundingClientRect();
      const absoluteLeft = window.scrollX + left;
      const absoluteTop = window.scrollY + top;
      setSpotlightSize({
        x: absoluteLeft - spotlightPadding,
        y: absoluteTop - spotlightPadding,
        width: width + 2 * spotlightPadding,
        height: height + 2 * spotlightPadding
      });
    };

    window.addEventListener('resize', updateSpotlightSize);
    const observer = new ResizeObserver(updateSpotlightSize);
    observer.observe(spotlightEl);
    return () => {
      window.removeEventListener('resize', updateSpotlightSize);
      observer.disconnect();
    };
  }, [spotlightElRef, spotlightPadding]);

  return { spotlightSize };
};
