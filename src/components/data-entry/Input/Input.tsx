import cn from 'classnames';
import { InputBase, InputBaseProps } from '@/components/data-entry/InputBase';

export type InputProps = InputBaseProps<'input'> & {
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
};

const Input = (props: InputProps) => {
  const { className, ...rest } = props;

  return <InputBase className={cn('JinniInput', className)} {...rest} />;
};

export default Input;
