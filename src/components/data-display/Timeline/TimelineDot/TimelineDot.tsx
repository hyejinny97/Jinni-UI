import './TimelineDot.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ColorType } from '@/types/color';

type TimelineDotProps<T extends AsType = 'span'> = DefaultComponentProps<T> & {
  variant?: 'filled' | 'outlined';
  color?: ColorType;
};

const TimelineDot = <T extends AsType = 'span'>(props: TimelineDotProps<T>) => {
  const {
    variant = 'filled',
    color = 'gray-400',
    children,
    className,
    style,
    as: Component = 'span',
    ...rest
  } = props;
  const newStyle = useStyle({ '--dot-color': color, ...style });

  return (
    <Component
      className={cn('JinniTimelineDot', variant, className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default TimelineDot;
