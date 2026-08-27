'use client';

import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

export type CardHeaderProps<T extends AsType = 'div'> = DefaultComponentProps<T>;

const CardHeader = <T extends AsType = 'div'>(props: CardHeaderProps<T>) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniCardHeader', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default CardHeader;
