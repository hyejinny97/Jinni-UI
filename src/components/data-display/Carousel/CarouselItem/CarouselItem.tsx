import './CarouselItem.scss';
import { forwardRef, MutableRefObject } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useScrollBySlideValue } from './CarouselItem.hooks';
import { useCarousel } from '../Carousel.hooks';
import { useCarouselContent } from '../CarouselContent';

type CarouselItemProps<T extends AsType = 'li'> = Omit<
  DefaultComponentProps<T>,
  'children'
> & {
  children: React.ReactNode;
};

const CarouselItem = forwardRef(
  <T extends AsType = 'li'>(
    props: CarouselItemProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const { children, className, style, as: Component = 'li', ...rest } = props;
    const { count } = useCarousel();
    const { itemValue } = useCarouselContent();
    const { carouselItemElRef } = useScrollBySlideValue();
    const newStyle = useStyle(style);

    return (
      <Component
        role="group"
        ref={(element: HTMLElement | null) => {
          if (element) {
            (carouselItemElRef as MutableRefObject<HTMLElement>).current =
              element;
            if (typeof ref === 'function') {
              ref(element);
            } else if (ref && 'current' in ref) {
              (ref as MutableRefObject<HTMLElement>).current = element;
            }
          }
        }}
        className={cn('JinniCarouselItem', className)}
        style={newStyle}
        aria-label={`${itemValue + 1} / ${count}`}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

export default CarouselItem;
