import './Skeleton.scss';
import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';

type SkeletonProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
  width?: number | string;
  height?: number | string;
  variant?: 'rectangular' | 'rounded' | 'circular';
  animation?: 'pulse' | 'wave' | 'none';
};

const Skeleton = <T extends AsType = 'div'>(props: SkeletonProps<T>) => {
  const {
    width,
    height = '1em',
    variant = 'rounded',
    animation = 'pulse',
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const newStyle = useStyle({ width, height, ...style });

  return (
    <Component
      className={cn('JinniSkeleton', variant, animation, className)}
      style={newStyle}
      {...rest}
    />
  );
};

export default Skeleton;
