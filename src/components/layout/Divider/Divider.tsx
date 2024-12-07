import './Divider.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { getBorderWidth } from './Divider.utils';

export type DividerProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    variant?: 'solid' | 'dotted' | 'dashed';
    orientation?: 'horizontal' | 'vertical';
    contentAlign?: 'left' | 'center' | 'right';
    thickness?: number;
    children?: React.ReactNode;
  };

const Divider = <T extends AsType = 'div'>(props: DividerProps<T>) => {
  const {
    variant = 'solid',
    orientation = 'horizontal',
    contentAlign = 'center',
    thickness = 1,
    children,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const borderWidth = getBorderWidth(orientation, thickness);
  const newStyle = useStyle({ ...borderWidth, ...style });

  return (
    <Component
      className={cn('JinniDivider', variant, orientation, className)}
      style={newStyle}
      role="separator"
      aria-orientation={orientation}
      {...rest}
    >
      <span className={cn('content', contentAlign)}>{children}</span>
    </Component>
  );
};

export default Divider;
