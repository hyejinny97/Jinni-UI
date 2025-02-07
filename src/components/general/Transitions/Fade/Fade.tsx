import cn from 'classnames';
import { useState, useEffect } from 'react';
import Transition, { TransitionProps } from '../Transition';

type FadeProps = TransitionProps;

const Fade = (props: FadeProps) => {
  const { in: transitionIn, className, style, ...rest } = props;
  const [opacity, setOpacity] = useState<0 | 1>(0);

  useEffect(() => {
    setOpacity(transitionIn ? 1 : 0);
  }, [transitionIn]);

  return (
    <Transition
      in={transitionIn}
      className={cn('JinniFade', className)}
      style={{
        opacity,
        ...style
      }}
      {...rest}
    />
  );
};

export default Fade;
