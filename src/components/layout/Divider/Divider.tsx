import './Divider.scss';
import cn from 'classnames';
import { DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

interface DividerProps extends DefaultComponentProps<HTMLDivElement> {
  variant?: 'solid' | 'dotted' | 'dashed';
  orientation?: 'horizontal' | 'vertical';
  contentAlign?: 'left' | 'center' | 'right';
  children?: React.ReactNode;
}

const Divider = (props: DividerProps) => {
  const {
    variant = 'solid',
    orientation = 'horizontal',
    contentAlign = 'center',
    children,
    className,
    style,
    ...rest
  } = props;
  const newStyle = useStyle(style);

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
