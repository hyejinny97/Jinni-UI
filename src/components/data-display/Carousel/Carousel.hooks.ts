import { useRef, useState, useEffect, useContext, useCallback } from 'react';
import { CarouselProps } from './Carousel';
import CarouselContext from './Carousel.context';
import { useTimer } from '@/hooks/useTimer';

type UseScrollToActiveSlideProps = Pick<CarouselProps, 'value'>;

type UseSlideValueProps = Pick<CarouselProps, 'value' | 'onChange'> &
  Required<Pick<CarouselProps, 'defaultValue'>> & {
    count: number;
  };

type UseSwipeProps = Required<
  Pick<
    CarouselProps,
    'orientation' | 'slideAlignment' | 'snapMode' | 'slipSize'
  >
> &
  Pick<
    CarouselProps,
    'disableBounceEffect' | 'disableSlipEffect' | 'disableSwipeEffect'
  > & {
    carouselElRef: React.RefObject<HTMLElement>;
    goSlide: (newValue: number) => void;
    disableScrollToActiveSlide: () => void;
  };

type UseAutoplayProps = Required<Pick<CarouselProps, 'autoplayDuration'>> &
  Pick<
    CarouselProps,
    'autoplay' | 'disableAutoplayOnInteraction' | 'onAutoplayLeftTimeChange'
  > & {
    carouselElRef: React.RefObject<HTMLElement>;
    slideValue: number;
    goNextSlide: () => void;
    noNextSlide: boolean;
  };

export const useScrollToActiveSlide = ({
  value
}: UseScrollToActiveSlideProps) => {
  const [scrollToActiveSlide, setScrollToActiveSlide] = useState<boolean>(true);

  const enableScrollToActiveSlide = useCallback(() => {
    setScrollToActiveSlide(true);
  }, []);
  const disableScrollToActiveSlide = useCallback(() => {
    setScrollToActiveSlide(false);
  }, []);

  useEffect(() => {
    enableScrollToActiveSlide();
  }, [value, enableScrollToActiveSlide]);

  return {
    scrollToActiveSlide,
    enableScrollToActiveSlide,
    disableScrollToActiveSlide
  };
};

export const useSlideValue = ({
  count,
  defaultValue,
  value,
  onChange
}: UseSlideValueProps) => {
  const isControlled = value !== undefined;
  const [uncontrolledSlideValue, setUncontrolledSlideValue] =
    useState(defaultValue);
  const slideValue = isControlled ? value : uncontrolledSlideValue;

  const goSlide = useCallback(
    (newValue: number) => {
      if (!isControlled) setUncontrolledSlideValue(newValue);
      if (onChange) onChange(newValue);
    },
    [isControlled, onChange]
  );

  return {
    slideValue,
    goSlide,
    goPrevSlide: () => goSlide(Math.max(0, slideValue - 1)),
    goNextSlide: () => goSlide(Math.min(count, slideValue + 1)),
    noPrevSlide: slideValue === 0,
    noNextSlide: slideValue === count - 1
  };
};

export const useSwipe = ({
  carouselElRef,
  goSlide,
  orientation,
  slideAlignment,
  disableBounceEffect,
  snapMode,
  disableSlipEffect,
  slipSize,
  disableScrollToActiveSlide,
  disableSwipeEffect
}: UseSwipeProps) => {
  const [isSwiping, setSwiping] = useState<boolean>(false);
  const scrollEndLimitRef = useRef<number>(Number.MAX_VALUE);
  const prevTimeStampRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const carouselEl = carouselElRef.current;
    if (!carouselEl || disableSwipeEffect) return;

    const carouselContainerEl = carouselEl.querySelector<HTMLElement>(
      ':scope > .JinniCarouselContainer'
    );
    if (!carouselContainerEl) return;

    const carouselContentEl = carouselContainerEl.querySelector<HTMLElement>(
      ':scope > .JinniCarouselContent'
    );
    if (!carouselContentEl) return;

    const carouselItemElList = carouselContentEl.querySelectorAll<HTMLElement>(
      ':scope > .JinniCarouselItem'
    );
    const reversedCarouselItemElList = [...carouselItemElList].reverse();
    const maxItemIdx = carouselItemElList.length - 1;
    const firstItem = carouselItemElList[0];
    const lastItem = carouselItemElList[maxItemIdx];

    const calculateScrollLimit = () => {
      const offsetAxis =
        orientation === 'horizontal' ? 'offsetLeft' : 'offsetTop';
      const clientSize =
        orientation === 'horizontal' ? 'clientWidth' : 'clientHeight';
      let scrollStartLimit: number = 0;
      let scrollEndLimit: number = carouselContentEl.scrollWidth;
      switch (slideAlignment) {
        case 'start': {
          scrollStartLimit = firstItem[offsetAxis];
          scrollEndLimit =
            lastItem[offsetAxis] +
            lastItem[clientSize] -
            carouselContainerEl[clientSize];
          break;
        }
        case 'center': {
          scrollStartLimit =
            firstItem[offsetAxis] -
            (carouselContainerEl[clientSize] - firstItem[clientSize]) / 2;
          scrollEndLimit =
            lastItem[offsetAxis] -
            (carouselContainerEl[clientSize] - lastItem[clientSize]) / 2;
        }
      }
      return { scrollStartLimit, scrollEndLimit };
    };
    const { scrollStartLimit, scrollEndLimit } = calculateScrollLimit();
    scrollEndLimitRef.current = scrollEndLimit;

    const checkScrollOverLimits = () => {
      const scrollAxis =
        orientation === 'horizontal' ? 'scrollLeft' : 'scrollTop';
      return {
        isOverStartLimit: carouselContainerEl[scrollAxis] < scrollStartLimit,
        isOverEndLimit: carouselContainerEl[scrollAxis] > scrollEndLimit,
        scrollSizeOverStartLimit: Math.max(
          0,
          scrollStartLimit - carouselContainerEl[scrollAxis]
        ),
        scrollSizeOverEndLimit: Math.max(
          0,
          carouselContainerEl[scrollAxis] - scrollEndLimit
        )
      };
    };
    const restrictWithinLimits = ({ scrollValue }: { scrollValue: number }) => {
      return Math.max(scrollStartLimit, Math.min(scrollEndLimit, scrollValue));
    };
    const translate = (event: PointerEvent) => {
      const scrollAxis =
        orientation === 'horizontal' ? 'scrollLeft' : 'scrollTop';
      const movement =
        orientation === 'horizontal' ? event.movementX : event.movementY;
      let scrollSize: number = carouselContainerEl[scrollAxis] - movement;
      if (disableBounceEffect) {
        scrollSize = restrictWithinLimits({
          scrollValue: scrollSize
        });
      } else {
        const {
          isOverStartLimit,
          isOverEndLimit,
          scrollSizeOverStartLimit,
          scrollSizeOverEndLimit
        } = checkScrollOverLimits();
        if (isOverStartLimit) {
          scrollSize =
            carouselContainerEl[scrollAxis] -
            movement / Math.sqrt(scrollSizeOverStartLimit);
        }
        if (isOverEndLimit) {
          scrollSize =
            carouselContainerEl[scrollAxis] -
            movement / Math.sqrt(scrollSizeOverEndLimit);
        }
      }
      carouselContainerEl[scrollAxis] = scrollSize;
    };
    const setSlideValue = () => {
      const rectSide = orientation === 'horizontal' ? 'left' : 'top';
      const rectSize = orientation === 'horizontal' ? 'width' : 'height';
      const scrollAxis =
        orientation === 'horizontal' ? 'scrollLeft' : 'scrollTop';
      const offsetAxis =
        orientation === 'horizontal' ? 'offsetLeft' : 'offsetTop';

      if (carouselContainerEl[scrollAxis] >= scrollEndLimit) {
        goSlide(maxItemIdx);
        return;
      }

      let itemIdx: number = -1;
      switch (slideAlignment) {
        case 'start': {
          itemIdx = reversedCarouselItemElList.findIndex(
            (item) =>
              item.getBoundingClientRect()[rectSide] <=
              carouselContainerEl.getBoundingClientRect()[rectSide]
          );
          break;
        }
        case 'center': {
          itemIdx = reversedCarouselItemElList.findIndex(
            (item) =>
              item.getBoundingClientRect()[rectSide] <=
              carouselContainerEl.getBoundingClientRect()[rectSide] +
                carouselContainerEl.getBoundingClientRect()[rectSize] / 2
          );
        }
      }
      if (itemIdx === -1) return;

      let activeItemIdx = maxItemIdx - itemIdx;
      if (slideAlignment === 'start') {
        const activeItem = carouselItemElList[activeItemIdx];
        const isOverMiddleOfItem =
          carouselContainerEl[scrollAxis] >=
          activeItem[offsetAxis] +
            activeItem.getBoundingClientRect()[rectSize] / 2;
        if (isOverMiddleOfItem) {
          activeItemIdx = Math.min(maxItemIdx, activeItemIdx + 1);
        }
      }
      goSlide(activeItemIdx);
    };
    const scrollWithinLimits = () => {
      const scrollAxis = orientation === 'horizontal' ? 'left' : 'top';
      const { isOverStartLimit, isOverEndLimit } = checkScrollOverLimits();
      if (isOverStartLimit) {
        carouselContainerEl.scroll({
          [scrollAxis]: scrollStartLimit,
          behavior: 'smooth'
        });
      }
      if (isOverEndLimit) {
        carouselContainerEl.scroll({
          [scrollAxis]: scrollEndLimit,
          behavior: 'smooth'
        });
      }
    };
    const stopInterval = () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
    const slip = () => {
      const scrollAxis =
        orientation === 'horizontal' ? 'scrollLeft' : 'scrollTop';
      const INTERVAL_TIME = 1; // 단위: ms
      const ACCELERATION = 0.1; // 단위: px/ms

      let amplification: number = 1;
      switch (slipSize) {
        case 'small':
          amplification = 2;
          break;
        case 'medium':
          amplification = 4;
          break;
        case 'large':
          amplification = 6;
          break;
      }
      velocityRef.current *= amplification;

      intervalIdRef.current = setInterval(() => {
        const firstVelocity = velocityRef.current; // 단위: px/ms
        const oppositeSign = Math.sign(firstVelocity) * -1;
        const lastVelocity =
          firstVelocity + ACCELERATION * oppositeSign * INTERVAL_TIME;
        const preprocessedLastVelocity =
          Math.sign(firstVelocity) > 0
            ? Math.max(0, lastVelocity)
            : Math.min(0, lastVelocity);
        const movement = preprocessedLastVelocity * INTERVAL_TIME;
        if (
          movement === 0 ||
          carouselContainerEl[scrollAxis] <= scrollStartLimit ||
          carouselContainerEl[scrollAxis] >= scrollEndLimit
        ) {
          stopInterval();
          return;
        }

        carouselContainerEl[scrollAxis] = restrictWithinLimits({
          scrollValue: carouselContainerEl[scrollAxis] - movement
        });
        velocityRef.current = preprocessedLastVelocity;
        setSlideValue();
      }, INTERVAL_TIME);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!carouselContentEl.contains(event.target as Node | null)) return;
      if (snapMode === 'free') disableScrollToActiveSlide();
      prevTimeStampRef.current = event.timeStamp;
      stopInterval();
      setSwiping(true);
      translate(event);
      setSlideValue();
    };
    const handlePointerMove = (event: PointerEvent) => {
      if (!isSwiping) return;
      velocityRef.current =
        event.movementX / (event.timeStamp - prevTimeStampRef.current);
      prevTimeStampRef.current = event.timeStamp;
      translate(event);
      setSlideValue();
    };
    const handlePointerUp = () => {
      if (!isSwiping) return;
      const { isOverStartLimit, isOverEndLimit } = checkScrollOverLimits();
      if (
        snapMode === 'free' &&
        !disableSlipEffect &&
        velocityRef.current !== 0 &&
        !isOverStartLimit &&
        !isOverEndLimit
      ) {
        slip();
      }
      setSwiping(false);
      scrollWithinLimits();
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [
    carouselElRef,
    isSwiping,
    goSlide,
    orientation,
    slideAlignment,
    disableBounceEffect,
    snapMode,
    disableSlipEffect,
    slipSize,
    disableScrollToActiveSlide,
    disableSwipeEffect
  ]);

  return { isSwiping, scrollEndLimitRef };
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
  const { leftTime, startTimer, pauseTimer, resetTimer } = useTimer({
    time: autoplayDuration
  });
  const isSwipingRef = useRef<boolean>(false);

  useEffect(() => {
    if (!autoplay) return;
    resetTimer();
    startTimer();
  }, [slideValue, autoplay, resetTimer, startTimer]);

  useEffect(() => {
    const carouselEl = carouselElRef.current;
    if (!carouselEl || !autoplay || !disableAutoplayOnInteraction) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!carouselEl.contains(event.target as Node | null)) return;
      isSwipingRef.current = true;
      pauseTimer();
    };
    const handlePointerMove = () => {
      if (!isSwipingRef.current) return;
      pauseTimer();
    };
    const handlePointerUp = () => {
      if (!isSwipingRef.current) return;
      isSwipingRef.current = false;
      startTimer();
    };

    carouselEl.addEventListener('mouseover', pauseTimer);
    carouselEl.addEventListener('mousemove', pauseTimer);
    carouselEl.addEventListener('mouseout', startTimer);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      carouselEl.removeEventListener('mouseover', pauseTimer);
      carouselEl.removeEventListener('mousemove', pauseTimer);
      carouselEl.removeEventListener('mouseout', startTimer);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [
    carouselElRef,
    autoplay,
    disableAutoplayOnInteraction,
    pauseTimer,
    startTimer
  ]);

  useEffect(() => {
    onAutoplayLeftTimeChange?.(leftTime);
  }, [leftTime, onAutoplayLeftTimeChange]);

  useEffect(() => {
    if (leftTime !== 0) return;
    if (noNextSlide) {
      pauseTimer();
    } else {
      goNextSlide();
      resetTimer();
      startTimer();
    }
  }, [leftTime, noNextSlide, pauseTimer, resetTimer, startTimer, goNextSlide]);
};

export const useCarousel = () => {
  const value = useContext(CarouselContext);
  if (!value) throw Error('CarouselContext value is null');
  return value;
};
