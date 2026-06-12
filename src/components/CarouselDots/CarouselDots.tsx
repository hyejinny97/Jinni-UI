import './CarouselDots.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Dots, DotsProps, Dot } from '@/components/navigation/Dots';
import { NavigationPaginationPositionType, useCarousel } from '../Carousel';
import { useInfiniteCarousel } from '@/components/InfiniteCarousel';

type CarouselDotsProps<T extends AsType = 'div'> = Omit<
  DotsProps<T>,
  'defaultValue' | 'value' | 'onChange'
> & {
  position?: NavigationPaginationPositionType;
};

const CarouselDots = <T extends AsType = 'div'>(
  props: CarouselDotsProps<T>
) => {
  const infiniteCarouselContext = useInfiniteCarousel();
  const carouselContext = useCarousel();
  const {
    count,
    slideValue,
    goSlide,
    orientation: carouselOrientation,
    enableScrollToActiveSlide
  } = infiniteCarouselContext
    ? { ...carouselContext, ...infiniteCarouselContext }
    : carouselContext;

  const {
    orientation = carouselOrientation,
    position = orientation === 'horizontal' ? 'bottom-center' : 'center-end',
    children = Array(count)
      .fill(0)
      .map((_, idx) => (
        <Dot key={idx} value={idx} aria-label={`go to slide ${idx + 1}`} />
      )),
    className,
    ...rest
  } = props;

  const handleChange: DotsProps['onChange'] = (_, value) => {
    enableScrollToActiveSlide();
    const valueNm = value as number;
    const newValue = infiniteCarouselContext
      ? infiniteCarouselContext.transformToCarouselItemIdx(valueNm)
      : valueNm;
    goSlide(newValue);
  };

  return (
    <Dots
      className={cn('JinniCarouselDots', position, className)}
      value={slideValue}
      onChange={handleChange}
      orientation={orientation}
      {...rest}
    >
      {children}
    </Dots>
  );
};

export default CarouselDots;
