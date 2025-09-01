import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { Motion } from '@/components/motion/Motion';
import { AnimatePresence } from '@/components/motion/AnimatePresence';
import { TransitionType } from '@/types/motion';
import { useTransition } from '@/hooks/useTransition';
import { isNumber } from '@/utils/isNumber';
import { useContentSize } from './Collapse.hooks';
import useMount from '@/hooks/useMount';

export type CollapseProps<T extends AsType = 'div'> = DefaultComponentProps<T> &
  TransitionType & {
    children?: React.ReactNode;
    orientation?: 'horizontal' | 'vertical';
    collapsedSize?: number | string;
  };

const DEFAULT_EASING = 'emphasized';
const DEFAULT_DURATION = 'medium1';
const DEFAULT_ORIENTATION = 'vertical';

const CollapseMotion = <T extends AsType = 'div'>(
  props: Omit<CollapseProps<T>, 'in' | 'collapsedSize' | 'animateOnMount'> & {
    hasInitial: boolean;
  }
) => {
  const {
    easing = DEFAULT_EASING,
    duration = DEFAULT_DURATION,
    orientation = DEFAULT_ORIENTATION,
    hasInitial,
    children,
    className,
    ...rest
  } = props;
  const { enterDuration, exitDuration, enterEasing, exitEasing } =
    useTransition({ duration, easing });
  const { contentElRef, contentSize } = useContentSize({
    children,
    orientation
  });
  const transitionProperty = orientation === 'vertical' ? 'height' : 'width';

  return (
    <Motion
      className={cn('JinniCollapse', className)}
      initial={hasInitial ? { [transitionProperty]: 0 } : undefined}
      animate={{ [transitionProperty]: contentSize }}
      exit={{ [transitionProperty]: 0 }}
      transition={{
        enter: `${transitionProperty} ${enterDuration} ${enterEasing}`,
        exit: `${transitionProperty} ${exitDuration} ${exitEasing}`
      }}
      style={{ display: 'inline-flex', overflow: 'hidden' }}
      {...rest}
    >
      <div ref={contentElRef} style={{ display: 'inline-flex' }}>
        {children}
      </div>
    </Motion>
  );
};

const StaticCollapseMotion = <T extends AsType = 'div'>(
  props: CollapseProps<T>
) => {
  const {
    in: collapse,
    easing = DEFAULT_EASING,
    duration = DEFAULT_DURATION,
    orientation = DEFAULT_ORIENTATION,
    collapsedSize,
    animateOnMount,
    children,
    className,
    ...rest
  } = props;
  const { enterDuration, exitDuration, enterEasing, exitEasing } =
    useTransition({ duration, easing });
  const { contentElRef, contentSize } = useContentSize({
    children,
    orientation
  });
  const transitionProperty = orientation === 'vertical' ? 'height' : 'width';
  const collapsedSizeStr = isNumber(collapsedSize)
    ? `${collapsedSize}px`
    : collapsedSize;

  return (
    <Motion
      className={cn('JinniCollapse', className)}
      initial={
        animateOnMount ? { [transitionProperty]: collapsedSizeStr } : undefined
      }
      animate={{
        [transitionProperty]: collapse ? collapsedSizeStr : contentSize
      }}
      transition={{
        enter: `${transitionProperty} ${enterDuration} ${enterEasing}`,
        exit: `${transitionProperty} ${exitDuration} ${exitEasing}`
      }}
      style={{ display: 'inline-flex', overflow: 'hidden' }}
      {...rest}
    >
      <div ref={contentElRef} style={{ display: 'inline-flex' }}>
        {children}
      </div>
    </Motion>
  );
};

const Collapse = <T extends AsType = 'div'>(props: CollapseProps<T>) => {
  const {
    in: collapse,
    collapsedSize,
    animateOnMount = false,
    ...rest
  } = props;
  const isMounted = useMount();
  const show = !collapse;

  if (collapsedSize !== undefined) {
    return <StaticCollapseMotion {...props} />;
  }
  return (
    <AnimatePresence>
      {show && (
        <CollapseMotion hasInitial={animateOnMount || isMounted} {...rest} />
      )}
    </AnimatePresence>
  );
};

export default Collapse;
