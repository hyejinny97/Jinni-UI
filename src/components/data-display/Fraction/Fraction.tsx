import './Fraction.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

export type FractionProps<T extends AsType = 'span'> =
  DefaultComponentProps<T> & {
    count: number | string;
    value: number | string;
    size?: 'sm' | 'md' | 'lg';
    orientation?: 'horizontal' | 'vertical';
  };

const Fraction = <T extends AsType = 'span'>(props: FractionProps<T>) => {
  const {
    count,
    value,
    size = 'md',
    orientation = 'horizontal',
    className,
    style,
    as: Component = 'span',
    ...rest
  } = props;
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniFraction', size, orientation, className)}
      style={newStyle}
      {...rest}
    >
      <span className="JinniFractionValue">{value}</span>
      <span className="JinniFractionSlash">/</span>
      <span className="JinniFractionCount">{count}</span>
    </Component>
  );
};

export default Fraction;
