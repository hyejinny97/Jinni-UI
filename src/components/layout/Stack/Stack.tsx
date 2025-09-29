import './Stack.scss';
import cn from 'classnames';
import { Responsive } from '@/types/breakpoint';
import { computeChildren, computeSpacing } from './Stack.utils';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';

export type DirectionType = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export type StackProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
  spacing?: number | Responsive<number>;
  direction?: DirectionType | Responsive<DirectionType>;
  divider?: React.ReactNode;
  children: React.ReactNode;
};

const Stack = <T extends AsType = 'div'>(props: StackProps<T>) => {
  const {
    spacing = 0,
    direction = 'column',
    divider,
    children,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const computedChildren = computeChildren(children, divider);
  const newStyle = useStyle({
    '--flex-direction': direction,
    '--flex-spacing': computeSpacing(spacing),
    ...style
  });

  return (
    <Component
      className={cn('JinniStack', className)}
      style={newStyle}
      {...rest}
    >
      {computedChildren}
    </Component>
  );
};

export default Stack;
