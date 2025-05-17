import './InputBase.scss';
import { forwardRef } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ColorType } from '@/types/color';
import { adjustColorOpacity } from '@/utils/colorOpacity';
import { useInputValue } from './InputBase.hooks';

export type InputBaseProps<T extends AsType = 'input'> = Omit<
  DefaultComponentProps<T>,
  'size' | 'defaultValue'
> & {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  defaultValue?: string | number;
  value?: string | number;
  onChange?: (
    event: T extends 'input'
      ? React.ChangeEvent<HTMLInputElement>
      : React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  variant?: 'outlined' | 'filled' | 'underlined' | 'borderless';
  size?: 'sm' | 'md' | 'lg';
  color?: ColorType;
  disabled?: boolean;
  disableHoverEffect?: boolean;
  disableFocusEffect?: boolean;
  fullWidth?: boolean;
};

const InputBase = forwardRef(
  <T extends AsType = 'input'>(
    props: InputBaseProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      startAdornment,
      endAdornment,
      defaultValue,
      value,
      onChange,
      variant = 'outlined',
      size = 'md',
      color = 'primary',
      disabled = false,
      disableHoverEffect = disabled,
      disableFocusEffect = disabled,
      fullWidth = false,
      className,
      style,
      as: Component = 'input',
      ...rest
    } = props;
    const { inputValue, handleChange } = useInputValue({
      defaultValue,
      value,
      onChange
    });
    const isBorderVariant = variant === 'outlined' || variant === 'underlined';
    const isOverlayVariant = variant === 'filled' || variant === 'borderless';
    const focusedBorderColor = isBorderVariant ? color : undefined;
    const focusedOverlayColor = isOverlayVariant
      ? adjustColorOpacity(color, 0.1)
      : undefined;
    const newStyle = useStyle({
      '--focused-border-color': focusedBorderColor,
      '--focused-overlay-color': focusedOverlayColor,
      ...style
    });

    return (
      <div
        className={cn(
          'JinniInputBaseContainer',
          { disabled, disableHoverEffect, disableFocusEffect, fullWidth },
          variant,
          size,
          className
        )}
        style={newStyle}
      >
        {startAdornment && (
          <span className="JinniInputBaseAdornment start">
            {startAdornment}
          </span>
        )}
        <Component
          ref={ref}
          className="JinniInputBase"
          value={inputValue}
          onChange={handleChange}
          disabled={disabled}
          {...rest}
        />
        {endAdornment && (
          <span className="JinniInputBaseAdornment end">{endAdornment}</span>
        )}
      </div>
    );
  }
);

export default InputBase;
