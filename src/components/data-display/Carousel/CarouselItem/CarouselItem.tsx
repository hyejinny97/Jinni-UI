import './CarouselItem.scss';
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

const CarouselItem = <T extends AsType = 'div'>(
  props: CarouselItemProps<T>
) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const { carouselItemElRef } = useScrollBySlideValue();
  const newStyle = useStyle(style);

  return (
    <Component
      ref={carouselItemElRef}
      className={cn('JinniCarouselItem', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default CarouselItem;
