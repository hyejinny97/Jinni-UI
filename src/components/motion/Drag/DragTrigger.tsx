import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useDragContext } from './Drag.hooks';

type DragTriggerProps<T extends AsType = 'div'> = DefaultComponentProps<T>;

const DragTrigger = <T extends AsType = 'div'>(props: DragTriggerProps<T>) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const { triggerElRef } = useDragContext();
  const newStyle = useStyle(style);

  return (
    <Component
      ref={triggerElRef}
      className={cn('JinniDragTrigger', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default DragTrigger;
