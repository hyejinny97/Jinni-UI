import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useReorderItem } from './Reorder.hooks';

type ReorderItemTriggerProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {};

const ReorderItemTrigger = <T extends AsType = 'div'>(
  props: ReorderItemTriggerProps<T>
) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const { triggerElRef } = useReorderItem();
  const newStyle = useStyle(style);

  return (
    <Component
      ref={triggerElRef}
      className={cn('JinniReorderItemTrigger', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default ReorderItemTrigger;
