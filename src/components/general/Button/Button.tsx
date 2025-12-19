import './Button.scss';
import cn from 'classnames';
import { forwardRef } from 'react';
import type { ColorType } from '@/types/color';
import { AsType } from '@/types/default-component-props';
import { getColorStyle } from './Button.utils';
import { ButtonBase, ButtonBaseProps } from '@/components/general/ButtonBase';
import useColor from '@/hooks/useColor';
import { useButtonGroupContext } from '@/components/general/ButtonGroup';

export type ButtonProps<T extends AsType = 'button'> = Omit<
  ButtonBaseProps<T>,
  'children'
> & {
  children?: React.ReactNode;
  variant?: 'filled' | 'subtle-filled' | 'outlined' | 'text';
  shape?: 'pill' | 'rounded';
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: ColorType;
};

const Button = forwardRef(
  <T extends AsType = 'button'>(
    props: ButtonProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const buttonGroupValue = useButtonGroupContext();
    const newProps = buttonGroupValue
      ? { ...buttonGroupValue, ...props }
      : props;
    const {
      children,
      variant = 'filled',
      shape = 'rounded',
      size = 'md',
      color = 'primary',
      startAdornment,
      endAdornment,
      fullWidth,
      overlayColor = variant === 'filled' ? 'white' : 'black',
      rippleColor = variant === 'filled' ? 'white' : 'black',
      className,
      style,
      ...rest
    } = newProps;
    const normalizedColor = useColor(color);
    const { textColor, backgroundColor, borderColor } = getColorStyle({
      color: normalizedColor,
      variant
    });

    return (
      <ButtonBase
        ref={ref}
        className={cn('JinniButton', size, shape, { fullWidth }, className)}
        overlayColor={overlayColor}
        rippleColor={rippleColor}
        style={{
          '--text-color': textColor,
          '--background-color': backgroundColor,
          '--border-color': borderColor,
          ...style
        }}
        {...rest}
      >
        {startAdornment && (
          <span className={cn('JinniButtonAdornment start', size)}>
            {startAdornment}
          </span>
        )}
        <span className={cn('JinniButtonLabel', size)}>{children}</span>
        {endAdornment && (
          <span className={cn('JinniButtonAdornment end', size)}>
            {endAdornment}
          </span>
        )}
      </ButtonBase>
    );
  }
);

Button.displayName = 'Button';

export default Button;
