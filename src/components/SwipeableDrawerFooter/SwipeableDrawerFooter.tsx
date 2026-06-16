import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';

export type SwipeableDrawerFooterProps<T extends AsType = 'div'> =
  DefaultComponentProps<T>;

const SwipeableDrawerFooter = <T extends AsType = 'div'>(
  props: SwipeableDrawerFooterProps<T>
) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniSwipeableDrawerFooter', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default SwipeableDrawerFooter;
