import './TextArea.scss';
import cn from 'classnames';
import { InputBase, InputBaseProps } from '@/components/data-entry/InputBase';
import { useRows } from './TextArea.hooks';

export type TextAreaProps = InputBaseProps<'textarea'> & {
  rows?: number;
  minRows?: number;
  maxRows?: number;
  resize?: boolean;
  resizeDirection?: 'horizontal' | 'vertical' | 'both';
};

const TextArea = (props: TextAreaProps) => {
  const {
    rows,
    minRows,
    maxRows,
    resize = false,
    resizeDirection = 'both',
    onChange,
    className,
    ...rest
  } = props;
  const { textAreaElRef, handleChange } = useRows({
    rows,
    minRows,
    maxRows,
    onChange
  });

  return (
    <InputBase
      as="textarea"
      ref={textAreaElRef}
      className={cn('JinniTextArea', { resize }, resizeDirection, className)}
      onChange={handleChange}
      {...rest}
    />
  );
};

export default TextArea;
