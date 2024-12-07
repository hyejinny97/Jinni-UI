import './Stack.scss';
import cn from 'classnames';
import { Responsive } from '@/types/breakpoint';
import { insertDivider } from './Stack.utils';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';

export type DirectionType = 'row' | 'row-reverse' | 'column' | 'column-reverse';

type StackProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
  spacing?: number | Responsive<number>;
  direction?: DirectionType | Responsive<DirectionType>;
  divider?: React.ReactNode;
  children: React.ReactNode;
};

const Stack = <T extends AsType = 'div'>(props: StackProps<T>) => {
  const {
    spacing,
    direction = 'column',
    divider,
    children,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const newStyle = useStyle({
    flexDirection: direction,
    gap: spacing,
    ...style
  });

  return (
    <Component
      className={cn('JinniStack', className)}
      style={newStyle}
      {...rest}
    >
      {divider ? insertDivider(children, divider) : children}
    </Component>
  );
};

export default Stack;
