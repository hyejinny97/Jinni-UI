import './Transition.scss';
import cn from 'classnames';
import { forwardRef } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { EasingType, DurationType } from '@/types/motion';
import { flatEasing, flatDuration } from './Transition.utils';
import { isNumber } from '@/utils/isNumber';

export type EnterAndExit<T> = { enter?: T; exit?: T };

export type TransitionProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    children: React.ReactNode;
    in?: boolean;
    easing?: EasingType | string | EnterAndExit<EasingType | string>;
    duration?: DurationType | number | EnterAndExit<DurationType | number>;
  };

export const DEFAULT_EASING = 'emphasized';
export const DEFAULT_DURATION = 'medium1';

const Transition = forwardRef(
  <T extends AsType = 'div'>(
    props: TransitionProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      children,
      in: transitionIn = false,
      easing = DEFAULT_EASING,
      duration = DEFAULT_DURATION,
      className,
      style,
      as: Component = 'div',
      ...rest
    } = props;
    const flattenEasing = flatEasing({ easing, in: transitionIn });
    const flattenDuration = flatDuration({
      duration,
      in: transitionIn
    });
    const newStyle = useStyle({
      transitionTimingFunction: flattenEasing,
      transitionDuration: isNumber(flattenDuration)
        ? `${flattenDuration}ms`
        : flattenDuration,
      ...style
    });

    return (
      <Component
        ref={ref}
        className={cn('JinniTransition', className)}
        style={newStyle}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

export default Transition;
