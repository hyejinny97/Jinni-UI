import './CarouselContent.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useCarouselContext } from '../Carousel.hooks';

export type CarouselContentProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'children'
> & {
  children: React.ReactNode;
};

const CarouselContent = <T extends AsType = 'div'>(
  props: CarouselContentProps<T>
) => {
  const { orientation } = useCarouselContext();
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniCarouselContent', orientation, className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default CarouselContent;
