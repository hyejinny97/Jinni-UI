import './Carousel.scss';
import { useRef } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import {
  useSlideValue,
  useSwipe,
  useScrollToActiveSlide,
  useAutoplay
} from './Carousel.hooks';
import CarouselContext from './Carousel.context';
import { countCarouselItems } from './Carousel.utils';
import { SECOND } from '@/constants/time';

export type OrientationType = 'horizontal' | 'vertical';

export type CarouselProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'defaultValue' | 'onChange'
> & {
  children: React.ReactNode;
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  orientation?: OrientationType;
  spacing?: number;
  autoplay?: boolean;
  autoplayDuration?: number;
  disableAutoplayOnInteraction?: boolean;
  onAutoplayLeftTimeChange?: (leftTime: number) => void;
  slideAlignment?: 'start' | 'center';
  snapMode?: 'snap' | 'free';
  disableSlipEffect?: boolean;
  slipSize?: 'small' | 'medium' | 'large';
  disableBounceEffect?: boolean;
};

const Carousel = <T extends AsType = 'div'>(props: CarouselProps<T>) => {
  const {
    children,
    defaultValue = 0,
    value,
    onChange,
    orientation = 'horizontal',
    spacing = 0,
    autoplay,
    autoplayDuration = 5 * SECOND,
    disableAutoplayOnInteraction,
    onAutoplayLeftTimeChange,
    slideAlignment = 'start',
    snapMode = 'snap',
    disableSlipEffect,
    slipSize = 'medium',
    disableBounceEffect,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const carouselElRef = useRef<HTMLElement>(null);
  const count = countCarouselItems(children);
  const {
    scrollToActiveSlide,
    enableScrollToActiveSlide,
    disableScrollToActiveSlide
  } = useScrollToActiveSlide({ value });
  const {
    slideValue,
    goSlide,
    goPrevSlide,
    goNextSlide,
    noPrevSlide,
    noNextSlide
  } = useSlideValue({
    count,
    defaultValue,
    value,
    onChange
  });
  const { isSwiping, scrollEndLimitRef } = useSwipe({
    carouselElRef,
    goSlide,
    orientation,
    slideAlignment,
    disableBounceEffect,
    snapMode,
    disableSlipEffect,
    slipSize,
    disableScrollToActiveSlide
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
  const newStyle = useStyle(style);

  return (
    <CarouselContext.Provider
      value={{
        count,
        slideValue,
        goSlide,
        goPrevSlide,
        goNextSlide,
        noPrevSlide,
        noNextSlide,
        isSwiping,
        scrollEndLimitRef,
        scrollToActiveSlide,
        enableScrollToActiveSlide,
        orientation,
        spacing,
        slideAlignment
      }}
    >
      <Component
        ref={carouselElRef}
        className={cn('JinniCarousel', orientation, className)}
        style={newStyle}
        {...rest}
      >
        {children}
      </Component>
    </CarouselContext.Provider>
  );
};

export default Carousel;
