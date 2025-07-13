import './TextArea.scss';
import cn from 'classnames';
import {
  InputBase,
  RootInputBaseProps
} from '@/components/data-entry/InputBase';
import { DefaultComponentProps } from '@/types/default-component-props';
import { useTextAreaValue, useRows } from './TextArea.hooks';

export type TextAreaProps = Omit<DefaultComponentProps<'textarea'>, 'size'> &
  RootInputBaseProps & {
    defaultValue?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    disabled?: boolean;
    rows?: number;
    minRows?: number;
    maxRows?: number;
    resize?: boolean;
    resizeDirection?: 'horizontal' | 'vertical' | 'both';
  };

const TextArea = (props: TextAreaProps) => {
  const {
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
    rows,
    minRows,
    maxRows,
    resize = false,
    resizeDirection = 'both',
    className,
    style,
    ...rest
  } = props;
  const { textAreaElRef, adjustRows } = useRows({
    rows,
    minRows,
    maxRows
  });
  const { textAreaValue, handleChange } = useTextAreaValue({
    defaultValue,
    value,
    onChange,
    adjustRows
  });

  return (
    <InputBase
      className={cn('JinniTextArea', { resize }, resizeDirection, className)}
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
      <textarea
        ref={textAreaElRef}
        className={cn({ resize }, resizeDirection)}
        value={textAreaValue}
        onChange={handleChange}
        disabled={disabled}
        {...rest}
      />
    </InputBase>
  );
};

export default TextArea;
