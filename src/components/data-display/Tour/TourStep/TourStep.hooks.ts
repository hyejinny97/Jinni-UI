import React, { useLayoutEffect } from 'react';
import { TourStepProps } from './TourStep';
import { getAnchorElCoordinate, getPopperCoordinate } from '@/utils/popper';
import {
  placementToAnchorOrigin,
  placementToPopperOrigin
} from '@/utils/popper';

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
      tourStepEl.style.top = `${top + window.scrollY}px`;
      tourStepEl.style.left = `${left + window.scrollX}px`;
    };

    setPosition();
    window.addEventListener('resize', setPosition);
    const observer = new ResizeObserver(setPosition);
    observer.observe(anchorEl);
    return () => {
      window.removeEventListener('resize', setPosition);
      observer.unobserve(anchorEl);
    };
  }, [tourStepElRef, anchorEl, show, placement]);
};
