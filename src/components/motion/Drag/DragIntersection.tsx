import cn from 'classnames';
import { useRef, useEffect } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useDragContext } from './Drag.hooks';
import { DestinationType } from './Drag.contexts';

type DragIntersectionProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    root?: 'container' | 'viewport';
    onIntersect: (entry: IntersectionObserverEntry) => DestinationType;
  };

const DragIntersection = <T extends AsType = 'div'>(
  props: DragIntersectionProps<T>
) => {
  const {
    root = 'container',
    onIntersect,
    children,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const intersectionTargetElRef = useRef<HTMLElement>(null);
  const { changeDestination, containerElRef } = useDragContext();
  const newStyle = useStyle(style);

  useEffect(() => {
    const intersectionTargetEl = intersectionTargetElRef.current;
    if (!intersectionTargetEl) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const destination = onIntersect(entry);
          changeDestination(destination);
        });
      },
      {
        root: root === 'container' ? containerElRef.current : null,
        threshold: Array.from({ length: 101 }, (_, i) => i / 100)
      }
    );
    io.observe(intersectionTargetEl);
    return () => {
      io.disconnect();
    };
  }, []);

  return (
    <Component
      ref={intersectionTargetElRef}
      className={cn('JinniDragIntersection', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default DragIntersection;
