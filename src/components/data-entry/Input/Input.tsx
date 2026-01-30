import cn from 'classnames';
import {
  InputBase,
  RootInputBaseProps
} from '@/components/data-entry/InputBase';
import { DefaultComponentProps } from '@/types/default-component-props';
import { useInputValue } from './Input.hooks';
import { useLabelContext } from '@/components/data-entry/Label';

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
  };

const Input = (props: InputProps) => {
  const labelContext = useLabelContext();
  const {
    type = 'text',
    defaultValue = '',
    value,
    onChange,
    startAdornment,
    endAdornment,
    variant,
    size = (labelContext?.size || 'md') as RootInputBaseProps['size'],
    color,
    focusedColor,
    disabled = labelContext?.disabled,
    disableHoverEffect,
    disableFocusEffect,
    fullWidth,
    required = labelContext?.required,
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
      startAdornment={startAdornment}
      endAdornment={endAdornment}
      variant={variant}
      size={size}
      color={color}
      focusedColor={focusedColor}
      disabled={disabled}
      disableHoverEffect={disableHoverEffect}
      disableFocusEffect={disableFocusEffect}
      fullWidth={fullWidth}
    >
      <input
        type={type}
        value={inputValue}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        {...rest}
      />
    </InputBase>
  );
};

export default Input;
