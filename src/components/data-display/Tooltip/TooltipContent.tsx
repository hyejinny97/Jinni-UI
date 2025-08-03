import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { PlacementType } from '@/types/popper';

export type TooltipContentProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    placement?: PlacementType;
    children?: React.ReactNode;
    arrow?: boolean;
  };

const TooltipContent = <T extends AsType = 'div'>(
  props: TooltipContentProps<T>
) => {
  const {
    placement,
    children,
    arrow,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniTooltipContent', placement, className)}
      style={newStyle}
      {...rest}
    >
      {children}
      {arrow && <span className={cn('JinniTooltipContentArrow', placement)} />}
    </Component>
  );
};

export default TooltipContent;
