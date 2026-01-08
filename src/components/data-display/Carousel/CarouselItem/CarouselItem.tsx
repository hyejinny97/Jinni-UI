import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

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
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniCarouselItem', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default CarouselItem;
