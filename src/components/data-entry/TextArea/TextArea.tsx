import './TextArea.scss';
import cn from 'classnames';
import {
  InputBase,
  RootInputBaseProps
} from '@/components/data-entry/InputBase';
import { DefaultComponentProps } from '@/types/default-component-props';
import { useTextAreaValue, useRows } from './TextArea.hooks';
import { useLabelContext } from '@/components/data-entry/Label';

export type TextAreaProps = Omit<DefaultComponentProps<'textarea'>, 'size'> &
  RootInputBaseProps & {
    defaultValue?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    rows?: number;
    minRows?: number;
    maxRows?: number;
    resize?: boolean;
    resizeDirection?: 'horizontal' | 'vertical' | 'both';
  };

const TextArea = (props: TextAreaProps) => {
  const labelContext = useLabelContext();
  const {
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
    rows,
    minRows = 1,
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
      className={cn('JinniTextArea', className)}
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
      <textarea
        ref={textAreaElRef}
        className={cn({ resize }, resizeDirection)}
        value={textAreaValue}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        {...rest}
      />
    </InputBase>
  );
};

export default TextArea;
