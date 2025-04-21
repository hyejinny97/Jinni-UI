import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Dots, DotsProps } from '@/components/navigation/Dots';
import { useCarouselContext } from './Carousel.hooks';

type CarouselDotsProps<T extends AsType = 'div'> = Omit<
  DotsProps<T>,
  'count' | 'defaultValue' | 'value' | 'onChange'
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

const CarouselDots = <T extends AsType = 'div'>(
  props: CarouselDotsProps<T>
) => {
  const { position, className, ...rest } = props;
  const { orientation, carouselItemsCount, carouselItemValue, handleChange } =
    useCarouselContext();
  const defaultPosition =
    orientation === 'horizontal' ? 'bottom-center' : 'right-center';

  return (
    <Dots
      className={cn(
        'JinniCarouselDots',
        position || defaultPosition,
        className
      )}
      count={carouselItemsCount}
      value={carouselItemValue}
      onChange={(_, value) => handleChange({ newCarouselItemValue: value })}
      orientation={orientation}
      {...rest}
    />
  );
};

export default CarouselDots;
