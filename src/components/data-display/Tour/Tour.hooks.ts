import React, { useLayoutEffect, useContext, useEffect } from 'react';
import { TourProps } from './Tour';
import { TourStepProps } from './TourStep';
import TourContext from './Tour.contexts';
import { getAnchorElCoordinate, getPopperCoordinate } from '@/utils/popper';
import {
  placementToAnchorOrigin,
  placementToPopperOrigin
} from '@/utils/popper';

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

export const usePlacement = ({
  tourStepElRef,
  anchorEl,
  placement,
  show
}: Required<
  Pick<TourStepProps, 'anchorEl' | 'placement'> & {
    tourStepElRef: React.RefObject<HTMLElement>;
    show: boolean;
  }
>) => {
  useLayoutEffect(() => {
    if (!show) return;

    const setPosition = () => {
      const tourStepEl = tourStepElRef.current;
      if (!tourStepEl) return;

      const anchorOrigin = placementToAnchorOrigin(placement);
      const tourStepOrigin = placementToPopperOrigin(placement);
      const anchorCoordinate = getAnchorElCoordinate({
        anchorEl,
        anchorOrigin
      });
      const tourStepElCoordinate = getPopperCoordinate({
        anchorCoordinate,
        popperOrigin: tourStepOrigin,
        popperEl: tourStepEl
      });

      const { top, left } = tourStepElCoordinate;
      tourStepEl.style.top = `${top}px`;
      tourStepEl.style.left = `${left}px`;
    };

    setPosition();
    window.addEventListener('resize', setPosition);
    window.addEventListener('scroll', setPosition);
    const observer = new ResizeObserver(setPosition);
    observer.observe(anchorEl);
    return () => {
      window.removeEventListener('resize', setPosition);
      window.removeEventListener('scroll', setPosition);
      observer.unobserve(anchorEl);
    };
  }, [tourStepElRef, anchorEl, show, placement]);
};
