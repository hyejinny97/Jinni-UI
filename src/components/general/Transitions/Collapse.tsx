import cn from 'classnames';
import { useRef, useState, useEffect } from 'react';
import Transition, { TransitionProps } from './Transition';

type CollapseProps = TransitionProps & {
  orientation?: 'vertical' | 'horizontal';
  collapsedSize?: number | string;
};

const Collapse = (props: CollapseProps) => {
  const {
    in: transitionIn,
    orientation = 'vertical',
    collapsedSize = '0px',
    className,
    style,
    ...rest
  } = props;
  const collapseRef = useRef<HTMLElement>(null);
  const [size, setSize] = useState(collapsedSize);

  useEffect(() => {
    const collapseEl = collapseRef.current;
    if (!collapseEl) return;
    if (!transitionIn) {
      setSize(collapsedSize);
      return;
    }
    switch (orientation) {
      case 'horizontal':
        setSize(`${collapseEl.scrollWidth}px`);
        return;
      case 'vertical':
        setSize(`${collapseEl.scrollHeight}px`);
        return;
    }
  }, [transitionIn, collapsedSize, orientation]);

  return (
    <Transition
      ref={collapseRef}
      in={transitionIn}
      className={cn('JinniCollapse', orientation, className)}
      style={{
        [orientation === 'vertical' ? 'height' : 'width']: size,
        ...style
      }}
      {...rest}
    />
  );
};

export default Collapse;
