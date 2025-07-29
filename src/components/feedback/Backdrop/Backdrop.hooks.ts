import { useLayoutEffect } from 'react';

export const useOverflowHidden = ({
  open,
  disableScroll
}: {
  open: boolean;
  disableScroll: boolean;
}) => {
  useLayoutEffect(() => {
    if (!open || !disableScroll) return;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      const hasRemainBackdrop = !!document.querySelector('.JinniBackdrop');
      if (hasRemainBackdrop) return;
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('padding-right');
    };
  }, [open, disableScroll]);
};
