import { useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { useCarousel } from '../Carousel.hooks';
import { useCarouselContent } from '../CarouselContent';

export const useScrollBySlideValue = () => {
  const {
    slideValue,
    isSwiping,
    orientation,
    slideAlignment,
    scrollEndLimitRef
  } = useCarousel();
  const { carouselContainerElRef, itemValue } = useCarouselContent();
  const carouselItemElRef = useRef<HTMLElement>(null);
  const isActive = slideValue === itemValue;

  const scrollToCurrentSlide = useCallback(
    ({ behavior }: { behavior: 'instant' | 'smooth' }) => {
      const carouselContainerEl = carouselContainerElRef.current;
      const carouselItemEl = carouselItemElRef.current;
      const scrollEndLimit = scrollEndLimitRef.current;
      if (!carouselContainerEl || !carouselItemEl) return;

      let scrollAxis: 'left' | 'top' = 'left';
      let scrollSize: number = 0;
      switch (orientation) {
        case 'horizontal': {
          scrollAxis = 'left';
          switch (slideAlignment) {
            case 'start': {
              scrollSize = carouselItemEl.offsetLeft;
              break;
            }
            case 'center': {
              scrollSize =
                carouselItemEl.offsetLeft +
                carouselItemEl.clientWidth / 2 -
                carouselContainerEl.clientWidth / 2;
            }
          }
          break;
        }
        case 'vertical': {
          scrollAxis = 'top';
          switch (slideAlignment) {
            case 'start': {
              scrollSize = carouselItemEl.offsetTop;
              break;
            }
            case 'center': {
              scrollSize =
                carouselItemEl.offsetTop +
                carouselItemEl.clientHeight / 2 -
                carouselContainerEl.clientHeight / 2;
            }
          }
          break;
        }
      }
      carouselContainerEl.scroll({
        [scrollAxis]: Math.min(scrollEndLimit, scrollSize),
        behavior
      });
    },
    [carouselContainerElRef, orientation, slideAlignment, scrollEndLimitRef]
  );

  useLayoutEffect(() => {
    if (isActive) {
      scrollToCurrentSlide({ behavior: 'instant' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSwiping || !isActive) return;
    scrollToCurrentSlide({ behavior: 'smooth' });
  }, [isSwiping, isActive, scrollToCurrentSlide]);

  return { carouselItemElRef };
};
