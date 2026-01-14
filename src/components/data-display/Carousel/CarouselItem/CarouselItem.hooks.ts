import { useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { useCarousel } from '../Carousel.hooks';
import { useCarouselContent } from '../CarouselContent';

export const useScrollBySlideValue = () => {
  const {
    slideValue,
    isSwiping,
    orientation,
    slideAlignment,
    scrollEndLimitRef,
    scrollToActiveSlide
  } = useCarousel();
  const { carouselContainerElRef, itemValue } = useCarouselContent();
  const carouselItemElRef = useRef<HTMLElement>(null);
  const isActive = slideValue === itemValue;
  const isActiveRef = useRef(isActive);

  const scrollToCurrentSlide = useCallback(
    ({ behavior }: { behavior: 'instant' | 'smooth' }) => {
      const carouselContainerEl = carouselContainerElRef.current;
      const carouselItemEl = carouselItemElRef.current;
      const scrollEndLimit = scrollEndLimitRef.current;
      if (!carouselContainerEl || !carouselItemEl) return;

      const scrollAxis = orientation === 'horizontal' ? 'left' : 'top';
      const offsetAxis =
        orientation === 'horizontal' ? 'offsetLeft' : 'offsetTop';
      const clientSide =
        orientation === 'horizontal' ? 'clientWidth' : 'clientHeight';
      let scrollSize: number = 0;
      switch (slideAlignment) {
        case 'start': {
          scrollSize = carouselItemEl[offsetAxis];
          break;
        }
        case 'center': {
          scrollSize =
            carouselItemEl[offsetAxis] +
            carouselItemEl[clientSide] / 2 -
            carouselContainerEl[clientSide] / 2;
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
    if (isActiveRef.current) {
      scrollToCurrentSlide({ behavior: 'instant' });
    }
  }, [scrollToCurrentSlide]);

  useEffect(() => {
    if (isSwiping || !isActive || !scrollToActiveSlide) return;
    scrollToCurrentSlide({ behavior: 'smooth' });
  }, [isSwiping, isActive, scrollToActiveSlide, scrollToCurrentSlide]);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    const carouselContainerEl = carouselContainerElRef.current;
    if (!carouselContainerEl) return;

    const resizeObserver = new ResizeObserver(() => {
      if (!isActiveRef.current) return;
      scrollToCurrentSlide({ behavior: 'instant' });
    });
    resizeObserver.observe(carouselContainerEl);
    return () => {
      resizeObserver.unobserve(carouselContainerEl);
    };
  }, [carouselContainerElRef, scrollToCurrentSlide]);

  return { carouselItemElRef };
};
