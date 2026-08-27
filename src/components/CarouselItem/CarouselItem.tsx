'use client';

import './CarouselItem.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useScrollBySlideValue } from './CarouselItem.hooks';
import { useCarousel } from '../Carousel';
import { useCarouselContent } from '../CarouselContent';
import { mergeRefs } from '@/utils/mergeRefs';

export type CarouselItemProps<T extends AsType = 'li'> = Omit<
  DefaultComponentProps<T>,
  'children'
> & {
  children: React.ReactNode;
};

const CarouselItem = <T extends AsType = 'li'>({
  ref,
  ...props
}: CarouselItemProps<T>) => {
  const { children, className, style, as, ...rest } = props;
  const Component = (as ?? 'li') as React.ElementType;
  const { count } = useCarousel();
  const { itemValue } = useCarouselContent();
  const { carouselItemElRef } = useScrollBySlideValue();
  const newStyle = useStyle(style);

  return (
    <Component
      role="group"
      ref={mergeRefs(ref, carouselItemElRef)}
      className={cn('JinniCarouselItem', className)}
      style={newStyle}
      aria-label={`${itemValue + 1} / ${count}`}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default CarouselItem;
