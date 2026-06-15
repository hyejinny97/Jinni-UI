import './Box.scss';
import cn from 'classnames';
import { forwardRef } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ElevationLevelType } from '@/types/elevation';
import { isNumber } from '@/utils/isNumber';
import { RoundType } from '@/types/round';

export type BoxProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
  elevation?: ElevationLevelType;
  outlined?: boolean;
  round?: RoundType | number;
};

const Box = forwardRef(
  <T extends AsType = 'div'>(
    props: BoxProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      elevation,
      outlined,
      round,
      children,
      className,
      style,
      as: Component = 'div',
      ...rest
    } = props;
    const isNumberRound = isNumber(round);
    const newStyle = useStyle({
      '--border-radius': isNumberRound
        ? `${round}px`
        : `var(--jinni-round-${round})`,
      ...style
    });

    return (
      <Component
        ref={ref}
        className={cn(
          'JinniBox',
          { outlined },
          isNumber(elevation) && `elevation-${elevation}`,
          className
        )}
        style={newStyle}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

export default Box;
