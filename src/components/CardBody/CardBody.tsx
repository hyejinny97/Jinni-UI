import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

type CardBodyProps<T extends AsType = 'div'> = DefaultComponentProps<T>;

const CardBody = <T extends AsType = 'div'>(props: CardBodyProps<T>) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniCardBody', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default CardBody;
