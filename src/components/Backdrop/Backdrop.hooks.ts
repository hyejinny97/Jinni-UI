import { useLayoutEffect, useRef } from 'react';

export const useWindowScroll = ({
  disableScroll
}: {
  disableScroll?: boolean;
}) => {
  const backdropElRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!disableScroll) return;
    const backdropEl = backdropElRef.current;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      const backdrops = Array.from(
        document.querySelectorAll<HTMLElement>('.JinniBackdrop')
      );
      const backdropsRemained = backdrops.filter(
        (element) => element !== backdropEl
      );
      const hasRemainedBackdrop = backdropsRemained.length > 0;
      const notScroll = backdropsRemained.some(
        (backdrop) => backdrop.dataset.disableScroll === 'true'
      );
      if (hasRemainedBackdrop && notScroll) return;
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('padding-right');
    };
  }, [disableScroll]);

  return backdropElRef;
};
