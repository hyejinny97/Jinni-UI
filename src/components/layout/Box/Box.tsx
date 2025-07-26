import './Box.scss';
import cn from 'classnames';
import { forwardRef } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ElevationLevelType } from '@/types/elevation';
import { getComputedRound } from './Box.utils';

export type RoundKeywordType = 'sm' | 'md' | 'lg';
export type RoundType = RoundKeywordType | number;

export type BoxProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
  elevation?: ElevationLevelType;
  outlined?: boolean;
  round?: RoundType;
};

const Box = forwardRef(
  <T extends AsType = 'div'>(
    props: BoxProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      elevation = 0,
      outlined = false,
      round = 0,
      children,
      className,
      style,
      as: Component = 'div',
      ...rest
    } = props;
    const computedRound = getComputedRound(round);
    const newStyle = useStyle({
      elevation,
      '--border-radius': `${computedRound}px`,
      ...style
    });

    return (
      <Component
        ref={ref}
        className={cn('JinniBox', { outlined }, className)}
        style={newStyle}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

export default Box;
