import { useLayoutEffect, useContext, useEffect } from 'react';
import { TourProps } from './Tour';
import TourContext from './Tour.contexts';

export const useTour = () => {
  const value = useContext(TourContext);
  if (!value) throw Error('TourContext value is null');
  return value;
};

export const useScrollbarHidden = ({ open }: Pick<TourProps, 'open'>) => {
  useLayoutEffect(() => {
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

export const useKeydown = ({ onClose }: Pick<TourProps, 'onClose'>) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (!onClose) return;
      if (e.key === 'Escape') {
        onClose(e, 'escapeKeydown');
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);
};
