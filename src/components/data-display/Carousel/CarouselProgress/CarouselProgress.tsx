import './CarouselProgress.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import {
  LinearProgress,
  LinearProgressProps
} from '@/components/feedback/LinearProgress';
import { useCarouselContext } from '../Carousel.hooks';

type CarouselProgressProps<T extends AsType = 'div'> = Omit<
  LinearProgressProps<T>,
  'value'
> & {
  position?: 'top' | 'bottom' | 'left' | 'right';
};

const CarouselProgress = <T extends AsType = 'div'>(
  props: CarouselProgressProps<T>
) => {
  const { carouselItemsCount, carouselItemValue, orientation } =
    useCarouselContext();
  const {
    position = orientation === 'horizontal' ? 'top' : 'left',
    className,
    ...rest
  } = props;

  return (
    <LinearProgress
      className={cn('JinniCarouselProgress', position, className)}
      value={((carouselItemValue + 1) / carouselItemsCount) * 100}
      thickness="sm"
      lineCap="butt"
      orientation={orientation}
      {...rest}
    />
  );
};

export default CarouselProgress;
