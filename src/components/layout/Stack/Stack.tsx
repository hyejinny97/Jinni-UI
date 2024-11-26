import './Stack.scss';
import cn from 'classnames';
import { Responsive } from '@/types/breakpoint';
import { insertDivider } from './Stack.utils';
import useStyle from '@/hooks/useStyle';
import { DefaultComponentProps } from '@/types/default-component-props';

export type DirectionType = 'row' | 'row-reverse' | 'column' | 'column-reverse';

interface StackProps extends DefaultComponentProps<HTMLDivElement> {
  spacing?: number | Responsive<number>;
  direction?: DirectionType | Responsive<DirectionType>;
  divider?: React.ReactNode;
  children: React.ReactNode;
}

const Stack = (props: StackProps) => {
  const {
    spacing,
    direction = 'column',
    divider,
    children,
    className,
    style
  } = props;
  const newStyle = useStyle({
    flexDirection: direction,
    gap: spacing,
    ...style
  });

  return (
    <div className={cn('JinniStack', className)} style={newStyle}>
      {divider ? insertDivider(children, divider) : children}
    </div>
  );
};

export default Stack;
