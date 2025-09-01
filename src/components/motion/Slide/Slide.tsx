import cn from 'classnames';
import React from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { Motion } from '@/components/motion/Motion';
import { AnimatePresence } from '@/components/motion/AnimatePresence';
import { TransitionType } from '@/types/motion';
import { useTransition } from '@/hooks/useTransition';
import { useMountRef } from '@/hooks/useMount';
import { useTranslate } from './Slide.hooks';

export type SlideProps<T extends AsType = 'div'> = DefaultComponentProps<T> &
  TransitionType & {
    children?: React.ReactNode;
    direction?: 'down' | 'up' | 'left' | 'right';
    containerRef?: React.RefObject<HTMLElement>;
  };

const DEFAULT_EASING = 'emphasized';
const DEFAULT_DURATION = 'medium1';

const SlideMotion = <T extends AsType = 'div'>(
  props: Omit<SlideProps<T>, 'in' | 'animateOnMount'> & { hasInitial: boolean }
) => {
  const {
    easing = DEFAULT_EASING,
    duration = DEFAULT_DURATION,
    direction = 'down',
    containerRef,
    children,
    hasInitial,
    className,
    ...rest
  } = props;
  const { enterDuration, exitDuration, enterEasing, exitEasing } =
    useTransition({ duration, easing });
  const { contentElRef, translatedPosition, originPosition } = useTranslate({
    direction,
    children,
    containerRef
  });

  if (!translatedPosition || !originPosition) {
    return (
      <div ref={contentElRef} style={{ display: 'inline-flex', opacity: 0 }}>
        {children}
      </div>
    );
  }

  return (
    <Motion
      className={cn('JinniSlide', className)}
      initial={hasInitial ? { transform: translatedPosition } : undefined}
      animate={{ transform: originPosition }}
      exit={{ transform: translatedPosition }}
      transition={{
        enter: `transform ${enterDuration} ${enterEasing}`,
        exit: `transform ${exitDuration} ${exitEasing}`
      }}
      style={{ display: 'inline-flex' }}
      {...rest}
    >
      {children}
    </Motion>
  );
};

const Slide = <T extends AsType = 'div'>(props: SlideProps<T>) => {
  const { in: slideIn, animateOnMount, ...rest } = props;
  const show = slideIn;
  const isMountedRef = useMountRef();

  return (
    <AnimatePresence>
      {show && (
        <SlideMotion
          hasInitial={animateOnMount || isMountedRef.current}
          {...rest}
        />
      )}
    </AnimatePresence>
  );
};

export default Slide;
