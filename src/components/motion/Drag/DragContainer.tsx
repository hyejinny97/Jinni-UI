import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useDragContext } from './Drag.hooks';

type DragContainerProps<T extends AsType = 'div'> = DefaultComponentProps<T>;

const DragContainer = <T extends AsType = 'div'>(
  props: DragContainerProps<T>
) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const { containerElRef } = useDragContext();
  const newStyle = useStyle(style);

  return (
    <Component
      ref={containerElRef}
      className={cn('JinniDragContainer', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default DragContainer;
