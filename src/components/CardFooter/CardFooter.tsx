'use client';

import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

type CardFooterProps<T extends AsType = 'div'> = DefaultComponentProps<T>;

const CardFooter = <T extends AsType = 'div'>(props: CardFooterProps<T>) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniCardFooter', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default CardFooter;
