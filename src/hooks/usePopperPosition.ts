import { useRef, useLayoutEffect, useState } from 'react';
import { getAnchorCoordinate, getPopperCoordinate } from '@/utils/popper';
import { PopperType } from '@/types/popper';

type UsePopperPositionProps = Partial<
  Pick<PopperType, 'anchorEl' | 'anchorPosition' | 'anchorOrigin'>
> &
  Pick<PopperType, 'anchorReference' | 'popperOrigin'> & { open: boolean };

const usePopperPosition = ({
  anchorReference,
  anchorEl,
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
        anchorEl,
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
    return () => {
      window.removeEventListener('resize', handlePopperPosition);
    };
  }, [
    anchorEl,
    anchorOrigin,
    anchorPosition,
    anchorReference,
    popperOrigin,
    open
  ]);

  return { popperRef, popperPosition };
};

export default usePopperPosition;
