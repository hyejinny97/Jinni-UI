import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

type CarouselContentProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    children: React.ReactNode;
  };

const CarouselContent = <T extends AsType = 'div'>(
  props: CarouselContentProps<T>
) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniCarouselContent', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default CarouselContent;
