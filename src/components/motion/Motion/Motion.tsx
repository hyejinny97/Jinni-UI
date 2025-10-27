import cn from 'classnames';
import {
  useEffect,
  useLayoutEffect,
  useRef,
  forwardRef,
  MutableRefObject
} from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useExit } from './Motion.hooks';
import { camelToKebabCase } from './Motion.utils';

type EnterExitType<T> = { enter: T; exit: T };

export type MotionProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
  children?: React.ReactNode;
  initial?: React.CSSProperties;
  animate?: React.CSSProperties;
  exit?: React.CSSProperties;
  transition: string | EnterExitType<string>;
};

const Motion = forwardRef(
  <T extends AsType = 'div'>(
    props: MotionProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      children,
      initial,
      animate,
      exit,
      transition,
      className,
      style,
      as: Component = 'div',
      ...rest
    } = props;
    const targetElRef = useRef<HTMLElement | null>(null);
    const exitValue = useExit();
    const isExiting = exitValue?.isExiting ?? false;

    const enterTransition =
      typeof transition === 'string' ? transition : transition.enter;
    const exitTransition =
      typeof transition === 'string' ? transition : transition.exit;

    const newStyle = useStyle({
      transition: enterTransition,
      ...style
    });

    const setStyle = (element: HTMLElement, style: React.CSSProperties) => {
      Object.keys(style).forEach((key) => {
        const newKey = camelToKebabCase(key);
        const value = style[key as keyof React.CSSProperties];
        element.style.setProperty(newKey, String(value));
      });
    };

    useLayoutEffect(() => {
      const targetEl = targetElRef.current;
      if (!targetEl || !initial || isExiting) return;

      setStyle(targetEl, initial);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isExiting]);

    useEffect(() => {
      const targetEl = targetElRef.current;
      if (!targetEl || !animate || isExiting) return;

      const id = requestAnimationFrame(() => {
        setStyle(targetEl, animate);
      });
      return () => cancelAnimationFrame(id);
    }, [animate, isExiting]);

    useEffect(() => {
      const targetEl = targetElRef.current;
      if (!targetEl || !exitValue) return;

      const { isExiting, onExitComplete } = exitValue;
      if (isExiting && exit) {
        targetEl.style.transition = exitTransition;
        setStyle(targetEl, exit);

        const handleEnd = (e: TransitionEvent) => {
          if (e.target === targetEl) {
            onExitComplete?.();
          }
        };

        targetEl.addEventListener('transitionend', handleEnd, { once: true });
        return () => {
          targetEl.removeEventListener('transitionend', handleEnd);
        };
      }
    }, [exitValue, exit, exitTransition]);

    return (
      <Component
        ref={(element) => {
          if (element) {
            targetElRef.current = element;
            if (ref && 'current' in ref) {
              (ref as MutableRefObject<HTMLElement>).current = element;
            }
          }
        }}
        className={cn('JinniMotion', className)}
        style={newStyle}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

export default Motion;
