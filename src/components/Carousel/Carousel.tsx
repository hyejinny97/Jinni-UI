import './Carousel.scss';
import { useRef } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import {
  useSlideValue,
  useScrollLimit,
  useSwipe,
  useScrollToActiveSlide,
  useAutoplay
} from './Carousel.hooks';
import CarouselContext from './Carousel.context';
import { countCarouselItems } from './Carousel.utils';
import { SECOND } from '@/constants/time';
import { mergeRefs } from '@/utils/mergeRefs';

export type OrientationType = 'horizontal' | 'vertical';

export type CarouselProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'defaultValue' | 'onChange' | 'children'
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
  autoplayIntervalTime?: number;
  slideAlignment?: 'start' | 'center';
  snapMode?: 'snap' | 'free';
  disableSlipEffect?: boolean;
  slipSize?: 'small' | 'medium' | 'large';
  disableSwipeEffect?: boolean;
  disableBounceEffect?: boolean;
};

const Carousel = <T extends AsType = 'div'>({
  ref,
  ...props
}: CarouselProps<T>) => {
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
    autoplayIntervalTime = 1 * SECOND,
    slideAlignment = 'start',
    snapMode = 'snap',
    disableSlipEffect,
    slipSize = 'medium',
    disableSwipeEffect,
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
  const { scrollStartLimit, scrollEndLimit } = useScrollLimit({
    carouselElRef,
    orientation,
    slideAlignment,
    children
  });
  const { isSwiping } = useSwipe({
    carouselElRef,
    scrollStartLimit,
    scrollEndLimit,
    goSlide,
    orientation,
    slideAlignment,
    disableBounceEffect,
    snapMode,
    disableSlipEffect,
    slipSize,
    disableScrollToActiveSlide,
    disableSwipeEffect
  });
  useAutoplay({
    carouselElRef,
    slideValue,
    autoplay,
    autoplayDuration,
    disableAutoplayOnInteraction,
    onAutoplayLeftTimeChange,
    autoplayIntervalTime,
    goNextSlide,
    noNextSlide
  });
  const newStyle = useStyle(style);

  return (
    <CarouselContext
      value={{
        count,
        slideValue,
        goSlide,
        goPrevSlide,
        goNextSlide,
        noPrevSlide,
        noNextSlide,
        isSwiping,
        scrollEndLimit,
        scrollToActiveSlide,
        enableScrollToActiveSlide,
        orientation,
        spacing,
        slideAlignment
      }}
    >
      <Component
        ref={mergeRefs(ref, carouselElRef)}
        className={cn('JinniCarousel', orientation, className)}
        style={newStyle}
        {...rest}
      >
        {children}
      </Component>
    </CarouselContext>
  );
};

export default Carousel;
