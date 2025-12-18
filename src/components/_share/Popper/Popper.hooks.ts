import { useRef, useLayoutEffect } from 'react';
import { getAnchorCoordinate, getPopperCoordinate } from '@/utils/popper';
import { PopperProps } from './Popper';

type UsePopperPositionProps = Pick<
  PopperProps,
  | 'anchorReference'
  | 'popperOrigin'
  | 'anchorElRef'
  | 'anchorPosition'
  | 'anchorOrigin'
> &
  Required<Pick<PopperProps, 'positionType'>>;

export const usePopperPosition = ({
  anchorReference,
  anchorElRef,
  anchorOrigin,
  anchorPosition,
  popperOrigin,
  positionType
}: UsePopperPositionProps) => {
  const popperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const setPopperPosition = () => {
      const popperEl = popperRef.current;
      if (!popperEl) return;

      const anchorCoordinate = getAnchorCoordinate({
        anchorReference,
        anchorElRef,
        anchorOrigin,
        anchorPosition
      });
      const popperCoordinate = getPopperCoordinate({
        anchorCoordinate,
        popperOrigin,
        popperEl
      });

      switch (positionType) {
        case 'absolute':
          popperEl.style.top = `${popperCoordinate.top + window.scrollY}px`;
          popperEl.style.left = `${popperCoordinate.left + window.scrollX}px`;
          break;
        case 'fixed':
          popperEl.style.top = `${popperCoordinate.top}px`;
          popperEl.style.left = `${popperCoordinate.left}px`;
      }
    };

    setPopperPosition();
    window.addEventListener('resize', setPopperPosition);
    const observer = new ResizeObserver(setPopperPosition);
    const anchorEl = anchorElRef?.current;
    if (anchorEl) {
      observer.observe(anchorEl);
    }
    return () => {
      window.removeEventListener('resize', setPopperPosition);
      if (anchorEl) {
        observer.unobserve(anchorEl);
      }
    };
  }, [
    anchorElRef,
    anchorOrigin,
    anchorPosition,
    anchorReference,
    popperOrigin,
    positionType
  ]);

  return { popperRef };
};
