import './CarouselFraction.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Fraction, FractionProps } from '@/components/data-display/Fraction';
import { useCarouselContext } from '../Carousel.hooks';
import { NavigationPaginationPositionType } from '../Carousel.types';

type CarouselFractionProps<T extends AsType = 'span'> = Omit<
  FractionProps<T>,
  'count' | 'value'
> & {
  position?: NavigationPaginationPositionType;
};

const CarouselFraction = <T extends AsType = 'span'>(
  props: CarouselFractionProps<T>
) => {
  const { carouselItemsCount, carouselItemValue, orientation } =
    useCarouselContext();
  const {
    position = orientation === 'horizontal' ? 'bottom-center' : 'center-end',
    className,
    ...rest
  } = props;

  return (
    <Fraction
      className={cn('JinniCarouselFraction', position, className)}
      count={carouselItemsCount}
      value={carouselItemValue + 1}
      {...rest}
    />
  );
};

export default CarouselFraction;
