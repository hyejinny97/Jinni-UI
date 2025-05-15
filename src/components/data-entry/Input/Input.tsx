import './Input.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ColorType } from '@/types/color';
import { adjustColorOpacity } from '@/utils/colorOpacity';
import { useInputValue } from './Input.hooks';

export type InputProps<T extends AsType = 'input'> = Omit<
  DefaultComponentProps<T>,
  'size' | 'defaultValue'
> & {
  type?: T extends 'input'
    ?
        | 'date'
        | 'datetime-local'
        | 'email'
        | 'month'
        | 'number'
        | 'password'
        | 'search'
        | 'tel'
        | 'text'
        | 'time'
        | 'url'
        | 'week'
    : never;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  defaultValue?: string | number;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: 'outlined' | 'filled' | 'underlined' | 'borderless';
  size?: 'sm' | 'md' | 'lg';
  color?: ColorType;
  disabled?: boolean;
  disableHoverEffect?: boolean;
  disableFocusEffect?: boolean;
  fullWidth?: boolean;
};

const Input = <T extends AsType = 'input'>(props: InputProps<T>) => {
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
        'JinniInputContainer',
        { disabled, disableHoverEffect, disableFocusEffect, fullWidth },
        variant,
        size,
        className
      )}
      style={newStyle}
    >
      {startAdornment && (
        <span className="JinniInputAdornment start">{startAdornment}</span>
      )}
      <Component
        className="JinniInput"
        value={inputValue}
        onChange={handleChange}
        disabled={disabled}
        {...rest}
      />
      {endAdornment && (
        <span className="JinniInputAdornment end">{endAdornment}</span>
      )}
    </div>
  );
};

export default Input;
