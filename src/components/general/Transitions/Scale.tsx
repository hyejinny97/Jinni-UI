import cn from 'classnames';
import { useState, useEffect } from 'react';
import Transition, { TransitionProps } from './Transition';

type ScaleProps = TransitionProps;

const Scale = (props: ScaleProps) => {
  const { in: transitionIn, className, style, ...rest } = props;
  const [scale, setScale] = useState<0 | 1>(0);

  useEffect(() => {
    setScale(transitionIn ? 1 : 0);
  }, [transitionIn]);

  return (
    <Transition
      in={transitionIn}
      className={cn('JinniScale', className)}
      style={{
        transform: `scale(${scale})`,
        ...style
      }}
      {...rest}
    />
  );
};

export default Scale;
