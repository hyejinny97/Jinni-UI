import './ButtonGroup.scss';
import { forwardRef } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ButtonProps } from '@/components/general/Button';
import { darken } from '@/utils/colorLuminance';
import { insertProps } from './ButtonGroup.utils';

export type SomeButtonProps = Pick<
  ButtonProps,
  | 'variant'
  | 'size'
  | 'color'
  | 'disabled'
  | 'overlayColor'
  | 'disableOverlay'
  | 'rippleColor'
  | 'rippleStartLocation'
  | 'disableRipple'
  | 'elevation'
>;

type ButtonGroupProps<T extends AsType = 'div'> = DefaultComponentProps<T> &
  SomeButtonProps & {
    children: Array<JSX.Element>;
    orientation?: 'horizontal' | 'vertical';
  };

const ButtonGroup = forwardRef(
  <T extends AsType = 'div'>(
    props: ButtonGroupProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      children,
      variant = 'filled',
      size = 'md',
      color = 'primary',
      disabled = false,
      overlayColor = variant === 'filled' ? 'white' : 'black',
      disableOverlay = false,
      rippleColor = variant === 'filled' ? 'white' : 'black',
      rippleStartLocation = 'clicked',
      disableRipple = false,
      elevation,
      orientation = 'horizontal',
      className,
      style,
      as: Component = 'div',
      ...rest
    } = props;
    const newStyle = useStyle({
      '--divider-color': variant === 'filled' ? darken(color, 0.3) : color,
      ...style
    });

    return (
      <Component
        ref={ref}
        className={cn('JinniButtonGroup', orientation, className)}
        style={newStyle}
        {...rest}
      >
        {insertProps(children, {
          variant,
          size,
          color,
          disabled,
          overlayColor,
          disableOverlay,
          rippleColor,
          rippleStartLocation,
          disableRipple,
          elevation
        })}
      </Component>
    );
  }
);

export default ButtonGroup;
