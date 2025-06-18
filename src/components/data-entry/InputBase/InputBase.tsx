import './InputBase.scss';
import { forwardRef } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ColorType } from '@/types/color';
import { toRgbaObject } from '@/utils/colorFormat';

export type RootInputBaseProps = {
  children?: React.ReactNode;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  variant?: 'outlined' | 'filled' | 'underlined' | 'borderless';
  size?: 'sm' | 'md' | 'lg';
  color?: ColorType;
  disabled?: boolean;
  disableHoverEffect?: boolean;
  disableFocusEffect?: boolean;
  fullWidth?: boolean;
  focused?: boolean;
};

export type InputBaseProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & RootInputBaseProps;

const InputBase = forwardRef(
  <T extends AsType = 'div'>(
    props: InputBaseProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      children,
      startAdornment,
      endAdornment,
      variant = 'outlined',
      size = 'md',
      color = 'primary',
      disabled = false,
      disableHoverEffect = disabled,
      disableFocusEffect = disabled,
      fullWidth = false,
      focused = false,
      className,
      style,
      as: Component = 'div',
      ...rest
    } = props;
    const { r, g, b } = toRgbaObject(color);
    const isBorderVariant = variant === 'outlined' || variant === 'underlined';
    const isOverlayVariant = variant === 'filled' || variant === 'borderless';
    const focusedBorderColor = isBorderVariant ? color : undefined;
    const focusedOverlayColor = isOverlayVariant
      ? `rgba(${r}, ${g}, ${b}, 0.1)`
      : undefined;
    const newStyle = useStyle({
      '--focused-border-color': focusedBorderColor,
      '--focused-overlay-color': focusedOverlayColor,
      ...style
    });

    return (
      <Component
        ref={ref}
        className={cn(
          'JinniInputBase',
          {
            disabled,
            disableHoverEffect,
            disableFocusEffect,
            fullWidth,
            focused
          },
          variant,
          size,
          className
        )}
        style={newStyle}
        tabIndex={0}
        {...rest}
      >
        {startAdornment && (
          <span className="JinniInputBaseAdornment start">
            {startAdornment}
          </span>
        )}
        <div className="JinniInputBaseContent">{children}</div>
        {endAdornment && (
          <span className="JinniInputBaseAdornment end">{endAdornment}</span>
        )}
      </Component>
    );
  }
);

export default InputBase;
