'use client';

import './ButtonGroup.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ButtonProps } from '@/components/Button';
import { darken } from '@/utils/colorLuminance';
import useColor from '@/hooks/useColor';
import ButtonGroupContext from './ButtonGroup.contexts';

export type SomeButtonProps = Pick<
  ButtonProps,
  | 'fullWidth'
  | 'variant'
  | 'color'
  | 'size'
  | 'overlayColor'
  | 'disableOverlay'
  | 'rippleColor'
  | 'rippleStartLocation'
  | 'disableRipple'
  | 'elevation'
  | 'disabled'
>;

type ButtonGroupProps<T extends AsType = 'div'> = DefaultComponentProps<T> &
  SomeButtonProps & {
    children: React.ReactNode;
    orientation?: 'horizontal' | 'vertical';
  };

const ButtonGroup = <T extends AsType = 'div'>({
  ref,
  ...props
}: ButtonGroupProps<T>) => {
  const {
    children,
    orientation = 'horizontal',
    fullWidth,
    variant = 'filled',
    color = 'primary',
    size,
    overlayColor,
    disableOverlay,
    rippleColor,
    rippleStartLocation,
    disableRipple,
    elevation,
    disabled,
    className,
    style,
    as,
    ...rest
  } = props;
  const Component = (as ?? 'div') as React.ElementType;
  const normalizedColor = useColor(color);
  const newStyle = useStyle({
    '--divider-color':
      variant === 'filled' ? darken(normalizedColor, 0.8) : color,
    ...style
  });

  return (
    <ButtonGroupContext
      value={{
        fullWidth,
        variant,
        color,
        size,
        overlayColor,
        disableOverlay,
        rippleColor,
        rippleStartLocation,
        disableRipple,
        elevation,
        disabled
      }}
    >
      <Component
        ref={ref}
        role="group"
        className={cn(
          'JinniButtonGroup',
          { fullWidth },
          orientation,
          className
        )}
        style={newStyle}
        {...rest}
      >
        {children}
      </Component>
    </ButtonGroupContext>
  );
};

export default ButtonGroup;
