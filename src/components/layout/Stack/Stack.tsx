import './Stack.scss';
import cn from 'classnames';
import useBreakpoint from '@/hooks/useBreakpoint';
import { Responsive } from '@/types/breakpoint';
import { StyleType } from '@/types/style';
import { insertDivider, isResponsive } from './Stack.utils';
import { editColorStyle } from '@/utils/editColorStyle';

export type DirectionType = 'row' | 'row-reverse' | 'column' | 'column-reverse';

interface StackProps {
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
  const breakpoint = useBreakpoint();
  const newDirection = isResponsive<DirectionType>(direction)
    ? direction[breakpoint]
    : direction;
  const newSpacing = isResponsive<number>(spacing)
    ? spacing[breakpoint]
    : spacing;

  return (
    <div
      className={cn('JinniStack', newDirection, className)}
      style={{ gap: newSpacing, ...editColorStyle(style) }}
    >
      {divider ? insertDivider(children, divider) : children}
    </div>
  );
};

export default Stack;
