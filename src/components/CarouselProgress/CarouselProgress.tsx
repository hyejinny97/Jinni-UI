import './CarouselProgress.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import LinearProgress, {
  LinearProgressProps
} from '@/components/LinearProgress';
import { useCarousel } from '../Carousel';
import { useInfiniteCarousel } from '@/components/InfiniteCarousel';

type CarouselProgressProps<T extends AsType = 'div'> =
  LinearProgressProps<T> & {
    position?: 'top' | 'bottom' | 'left' | 'right';
  };

const CarouselProgress = <T extends AsType = 'div'>(
  props: CarouselProgressProps<T>
) => {
  const infiniteCarouselContext = useInfiniteCarousel();
  const carouselContext = useCarousel();
  const {
    count,
    slideValue,
    orientation: carouselOrientation
  } = infiniteCarouselContext
    ? { ...carouselContext, ...infiniteCarouselContext }
    : carouselContext;
  const {
    orientation = carouselOrientation,
    position = orientation === 'horizontal' ? 'top' : 'left',
    value = ((slideValue + 1) / count) * 100,
    className,
    ...rest
  } = props;

  return (
    <LinearProgress
      className={cn('JinniCarouselProgress', position, orientation, className)}
      value={value}
      lineCap="butt"
      orientation={orientation}
      {...rest}
    />
  );
};

export default CarouselProgress;
