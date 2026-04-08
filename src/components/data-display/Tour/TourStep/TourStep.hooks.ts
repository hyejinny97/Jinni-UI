import { useLayoutEffect, useRef } from 'react';
import { TourStepProps } from './TourStep';

type UseScrollToAnchorProps = Required<
  Pick<TourStepProps, 'anchorElRef'> & {
    show: boolean;
  }
>;

export const useScrollToAnchor = ({
  anchorElRef,
  show
}: UseScrollToAnchorProps) => {
  const tourStepElRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const anchorEl = anchorElRef.current;
    const tourStepEl = tourStepElRef.current;
    if (!show || !tourStepEl || !anchorEl) return;

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
  }, [anchorElRef, show]);

  return { tourStepElRef };
};
