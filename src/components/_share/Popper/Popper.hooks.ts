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
    const resizeObserver = new ResizeObserver(setPopperPosition);
    const mutationObserver = new MutationObserver(setPopperPosition);
    const mutationOptions = {
      attributes: true,
      attributeFilter: ['top', 'bottom', 'left', 'right', 'transform']
    };
    const anchorEl = anchorElRef?.current;
    const popperEl = popperRef?.current;
    if (anchorEl) {
      resizeObserver.observe(anchorEl);
      mutationObserver.observe(anchorEl, mutationOptions);
    }
    if (popperEl) {
      resizeObserver.observe(popperEl);
      mutationObserver.observe(popperEl, mutationOptions);
    }
    return () => {
      window.removeEventListener('resize', setPopperPosition);
      if (anchorEl) resizeObserver.unobserve(anchorEl);
      if (popperEl) resizeObserver.unobserve(popperEl);
      mutationObserver.disconnect();
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
