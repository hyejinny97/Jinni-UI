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
    orientation: carouselOrientation
  } = useCarousel();
  const {
    orientation = carouselOrientation,
    position = orientation === 'horizontal' ? 'bottom-center' : 'center-end',
    children = Array(count)
      .fill(0)
      .map((_, idx) => <CarouselDot key={idx} value={idx} />),
    className,
    ...rest
  } = props;

  return (
    <Dots
      className={cn('JinniCarouselDots', position, className)}
      value={slideValue}
      onChange={(_, value) => goSlide(value as number)}
      orientation={orientation}
      {...rest}
    >
      {children}
    </Dots>
  );
};

export default CarouselDots;
