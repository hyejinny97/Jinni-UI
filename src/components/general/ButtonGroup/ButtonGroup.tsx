import './ButtonGroup.scss';
import { forwardRef } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ButtonProps } from '@/components/general/Button';
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

const ButtonGroup = forwardRef(
  <T extends AsType = 'div'>(
    props: ButtonGroupProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
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
      as: Component = 'div',
      ...rest
    } = props;
    const normalizedColor = useColor(color);
    const newStyle = useStyle({
      '--divider-color':
        variant === 'filled' ? darken(normalizedColor, 0.3) : color,
      ...style
    });

    return (
      <ButtonGroupContext.Provider
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
      </ButtonGroupContext.Provider>
    );
  }
);

export default ButtonGroup;
