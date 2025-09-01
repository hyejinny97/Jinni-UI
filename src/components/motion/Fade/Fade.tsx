import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { Motion } from '@/components/motion/Motion';
import { AnimatePresence } from '@/components/motion/AnimatePresence';
import { TransitionType } from '@/types/motion';
import { useTransition } from '@/hooks/useTransition';
import useMount from '@/hooks/useMount';

export type FadeProps<T extends AsType = 'div'> = DefaultComponentProps<T> &
  TransitionType & {
    children?: React.ReactNode;
  };

const DEFAULT_EASING = 'emphasized';
const DEFAULT_DURATION = 'medium1';

const Fade = <T extends AsType = 'div'>(props: FadeProps<T>) => {
  const {
    in: fadeIn,
    easing = DEFAULT_EASING,
    duration = DEFAULT_DURATION,
    animateOnMount,
    children,
    className,
    ...rest
  } = props;
  const show = fadeIn;
  const isMounted = useMount();
  const { enterDuration, exitDuration, enterEasing, exitEasing } =
    useTransition({ duration, easing });

  return (
    <AnimatePresence>
      {show && (
        <Motion
          className={cn('JinniFade', className)}
          initial={animateOnMount || isMounted ? { opacity: 0 } : undefined}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            enter: `opacity ${enterDuration} ${enterEasing}`,
            exit: `opacity ${exitDuration} ${exitEasing}`
          }}
          style={{ display: 'inline-flex' }}
          {...rest}
        >
          {children}
        </Motion>
      )}
    </AnimatePresence>
  );
};

export default Fade;
