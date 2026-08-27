import { useLayoutEffect, RefObject } from 'react';
import { getAnchorCoordinate, getPopperCoordinate } from './Popper.utils';
import { PopperProps } from './Popper';

type UsePopperPositionProps = Pick<
  PopperProps,
  'anchorElRef' | 'anchorOrigin' | 'anchorPosition'
> &
  Required<
    Pick<PopperProps, 'anchorReference' | 'popperOrigin' | 'positionType'>
  > & {
    popperRef: RefObject<HTMLElement | null>;
  };

type UseAnchorWidthProps = Pick<
  PopperProps,
  'anchorReference' | 'anchorElRef'
> & {
  popperRef: RefObject<HTMLElement | null>;
};

export const usePopperPosition = ({
  popperRef,
  anchorReference,
  anchorElRef,
  anchorOrigin,
  anchorPosition,
  popperOrigin,
  positionType
}: UsePopperPositionProps) => {
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
    resizeObserver.observe(document.body);
    return () => {
      window.removeEventListener('resize', setPopperPosition);
      if (anchorEl) resizeObserver.unobserve(anchorEl);
      if (popperEl) resizeObserver.unobserve(popperEl);
      resizeObserver.unobserve(document.body);
      mutationObserver.disconnect();
    };
  }, [
    popperRef,
    anchorElRef,
    anchorOrigin,
    anchorPosition,
    anchorReference,
    popperOrigin,
    positionType
  ]);
};

export const useAnchorWidth = ({
  anchorReference,
  anchorElRef,
  popperRef
}: UseAnchorWidthProps) => {
  useLayoutEffect(() => {
    const anchorEl = anchorElRef?.current;
    const popperEl = popperRef.current;
    if (anchorReference !== 'anchorEl' || !anchorEl || !popperEl) return;

    const resizeObserver = new ResizeObserver(() => {
      popperEl.style.setProperty('--anchor-width', `${anchorEl.offsetWidth}px`);
    });
    resizeObserver.observe(anchorEl);

    return () => {
      resizeObserver.disconnect();
    };
  }, [anchorReference, anchorElRef, popperRef]);
};
