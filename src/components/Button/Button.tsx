import './Button.scss';
import cn from 'classnames';
import { forwardRef } from 'react';
import type { ColorType } from '@/types/color';
import { AsType } from '@/types/default-component-props';
import { getColorStyle } from './Button.utils';
import ButtonBase, { ButtonBaseProps } from '@/components/ButtonBase';
import useColor from '@/hooks/useColor';
import { useButtonGroupContext } from '@/components/ButtonGroup';

export type VariantType = 'filled' | 'subtle-filled' | 'outlined' | 'text';
export type SizeType = 'sm' | 'md' | 'lg';

export type ButtonProps<T extends AsType = 'button'> = Omit<
  ButtonBaseProps<T>,
  'children'
> & {
  children?: React.ReactNode;
  variant?: VariantType;
  shape?: 'pill' | 'rounded';
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  fullWidth?: boolean;
  size?: SizeType;
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
      overlayColor,
      rippleColor,
      className,
      style,
      ...rest
    } = newProps;
    const normalizedColor = useColor(color);
    const {
      textColor,
      backgroundColor,
      borderColor,
      overlayColor: defaultOverlayColor,
      rippleColor: defaultRippleColor
    } = getColorStyle({
      color: normalizedColor,
      variant
    });

    return (
      <ButtonBase
        ref={ref}
        className={cn('JinniButton', size, shape, { fullWidth }, className)}
        overlayColor={overlayColor || defaultOverlayColor}
        rippleColor={rippleColor || defaultRippleColor}
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
