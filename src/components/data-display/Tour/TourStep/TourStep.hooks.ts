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

export const useScrollToAnchor = ({
  tourStepElRef,
  anchorEl,
  show
}: Required<
  Pick<TourStepProps, 'anchorEl'> & {
    tourStepElRef: React.RefObject<HTMLElement>;
    show: boolean;
  }
>) => {
  useLayoutEffect(() => {
    const tourStepEl = tourStepElRef.current;
    if (!show || !tourStepEl) return;

    const isInViewport = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    if (!(isInViewport(anchorEl) && isInViewport(tourStepEl))) {
      const {
        left: anchorLeft,
        top: anchorTop,
        width: anchorWidth,
        height: anchorHeight
      } = anchorEl.getBoundingClientRect();
      const absoluteY = window.scrollY + anchorTop;
      const absoluteX = window.scrollX + anchorLeft;
      window.scrollTo({
        left: absoluteX - window.innerWidth / 2 + anchorWidth / 2,
        top: absoluteY - window.innerHeight / 2 + anchorHeight / 2,
        behavior: 'smooth'
      });
    }
  }, [anchorEl, show]);
};
