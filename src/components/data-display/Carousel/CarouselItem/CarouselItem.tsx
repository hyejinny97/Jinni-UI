import './CarouselItem.scss';
import { forwardRef, MutableRefObject } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useScrollBySlideValue } from './CarouselItem.hooks';

type CarouselItemProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'children'
> & {
  children: React.ReactNode;
};

const CarouselItem = forwardRef(
  <T extends AsType = 'div'>(
    props: CarouselItemProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      children,
      className,
      style,
      as: Component = 'div',
      ...rest
    } = props;
    const { carouselItemElRef } = useScrollBySlideValue();
    const newStyle = useStyle(style);

    return (
      <Component
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
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

export default CarouselItem;
