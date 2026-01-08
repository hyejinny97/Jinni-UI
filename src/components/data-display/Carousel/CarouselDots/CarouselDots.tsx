import './CarouselDots.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Dots, DotsProps, Dot } from '@/components/navigation/Dots';
import { useCarouselContext } from '../Carousel.hooks';
import { NavigationPaginationPositionType } from '../Carousel.types';

type CarouselDotsProps<T extends AsType = 'div'> = Omit<
  DotsProps<T>,
  'defaultValue' | 'value' | 'onChange'
> & {
  position?: NavigationPaginationPositionType;
};

const CarouselDots = <T extends AsType = 'div'>(
  props: CarouselDotsProps<T>
) => {
  const { orientation, carouselItemsCount, carouselItemValue, handleChange } =
    useCarouselContext();
  const {
    position = orientation === 'horizontal' ? 'bottom-center' : 'center-end',
    children = Array(carouselItemsCount)
      .fill(0)
      .map((_, idx) => <Dot value={idx} />),
    className,
    ...rest
  } = props;

  return (
    <Dots
      className={cn('JinniCarouselDots', position, className)}
      value={carouselItemValue}
      onChange={(_, value) =>
        handleChange({ newCarouselItemValue: value as number })
      }
      orientation={orientation}
      {...rest}
    >
      {children}
    </Dots>
  );
};

export default CarouselDots;
