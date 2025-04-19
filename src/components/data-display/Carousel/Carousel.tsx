import './Carousel.scss';
import { useRef } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import {
  useCarouselItem,
  useCarouselValue,
  useHandleEvent
} from './Carousel.hooks';
import CarouselContext from './Carousel.context';

export type OrientationType = 'horizontal' | 'vertical';

export type CarouselProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'defaultValue' | 'onChange'
> & {
  children: React.ReactNode;
  defaultValue?: number;
  value?: number;
  onChange?: (event: Event | React.SyntheticEvent, value: number) => void;
  orientation?: OrientationType;
};

const Carousel = <T extends AsType = 'div'>(props: CarouselProps<T>) => {
  const {
    children,
    defaultValue = 0,
    value,
    onChange,
    orientation = 'horizontal',
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const carouselElRef = useRef<HTMLElement>(null);
  const { carouselValue, handleChange, goNextSlide, goPrevSlide } =
    useCarouselValue({
      defaultValue,
      value,
      onChange
    });
  const { carouselItemCount, isFirstCarouselItem, isLastCarouselItem } =
    useCarouselItem({ carouselElRef, carouselValue });
  useHandleEvent({
    carouselElRef,
    isFirstCarouselItem,
    isLastCarouselItem,
    goNextSlide,
    goPrevSlide,
    orientation
  });
  const newStyle = useStyle({
    '--carousel-item-count': carouselItemCount,
    '--carousel-value': carouselValue,
    ...style
  });

  return (
    <CarouselContext.Provider
      value={{
        carouselItemCount,
        isFirstCarouselItem,
        isLastCarouselItem,
        carouselValue,
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
        {children}
      </Component>
    </CarouselContext.Provider>
  );
};

export default Carousel;
