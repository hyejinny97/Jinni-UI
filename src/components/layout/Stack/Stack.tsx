import './Stack.scss';
import cn from 'classnames';
import { insertDivider } from './Stack.utils';

type DirectionType = 'row' | 'row-reverse' | 'column' | 'column-reverse';

interface StackProps {
  spacing?: number;
  direction?: DirectionType;
  divider?: React.ReactNode;
  children: React.ReactNode;
}

const Stack = (props: StackProps) => {
  const { spacing, direction = 'column', divider, children } = props;

  return (
    <div className={cn('JinniStack', direction)} style={{ gap: spacing }}>
      {divider ? insertDivider(children, divider) : children}
    </div>
  );
};

export default Stack;
