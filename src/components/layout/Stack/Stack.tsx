import './Stack.scss';
import cn from 'classnames';
import { Responsive } from '@/types/breakpoint';
import { StyleType } from '@/types/style';
import { insertDivider } from './Stack.utils';
import useStyle from '@/hooks/useStyle';

export type DirectionType = 'row' | 'row-reverse' | 'column' | 'column-reverse';

interface StackProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  spacing?: number | Responsive<number>;
  direction?: DirectionType | Responsive<DirectionType>;
  divider?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  style?: StyleType;
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
