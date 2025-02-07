import cn from 'classnames';
import { useEffect, useLayoutEffect } from 'react';
import {
  Transition,
  TransitionProps,
  DEFAULT_DURATION
} from '@/components/general/Transition';
import { useSlide, useDurationInNumber } from './Slide.hooks';

export type SlideProps = TransitionProps & {
  direction?: 'down' | 'up' | 'left' | 'right';
  container?: HTMLElement | null;
};

const Slide = (props: SlideProps) => {
  const {
    in: transitionIn,
    direction = 'down',
    container,
    duration = DEFAULT_DURATION,
    className,
    style,
    ...rest
  } = props;
  const {
    slideRef,
    translateValue,
    setTranslate,
    initTranslate,
    makeVisible,
    makeInVisible,
    removeTransition,
    setTransition
  } = useSlide({ direction, container });
  const durationInNumber = useDurationInNumber({ duration, in: transitionIn });

  useLayoutEffect(() => {
    if (transitionIn) {
      removeTransition();
      setTranslate();
      setTransition();
    }
  }, [transitionIn, setTranslate, removeTransition, setTransition]);

  useEffect(() => {
    if (transitionIn) {
      makeVisible();
      initTranslate();
    } else {
      setTranslate();
      setTimeout(() => {
        makeInVisible();
      }, durationInNumber);
    }
  }, [
    transitionIn,
    setTranslate,
    initTranslate,
    makeVisible,
    makeInVisible,
    durationInNumber
  ]);

  return (
    <Transition
      ref={slideRef}
      in={transitionIn}
      duration={duration}
      className={cn('JinniSlide', className)}
      style={{
        transform:
          translateValue &&
          `translate(${translateValue.translateX}px, ${translateValue.translateY}px)`,
        visibility: 'hidden',
        ...style
      }}
      {...rest}
    />
  );
};

export default Slide;
