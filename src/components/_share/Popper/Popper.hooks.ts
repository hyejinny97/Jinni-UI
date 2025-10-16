import { useRef, useLayoutEffect } from 'react';
import { getAnchorCoordinate, getPopperCoordinate } from '@/utils/popper';
import { PopperType } from '@/types/popper';

type UsePopperPositionProps = Partial<
  Pick<PopperType, 'anchorElRef' | 'anchorPosition' | 'anchorOrigin'>
> &
  Pick<PopperType, 'anchorReference' | 'popperOrigin'>;

export const usePopperAbsolutePosition = ({
  anchorReference,
  anchorElRef,
  anchorOrigin,
  anchorPosition,
  popperOrigin
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

      popperEl.style.top = `${popperCoordinate.top + window.scrollY}px`;
      popperEl.style.left = `${popperCoordinate.left + window.scrollX}px`;
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
    popperOrigin
  ]);

  return { popperRef };
};
