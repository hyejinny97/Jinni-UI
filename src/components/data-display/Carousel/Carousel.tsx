import './Carousel.scss';
import { useRef, forwardRef, MutableRefObject } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import {
  useSlideValue,
  useSwipe,
  useScrollToActiveSlide,
  useAutoplay,
  useProgress
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
  onProgressChange?: (progress: number) => void;
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
  disableSwipeEffect?: boolean;
  disableBounceEffect?: boolean;
};

const Carousel = forwardRef(
  <T extends AsType = 'div'>(
    props: CarouselProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      children,
      defaultValue = 0,
      value,
      onChange,
      onProgressChange,
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
    const { isSwiping, scrollEndLimitRef } = useSwipe({
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
    useProgress({
      carouselElRef,
      orientation,
      slideAlignment,
      onProgressChange
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
          ref={(element: HTMLElement | null) => {
            if (element) {
              (carouselElRef as MutableRefObject<HTMLElement>).current =
                element;
              if (typeof ref === 'function') {
                ref(element);
              } else if (ref && 'current' in ref) {
                (ref as MutableRefObject<HTMLElement>).current = element;
              }
            }
          }}
          className={cn('JinniCarousel', orientation, className)}
          style={newStyle}
          {...rest}
        >
          {children}
        </Component>
      </CarouselContext.Provider>
    );
  }
);

export default Carousel;
