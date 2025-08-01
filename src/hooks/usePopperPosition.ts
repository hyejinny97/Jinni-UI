import { useRef, useLayoutEffect, useState } from 'react';
import { getAnchorCoordinate, getPopperCoordinate } from '@/utils/popper';
import { PopperType } from '@/types/popper';

type UsePopperPositionProps = Partial<
  Pick<PopperType, 'anchorElRef' | 'anchorPosition' | 'anchorOrigin'>
> &
  Pick<PopperType, 'anchorReference' | 'popperOrigin'> & { open: boolean };

const usePopperPosition = ({
  anchorReference,
  anchorElRef,
  anchorOrigin,
  anchorPosition,
  popperOrigin,
  open
}: UsePopperPositionProps) => {
  const popperRef = useRef<HTMLElement>(null);
  const [popperPosition, setPopperPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    const handlePopperPosition = () => {
      const popperEl = popperRef.current;
      if (!popperEl || !open) return;

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

      setPopperPosition(popperCoordinate);
    };

    handlePopperPosition();
    window.addEventListener('resize', handlePopperPosition);
    window.addEventListener('scroll', handlePopperPosition);
    const observer = new ResizeObserver(handlePopperPosition);
    const anchorEl = anchorElRef?.current;
    if (anchorEl) {
      observer.observe(anchorEl);
    }
    return () => {
      window.removeEventListener('resize', handlePopperPosition);
      window.removeEventListener('scroll', handlePopperPosition);
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
    open
  ]);

  return { popperRef, popperPosition };
};

export default usePopperPosition;
