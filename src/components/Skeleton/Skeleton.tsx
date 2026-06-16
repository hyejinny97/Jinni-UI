import './Skeleton.scss';
import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useJinni from '@/hooks/useJinni';
import { isNumber } from '@/utils/isNumber';
import { prefersReducedMotion } from '@/utils/accessibility';

type SkeletonProps<T extends AsType = 'span'> = DefaultComponentProps<T> & {
  width?: number | string;
  height?: number | string;
  variant?: 'rectangular' | 'rounded' | 'circular';
  animation?: 'pulse' | 'wave' | 'none';
};

const Skeleton = <T extends AsType = 'span'>(props: SkeletonProps<T>) => {
  const {
    children,
    width = children ? 'auto' : '100%',
    height = children ? 'auto' : '1em',
    variant = 'rounded',
    animation = prefersReducedMotion ? 'none' : 'pulse',
    className,
    style,
    as: Component = 'span',
    ...rest
  } = props;
  const { theme } = useJinni();
  const newStyle = useStyle({
    '--width': isNumber(width) ? `${width}px` : width,
    '--height': isNumber(height) ? `${height}px` : height,
    ...style
  });

  const wrappedChildren =
    typeof children === 'string' ? <span>{children}</span> : children;

  return (
    <Component
      className={cn(
        'JinniSkeleton',
        `${theme}-theme`,
        variant,
        animation,
        className
      )}
      style={newStyle}
      {...rest}
    >
      {wrappedChildren}
    </Component>
  );
};

export default Skeleton;
