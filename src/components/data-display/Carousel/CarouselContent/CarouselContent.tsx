import './CarouselContent.scss';
import { Children, useRef } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useCarousel } from '../Carousel.hooks';
import { CarouselItem } from '../CarouselItem';
import CarouselContentContext from './CarouselContent.contexts';

export type CarouselItemElement = React.ReactElement<
  React.ComponentProps<typeof CarouselItem>,
  typeof CarouselItem
>;

export type CarouselContentProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'children'
> & {
  children: CarouselItemElement | CarouselItemElement[];
};

const CarouselContent = <T extends AsType = 'div'>(
  props: CarouselContentProps<T>
) => {
  const { orientation, spacing } = useCarousel();
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const carouselContainerElRef = useRef<HTMLDivElement>(null);
  const newStyle = useStyle({ '--spacing': `${spacing}px`, ...style });

  return (
    <div ref={carouselContainerElRef} className="JinniCarouselContainer">
      <Component
        className={cn('JinniCarouselContent', orientation, className)}
        style={newStyle}
        {...rest}
      >
        {Children.map(children, (child, index) => (
          <CarouselContentContext.Provider
            value={{
              carouselContainerElRef,
              itemValue: index
            }}
          >
            {child}
          </CarouselContentContext.Provider>
        ))}
      </Component>
    </div>
  );
};

export default CarouselContent;
