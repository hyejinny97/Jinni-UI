import './Divider.scss';
import cn from 'classnames';
import { DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { getBorderWidth } from './Divider.utils';

export interface DividerProps extends DefaultComponentProps<HTMLDivElement> {
  variant?: 'solid' | 'dotted' | 'dashed';
  orientation?: 'horizontal' | 'vertical';
  contentAlign?: 'left' | 'center' | 'right';
  thickness?: number;
  children?: React.ReactNode;
}

const Divider = (props: DividerProps) => {
  const {
    variant = 'solid',
    orientation = 'horizontal',
    contentAlign = 'center',
    thickness = 1,
    children,
    className,
    style,
    ...rest
  } = props;
  const borderWidth = getBorderWidth(orientation, thickness);
  const newStyle = useStyle({ ...borderWidth, ...style });

  return (
    <div
      className={cn('JinniDivider', variant, orientation, className)}
      style={newStyle}
      role="separator"
      aria-orientation={orientation}
      {...rest}
    >
      <span className={cn('content', contentAlign)}>{children}</span>
    </div>
  );
};

export default Divider;
