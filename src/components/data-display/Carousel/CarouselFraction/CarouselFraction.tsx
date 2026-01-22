import './CarouselFraction.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Fraction, FractionProps } from '@/components/data-display/Fraction';
import { useCarousel } from '../Carousel.hooks';
import { NavigationPaginationPositionType } from '../Carousel.types';
import { WithOptional } from '@/types/withOptional';
import { useInfiniteCarousel } from '@/components/data-display/InfiniteCarousel';

type CarouselFractionProps<T extends AsType = 'span'> = WithOptional<
  FractionProps<T>,
  'count' | 'value'
> & {
  position?: NavigationPaginationPositionType;
};

const CarouselFraction = <T extends AsType = 'span'>(
  props: CarouselFractionProps<T>
) => {
  const infiniteCarouselContext = useInfiniteCarousel();
  const carouselContext = useCarousel();
  const {
    count: carouselCount,
    slideValue,
    orientation
  } = infiniteCarouselContext
    ? { ...carouselContext, ...infiniteCarouselContext }
    : carouselContext;
  const {
    position = orientation === 'horizontal' ? 'bottom-center' : 'center-end',
    count = carouselCount,
    value = slideValue + 1,
    className,
    ...rest
  } = props;

  return (
    <Fraction
      className={cn('JinniCarouselFraction', position, className)}
      count={count}
      value={value}
      {...rest}
    />
  );
};

export default CarouselFraction;
