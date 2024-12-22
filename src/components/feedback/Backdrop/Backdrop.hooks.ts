import { useEffect } from 'react';

export const useOverflowHidden = ({ open }: { open: boolean }) => {
  useEffect(() => {
    if (!open) return;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('padding-right');
    };
  }, [open]);
};
