import { useRef, useMemo, forwardRef, MutableRefObject } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Carousel, CarouselProps } from '@/components/data-display/Carousel';
import InfiniteCarouselContext from './InfiniteCarousel.contexts';
import { addItemsToFrontAndBack } from './InfiniteCarousel.utils';
import {
  useAddItems,
  useTransform,
  useCarouselValue,
  useCarouselJumpOnLimit
} from './InfiniteCarousel.hooks';

export type InfiniteCarouselProps<T extends AsType = 'div'> = Omit<
  CarouselProps<T>,
  'value' | 'onChange'
>;

const InfiniteCarousel = forwardRef<HTMLElement, InfiniteCarouselProps>(
  (props: InfiniteCarouselProps, ref: React.Ref<HTMLElement>) => {
    const {
      children,
      defaultValue = 0,
      orientation = 'horizontal',
      spacing = 0,
      slideAlignment = 'start',
      className,
      ...rest
    } = props;
    const infiniteCarouselElRef = useRef<HTMLElement>(null);
    const { carouselValue, handleChange, freezeCarouselValueRef } =
      useCarouselValue({ defaultValue });
    const { itemsAddedToFront, itemsAddedToBack, baseCount } = useAddItems({
      infiniteCarouselElRef,
      children,
      orientation,
      spacing,
      slideAlignment,
      defaultValue,
      handleChange
    });
    useCarouselJumpOnLimit({
      infiniteCarouselElRef,
      freezeCarouselValueRef,
      orientation,
      slideAlignment,
      baseCount,
      itemsAddedToFront,
      itemsAddedToBack,
      carouselValue,
      handleChange
    });
    const { transformToSlideIdx, transformToCarouselItemIdx } = useTransform({
      baseCount,
      itemsAddedToFront
    });
    const infiniteCarouselChildren = useMemo(
      () =>
        addItemsToFrontAndBack({
          children,
          itemsAddedToFront,
          itemsAddedToBack
        }),
      [children, itemsAddedToFront, itemsAddedToBack]
    );

    return (
      <InfiniteCarouselContext.Provider
        value={{
          count: baseCount,
          slideValue: transformToSlideIdx(carouselValue),
          transformToCarouselItemIdx
        }}
      >
        <Carousel
          ref={(element: HTMLElement | null) => {
            if (element) {
              (infiniteCarouselElRef as MutableRefObject<HTMLElement>).current =
                element;
              if (typeof ref === 'function') {
                ref(element);
              } else if (ref && 'current' in ref) {
                (ref as MutableRefObject<HTMLElement>).current = element;
              }
            }
          }}
          className={cn('JinniInfiniteCarousel', className)}
          value={carouselValue}
          onChange={handleChange}
          orientation={orientation}
          spacing={spacing}
          slideAlignment={slideAlignment}
          {...rest}
        >
          {infiniteCarouselChildren}
        </Carousel>
      </InfiniteCarouselContext.Provider>
    );
  }
);

export default InfiniteCarousel;
