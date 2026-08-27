'use client';

import './CarouselFraction.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import Fraction, { FractionProps } from '@/components/Fraction';
import { NavigationPaginationPositionType, useCarousel } from '../Carousel';
import { WithOptional } from '@/types/withOptional';
import { useInfiniteCarousel } from '@/components/InfiniteCarousel';

export type CarouselFractionProps<T extends AsType = 'span'> = WithOptional<
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

  const fractionProps = {
    className: cn('JinniCarouselFraction', position, className),
    count,
    value,
    ...rest
  } as FractionProps<T>;

  return <Fraction {...fractionProps} />;
};

export default CarouselFraction;
