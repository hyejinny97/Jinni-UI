import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { Motion } from '@/components/motion/Motion';
import { AnimatePresence } from '@/components/motion/AnimatePresence';
import { TransitionType } from '@/types/motion';
import { useTransition } from '@/hooks/useTransition';
import { useMountRef } from '@/hooks/useMount';

export type ScaleProps<T extends AsType = 'div'> = DefaultComponentProps<T> &
  TransitionType & {
    children?: React.ReactNode;
  };

const DEFAULT_EASING = 'emphasized';
const DEFAULT_DURATION = 'medium1';

const Scale = <T extends AsType = 'div'>(props: ScaleProps<T>) => {
  const {
    in: scaleIn,
    easing = DEFAULT_EASING,
    duration = DEFAULT_DURATION,
    animateOnMount,
    children,
    className,
    ...rest
  } = props;
  const show = !scaleIn;
  const isMountedRef = useMountRef();
  const { enterDuration, exitDuration, enterEasing, exitEasing } =
    useTransition({ duration, easing });

  return (
    <AnimatePresence>
      {show && (
        <Motion
          className={cn('JinniScale', className)}
          initial={
            animateOnMount || isMountedRef.current
              ? { transform: 'scale(0)' }
              : undefined
          }
          animate={{ transform: 'scale(1)' }}
          exit={{ transform: 'scale(0)' }}
          transition={{
            enter: `transform ${enterDuration} ${enterEasing}`,
            exit: `transform ${exitDuration} ${exitEasing}`
          }}
          style={{ display: 'inline-flex', width: 'max-content' }}
          {...rest}
        >
          {children}
        </Motion>
      )}
    </AnimatePresence>
  );
};

export default Scale;
