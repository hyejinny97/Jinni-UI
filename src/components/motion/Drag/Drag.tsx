import cn from 'classnames';
import { forwardRef } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useDragContext } from './Drag.hooks';

type DragProps<T extends AsType = 'div'> = DefaultComponentProps<T>;

const Drag = forwardRef(
  <T extends AsType = 'div'>(
    props: DragProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      children,
      className,
      style,
      as: Component = 'div',
      ...rest
    } = props;
    const { targetElRef } = useDragContext();
    const newStyle = useStyle(style);

    return (
      <Component
        ref={(element) => {
          if (element) {
            targetElRef.current = element;
            if (ref && 'current' in ref) {
              (ref as React.MutableRefObject<HTMLElement>).current = element;
            }
          }
        }}
        className={cn('JinniDrag', className)}
        style={newStyle}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

export default Drag;
