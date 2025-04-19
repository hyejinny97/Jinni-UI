import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Fraction, FractionProps } from '@/components/data-display/Fraction';
import { useCarouselContext } from './Carousel.hooks';

type CarouselFractionProps<T extends AsType = 'span'> = Omit<
  FractionProps<T>,
  'count' | 'value'
> & {
  position?:
    | 'top-start'
    | 'top-center'
    | 'top-end'
    | 'left-center'
    | 'right-center'
    | 'bottom-start'
    | 'bottom-center'
    | 'bottom-end';
};

const CarouselFraction = <T extends AsType = 'span'>(
  props: CarouselFractionProps<T>
) => {
  const { position, className, ...rest } = props;
  const { carouselItemCount, carouselValue, orientation } =
    useCarouselContext();
  const defaultPosition =
    orientation === 'horizontal' ? 'bottom-center' : 'right-center';

  return (
    <Fraction
      className={cn(
        'JinniCarouselFraction',
        position || defaultPosition,
        className
      )}
      count={carouselItemCount}
      value={carouselValue + 1}
      orientation={orientation}
      {...rest}
    />
  );
};

export default CarouselFraction;
