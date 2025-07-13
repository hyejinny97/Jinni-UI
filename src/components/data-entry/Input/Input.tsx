import cn from 'classnames';
import {
  InputBase,
  RootInputBaseProps
} from '@/components/data-entry/InputBase';
import { DefaultComponentProps } from '@/types/default-component-props';
import { useInputValue } from './Input.hooks';

export type InputProps = Omit<DefaultComponentProps<'input'>, 'size'> &
  RootInputBaseProps & {
    type?:
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
      | 'week';
    defaultValue?: string | number;
    value?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
  };

const Input = (props: InputProps) => {
  const {
    type = 'text',
    defaultValue,
    value,
    onChange,
    disabled,
    startAdornment,
    endAdornment,
    variant,
    size,
    color,
    focusedColor,
    disableHoverEffect,
    disableFocusEffect,
    fullWidth,
    className,
    style,
    ...rest
  } = props;
  const { inputValue, handleChange } = useInputValue({
    defaultValue,
    value,
    onChange
  });

  return (
    <InputBase
      className={cn('JinniInput', className)}
      style={style}
      disabled={disabled}
      startAdornment={startAdornment}
      endAdornment={endAdornment}
      variant={variant}
      size={size}
      color={color}
      focusedColor={focusedColor}
      disableHoverEffect={disableHoverEffect}
      disableFocusEffect={disableFocusEffect}
      fullWidth={fullWidth}
    >
      <input
        type={type}
        value={inputValue}
        onChange={handleChange}
        disabled={disabled}
        {...rest}
      />
    </InputBase>
  );
};

export default Input;
