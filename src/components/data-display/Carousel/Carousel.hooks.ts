import {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useContext,
  useCallback
} from 'react';
import { CarouselProps, OrientationType } from './Carousel';
import CarouselContext from './Carousel.context';

type UseCarouselValueProps = Pick<CarouselProps, 'value' | 'onChange'> &
  Required<Pick<CarouselProps, 'defaultValue'>>;

export const useCarouselContext = () => {
  const carouselContext = useContext(CarouselContext);
  if (!carouselContext) throw Error('CarouselContext value is null');
  return carouselContext;
};

export const useCarouselItem = ({
  carouselElRef,
  carouselValue
}: {
  carouselElRef: React.RefObject<HTMLElement>;
  carouselValue: number;
}) => {
  const [carouselItemCount, setCarouselItemCount] = useState<number>(0);

  useLayoutEffect(() => {
    const carouselEl = carouselElRef.current;
    if (!carouselEl) return;
    const carouselContentEl = carouselEl.querySelector('.JinniCarouselContent');
    setCarouselItemCount(
      carouselContentEl?.querySelectorAll('.JinniCarouselItem').length || 0
    );
  }, [carouselElRef]);

  return {
    carouselElRef,
    carouselItemCount,
    isFirstCarouselItem: carouselValue === 0,
    isLastCarouselItem: carouselValue === carouselItemCount - 1
  };
};

export const useCarouselValue = ({
  defaultValue,
  value,
  onChange
}: UseCarouselValueProps) => {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const carouselValue = isControlled ? value : uncontrolledValue;

  const handleChange = useCallback(
    (event: Event | React.SyntheticEvent, newValue: number) => {
      if (!isControlled) setUncontrolledValue(newValue);
      if (onChange) onChange(event, newValue);
    },
    [isControlled, onChange]
  );

  const goNextSlide = useCallback(
    (event: Event | React.SyntheticEvent) => {
      handleChange(event, carouselValue + 1);
    },
    [carouselValue, handleChange]
  );

  const goPrevSlide = useCallback(
    (event: Event | React.SyntheticEvent) => {
      handleChange(event, carouselValue - 1);
    },
    [carouselValue, handleChange]
  );

  return {
    carouselValue: isControlled ? value : uncontrolledValue,
    handleChange,
    goNextSlide,
    goPrevSlide
  };
};

export const useHandleEvent = ({
  carouselElRef,
  isFirstCarouselItem,
  isLastCarouselItem,
  goNextSlide,
  goPrevSlide,
  orientation
}: {
  carouselElRef: React.RefObject<HTMLElement>;
  isFirstCarouselItem: boolean;
  isLastCarouselItem: boolean;
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

      if (dragLengthVector > 0 && !isLastCarouselItem) goNextSlide(event);
      else if (dragLengthVector < 0 && !isFirstCarouselItem) goPrevSlide(event);
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
    isFirstCarouselItem,
    isLastCarouselItem,
    goNextSlide,
    goPrevSlide,
    orientation
  ]);
};
