import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import {
  LinearProgress,
  LinearProgressProps
} from '@/components/feedback/LinearProgress';
import { useCarouselContext } from './Carousel.hooks';

type CarouselProgressProps<T extends AsType = 'div'> = Omit<
  LinearProgressProps<T>,
  'percent'
> & {
  position?: 'top' | 'bottom' | 'left' | 'right';
};

const CarouselProgress = <T extends AsType = 'div'>(
  props: CarouselProgressProps<T>
) => {
  const { position, className, ...rest } = props;
  const { carouselItemCount, carouselValue, orientation } =
    useCarouselContext();
  const defaultPosition = orientation === 'horizontal' ? 'top' : 'left';

  return (
    <LinearProgress
      className={cn(
        'JinniCarouselProgress',
        position || defaultPosition,
        className
      )}
      percent={((carouselValue + 1) / carouselItemCount) * 100}
      thickness="sm"
      lineCap="butt"
      orientation={orientation}
      {...rest}
    />
  );
};

export default CarouselProgress;
