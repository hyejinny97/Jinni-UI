import './Carousel.scss';
import { useRef } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import {
  useVariables,
  useSlideValue,
  useHandleEvent,
  useAutoplay
} from './Carousel.hooks';
import CarouselContext from './Carousel.context';
import { addFirstAndLastSlide } from './Carousel.utils';

export type OrientationType = 'horizontal' | 'vertical';

export type CarouselProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'defaultValue' | 'onChange'
> & {
  children: React.ReactNode;
  defaultValue?: number;
  onChange?: (value: number) => void;
  orientation?: OrientationType;
  infinite?: boolean;
  autoplay?: boolean;
  autoplayDuration?: number;
  disableAutoplayOnInteraction?: boolean;
  onAutoplayLeftTimeChange?: (leftTime: number) => void;
};

const Carousel = <T extends AsType = 'div'>(props: CarouselProps<T>) => {
  const {
    children,
    defaultValue = 0,
    onChange,
    orientation = 'horizontal',
    infinite,
    autoplay,
    autoplayDuration = 5000,
    disableAutoplayOnInteraction = false,
    onAutoplayLeftTimeChange,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const carouselElRef = useRef<HTMLElement>(null);
  const {
    carouselItemsCount,
    slidesCount,
    firstSlide,
    lastSlide,
    startSlide,
    endSlide,
    transformCarouselItemToSlide,
    transformSlideToCarouselItem
  } = useVariables({ children, infinite });
  const {
    carouselItemValue,
    slideValue,
    handleChange,
    goNextSlide,
    goPrevSlide,
    noPrevSlide,
    noNextSlide
  } = useSlideValue({
    carouselElRef,
    defaultValue,
    onChange,
    infinite,
    firstSlide,
    lastSlide,
    startSlide,
    endSlide,
    transformCarouselItemToSlide,
    transformSlideToCarouselItem
  });
  useAutoplay({
    carouselElRef,
    slideValue,
    autoplay,
    autoplayDuration,
    disableAutoplayOnInteraction,
    onAutoplayLeftTimeChange,
    goNextSlide,
    noNextSlide
  });
  useHandleEvent({
    carouselElRef,
    noPrevSlide,
    noNextSlide,
    goNextSlide,
    goPrevSlide,
    orientation
  });
  const newStyle = useStyle({
    '--slides-count': slidesCount,
    '--slide-value': slideValue,
    ...style
  });

  return (
    <CarouselContext.Provider
      value={{
        carouselItemsCount,
        carouselItemValue,
        noPrevSlide,
        noNextSlide,
        handleChange,
        goNextSlide,
        goPrevSlide,
        orientation
      }}
    >
      <Component
        ref={carouselElRef}
        className={cn('JinniCarousel', orientation, className)}
        style={newStyle}
        {...rest}
      >
        {infinite ? addFirstAndLastSlide(children) : children}
      </Component>
    </CarouselContext.Provider>
  );
};

export default Carousel;
