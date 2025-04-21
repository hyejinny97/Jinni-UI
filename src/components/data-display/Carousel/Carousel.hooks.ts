import {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useContext,
  useCallback
} from 'react';
import { flushSync } from 'react-dom';
import { CarouselProps, OrientationType } from './Carousel';
import CarouselContext from './Carousel.context';
import { countCarouselItems } from './Carousel.utils';
import { SECOND } from '@/constants/time';

type UseSlideVariablesProps = Pick<CarouselProps, 'children' | 'infinite'>;
type UseSlideValueProps = Pick<CarouselProps, 'onChange' | 'infinite'> &
  Required<Pick<CarouselProps, 'defaultValue'>> & {
    carouselElRef: React.RefObject<HTMLElement>;
    firstSlide: number;
    lastSlide: number;
    startSlide: number;
    endSlide: number;
    transformCarouselItemToSlide: (value: number) => number;
    transformSlideToCarouselItem: (value: number) => number;
  };
type UseAutoplayProps = Pick<
  CarouselProps,
  'autoplay' | 'disableAutoplayOnInteraction' | 'onAutoplayLeftTimeChange'
> &
  Required<Pick<CarouselProps, 'autoplayDuration'>> & {
    carouselElRef: React.RefObject<HTMLElement>;
    slideValue: number;
    goNextSlide: () => void;
    noNextSlide: boolean;
  };

export const useCarouselContext = () => {
  const carouselContext = useContext(CarouselContext);
  if (!carouselContext) throw Error('CarouselContext value is null');
  return carouselContext;
};

export const useVariables = ({
  children,
  infinite
}: UseSlideVariablesProps) => {
  const carouselItemsCount = countCarouselItems(children);
  const slidesCount = infinite ? carouselItemsCount + 2 : carouselItemsCount;
  const firstSlide = 0;
  const lastSlide = slidesCount - 1;
  const startSlide = infinite ? firstSlide + 1 : firstSlide;
  const endSlide = infinite ? lastSlide - 1 : lastSlide;

  const transformCarouselItemToSlide = useCallback(
    (value: number) => {
      return infinite ? value + 1 : value;
    },
    [infinite]
  );

  const transformSlideToCarouselItem = useCallback(
    (value: number) => {
      return infinite
        ? (value + carouselItemsCount - 1) % carouselItemsCount
        : value;
    },
    [infinite, carouselItemsCount]
  );

  return {
    carouselItemsCount,
    slidesCount,
    firstSlide,
    lastSlide,
    startSlide,
    endSlide,
    transformCarouselItemToSlide,
    transformSlideToCarouselItem
  };
};

export const useSlideValue = ({
  carouselElRef,
  defaultValue: carouselItemDefaultValue,
  onChange,
  infinite,
  firstSlide,
  lastSlide,
  startSlide,
  endSlide,
  transformCarouselItemToSlide,
  transformSlideToCarouselItem
}: UseSlideValueProps) => {
  const [slideValue, setSlideValue] = useState(
    transformCarouselItemToSlide(carouselItemDefaultValue)
  );

  const handleChange = useCallback(
    (value: { newSlideValue: number } | { newCarouselItemValue: number }) => {
      if ('newSlideValue' in value) {
        const { newSlideValue } = value;
        setSlideValue(newSlideValue);
        if (onChange) onChange(transformSlideToCarouselItem(newSlideValue));
      } else {
        const { newCarouselItemValue } = value;
        setSlideValue(transformCarouselItemToSlide(newCarouselItemValue));
        if (onChange) onChange(newCarouselItemValue);
      }
    },
    [onChange, transformSlideToCarouselItem, transformCarouselItemToSlide]
  );

  const goNextSlide = useCallback(() => {
    const nextSlide = slideValue + 1;
    if (nextSlide > lastSlide) return;
    handleChange({ newSlideValue: nextSlide });
  }, [slideValue, handleChange, lastSlide]);

  const goPrevSlide = useCallback(() => {
    const prevSlide = slideValue - 1;
    if (prevSlide < firstSlide) return;
    handleChange({ newSlideValue: prevSlide });
  }, [slideValue, handleChange, firstSlide]);

  useEffect(() => {
    const carouselEl = carouselElRef.current;
    const carouselContentEl = carouselEl?.querySelector(
      '.JinniCarouselContent'
    );
    if (!infinite || !carouselContentEl) return;

    const handleTransitionEnd = () => {
      if (slideValue === lastSlide) {
        carouselContentEl.classList.add('no-transition');
        flushSync(() => {
          handleChange({ newSlideValue: startSlide });
        });
        setTimeout(() => {
          carouselContentEl.classList.remove('no-transition');
        }, 0);
      }
      if (slideValue === firstSlide) {
        carouselContentEl.classList.add('no-transition');
        flushSync(() => {
          handleChange({ newSlideValue: endSlide });
        });
        setTimeout(() => {
          carouselContentEl.classList.remove('no-transition');
        }, 0);
      }
    };
    carouselContentEl.addEventListener('transitionend', handleTransitionEnd);
    return () => {
      carouselContentEl.removeEventListener(
        'transitionend',
        handleTransitionEnd
      );
    };
  }, [
    carouselElRef,
    infinite,
    slideValue,
    lastSlide,
    firstSlide,
    startSlide,
    endSlide,
    handleChange
  ]);

  return {
    carouselItemValue: transformSlideToCarouselItem(slideValue),
    slideValue,
    handleChange,
    goNextSlide,
    goPrevSlide,
    noPrevSlide: infinite ? false : slideValue === firstSlide,
    noNextSlide: infinite ? false : slideValue === lastSlide
  };
};

export const useHandleEvent = ({
  carouselElRef,
  noPrevSlide,
  noNextSlide,
  goNextSlide,
  goPrevSlide,
  orientation
}: {
  carouselElRef: React.RefObject<HTMLElement>;
  noPrevSlide: boolean;
  noNextSlide: boolean;
  goNextSlide: (event: Event | React.SyntheticEvent) => void;
  goPrevSlide: (event: Event | React.SyntheticEvent) => void;
  orientation: OrientationType;
}) => {
  const isPressedRef = useRef<boolean>(false);
  const pressedPositionRef = useRef<number | null>(null);
  const dragThresholdRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const carouselEl = carouselElRef.current;
    if (!carouselEl) return;

    const { width, height } = carouselEl.getBoundingClientRect();
    switch (orientation) {
      case 'horizontal':
        dragThresholdRef.current = width / 5;
        break;
      case 'vertical':
        dragThresholdRef.current = height / 5;
    }
  }, [carouselElRef, orientation]);

  useEffect(() => {
    const carouselEl = carouselElRef.current;
    if (!carouselEl) return;

    const getPosition = (event: MouseEvent | TouchEvent) => {
      const isMouseEvent = event instanceof MouseEvent;
      switch (orientation) {
        case 'horizontal':
          return isMouseEvent ? event.clientX : event.touches[0].clientX;
        case 'vertical':
          return isMouseEvent ? event.clientY : event.touches[0].clientY;
      }
    };

    const handleStart = (event: MouseEvent | TouchEvent) => {
      isPressedRef.current = true;
      pressedPositionRef.current = getPosition(event);
    };

    const handleMove = (event: MouseEvent | TouchEvent) => {
      const isPressed = isPressedRef.current;
      const dragThreshold = dragThresholdRef.current;
      const pressedPosition = pressedPositionRef.current;
      if (!isPressed || dragThreshold === null || pressedPosition === null)
        return;

      const currentPosition = getPosition(event);
      const dragLengthVector = pressedPosition - currentPosition;
      if (Math.abs(dragLengthVector) < dragThreshold) return;

      if (dragLengthVector > 0 && !noNextSlide) goNextSlide(event);
      else if (dragLengthVector < 0 && !noPrevSlide) goPrevSlide(event);
      pressedPositionRef.current = currentPosition;
    };

    const handleEnd = () => {
      isPressedRef.current = false;
      pressedPositionRef.current = null;
    };

    carouselEl.addEventListener('mousedown', handleStart);
    carouselEl.addEventListener('mousemove', handleMove);
    carouselEl.addEventListener('mouseup', handleEnd);
    carouselEl.addEventListener('mouseleave', handleEnd);
    carouselEl.addEventListener('touchstart', handleStart);
    carouselEl.addEventListener('touchmove', handleMove);
    carouselEl.addEventListener('touchend', handleEnd);

    return () => {
      carouselEl.removeEventListener('mousedown', handleStart);
      carouselEl.removeEventListener('mousemove', handleMove);
      carouselEl.removeEventListener('mouseup', handleEnd);
      carouselEl.removeEventListener('mouseleave', handleEnd);
      carouselEl.removeEventListener('touchstart', handleStart);
      carouselEl.removeEventListener('touchmove', handleMove);
      carouselEl.removeEventListener('touchend', handleEnd);
    };
  }, [
    carouselElRef,
    noPrevSlide,
    noNextSlide,
    goNextSlide,
    goPrevSlide,
    orientation
  ]);
};

export const useAutoplay = ({
  carouselElRef,
  slideValue,
  autoplay,
  autoplayDuration,
  disableAutoplayOnInteraction,
  onAutoplayLeftTimeChange,
  goNextSlide,
  noNextSlide
}: UseAutoplayProps) => {
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const prevSlideValueRef = useRef<number>(slideValue);
  const [leftTime, setLeftTime] = useState<number>(autoplayDuration);

  const pauseAutoplay = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    pauseAutoplay();
    intervalIdRef.current = setInterval(() => {
      setLeftTime((prev) => Math.max(prev - SECOND, 0));
    }, SECOND);
  }, [pauseAutoplay]);

  const resetAutoplay = useCallback(() => {
    setLeftTime(autoplayDuration);
    startAutoplay();
  }, [autoplayDuration, startAutoplay]);

  useEffect(() => {
    if (autoplay && !noNextSlide) {
      resetAutoplay();
    } else {
      pauseAutoplay();
    }

    return pauseAutoplay;
  }, [autoplay, noNextSlide, resetAutoplay, pauseAutoplay]);

  useEffect(() => {
    if (leftTime === 0) {
      goNextSlide();
      if (!noNextSlide && autoplay) {
        setLeftTime(autoplayDuration);
      }
    }
  }, [leftTime, autoplay, noNextSlide, autoplayDuration, goNextSlide]);

  useEffect(() => {
    if (prevSlideValueRef.current !== slideValue) {
      prevSlideValueRef.current = slideValue;
      if (autoplay && !noNextSlide) {
        resetAutoplay();
      }
    }
  }, [slideValue, autoplay, noNextSlide, resetAutoplay]);

  useEffect(() => {
    if (onAutoplayLeftTimeChange) onAutoplayLeftTimeChange(leftTime);
  }, [leftTime, onAutoplayLeftTimeChange]);

  useEffect(() => {
    const carouselEl = carouselElRef.current;
    if (!carouselEl || !disableAutoplayOnInteraction) return;

    carouselEl.addEventListener('mouseover', pauseAutoplay);
    carouselEl.addEventListener('mouseout', startAutoplay);
    carouselEl.addEventListener('touchstart', pauseAutoplay);
    carouselEl.addEventListener('touchmove', pauseAutoplay);
    carouselEl.addEventListener('touchend', startAutoplay);
    return () => {
      carouselEl.removeEventListener('mouseover', pauseAutoplay);
      carouselEl.removeEventListener('mouseout', startAutoplay);
      carouselEl.removeEventListener('touchstart', pauseAutoplay);
      carouselEl.removeEventListener('touchmove', pauseAutoplay);
      carouselEl.removeEventListener('touchend', startAutoplay);
    };
  }, [
    carouselElRef,
    disableAutoplayOnInteraction,
    pauseAutoplay,
    startAutoplay
  ]);
};
