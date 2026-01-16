import './CarouselDots.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Dots, DotsProps, Dot } from '@/components/navigation/Dots';
import { useCarousel } from '../Carousel.hooks';
import { NavigationPaginationPositionType } from '../Carousel.types';

type CarouselDotsProps<T extends AsType = 'div'> = Omit<
  DotsProps<T>,
  'defaultValue' | 'value' | 'onChange'
> & {
  position?: NavigationPaginationPositionType;
};

export const CarouselDot = Dot;

const CarouselDots = <T extends AsType = 'div'>(
  props: CarouselDotsProps<T>
) => {
  const {
    count,
    slideValue,
    goSlide,
    orientation: carouselOrientation,
    enableScrollToActiveSlide
  } = useCarousel();
  const {
    orientation = carouselOrientation,
    position = orientation === 'horizontal' ? 'bottom-center' : 'center-end',
    children = Array(count)
      .fill(0)
      .map((_, idx) => (
        <CarouselDot
          key={idx}
          value={idx}
          aria-label={`go to slide ${idx + 1}`}
        />
      )),
    className,
    ...rest
  } = props;

  const handleChange: DotsProps['onChange'] = (_, value) => {
    enableScrollToActiveSlide();
    goSlide(value as number);
  };

  return (
    <Dots
      className={cn('JinniCarouselDots', position, className)}
      value={slideValue}
      onChange={handleChange}
      orientation={orientation}
      {...rest}
    >
      {children}
    </Dots>
  );
};

export default CarouselDots;
