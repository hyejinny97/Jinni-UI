import { useLayoutEffect, useContext, useEffect, useRef } from 'react';
import { TourProps } from './Tour';
import { TourStepProps } from './TourStep';
import TourContext from './Tour.contexts';
import { getAnchorElCoordinate, getPopperCoordinate } from '@/utils/popper';

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

export const useTourStepPosition = ({
  anchorEl,
  anchorOrigin,
  tourStepOrigin,
  maskHolePadding,
  show
}: Required<
  Pick<
    TourStepProps,
    'anchorEl' | 'anchorOrigin' | 'tourStepOrigin' | 'maskHolePadding'
  > & {
    show: boolean;
  }
>) => {
  const tourStepElRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!show) return;

    const handleTourStepPosition = () => {
      const tourItemEl = tourStepElRef.current;
      if (!tourItemEl) return;

      const anchorCoordinate = getAnchorElCoordinate({
        anchorEl,
        anchorOrigin
      });
      const tourItemElCoordinate = getPopperCoordinate({
        anchorCoordinate,
        popperOrigin: tourStepOrigin,
        popperEl: tourItemEl
      });

      const { top, left } = tourItemElCoordinate;
      tourItemEl.style.top = `${top + maskHolePadding}px`;
      tourItemEl.style.left = `${left - maskHolePadding}px`;
    };

    handleTourStepPosition();
    window.addEventListener('resize', handleTourStepPosition);
    window.addEventListener('scroll', handleTourStepPosition);
    const observer = new ResizeObserver(handleTourStepPosition);
    observer.observe(anchorEl);
    return () => {
      window.removeEventListener('resize', handleTourStepPosition);
      window.removeEventListener('scroll', handleTourStepPosition);
      observer.unobserve(anchorEl);
    };
  }, [anchorEl, anchorOrigin, tourStepOrigin, show, maskHolePadding]);

  return { tourStepElRef };
};
