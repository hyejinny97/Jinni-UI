import { useContext, useEffect } from 'react';
import { TourProps } from './Tour';
import TourContext from './Tour.contexts';

export const useTour = () => {
  const value = useContext(TourContext);
  if (!value) throw Error('TourContext value is null');
  return value;
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
