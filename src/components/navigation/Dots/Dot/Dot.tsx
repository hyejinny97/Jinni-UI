import './Dot.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { ButtonBaseProps, ButtonBase } from '@/components/general/ButtonBase';
import { ColorType } from '@/types/color';
import { useDots } from '../Dots.hooks';

export type DotValueType = number | string;

export type DotProps<T extends AsType = 'button'> = Omit<
  ButtonBaseProps<T>,
  'value'
> & {
  value: DotValueType;
  color?: ColorType;
  size?: 'sm' | 'md' | 'lg';
};

const Dot = <T extends AsType = 'button'>(props: DotProps<T>) => {
  const { selectedValue, handleChange, ...restDotsContext } = useDots();
  const {
    value,
    color = 'primary',
    size = 'md',
    onClick,
    children,
    className,
    style,
    ...rest
  } = { ...restDotsContext, ...props };
  const selected = selectedValue === value;

  const handleClick = (e: MouseEvent) => {
    handleChange(e, value);
    onClick?.();
  };

  return (
    <li className={cn('JinniDot', size)} data-value={value}>
      <ButtonBase
        className={cn('JinniDotButton', size, className)}
        onClick={handleClick}
        style={{
          '--dot-color': selected ? color : 'gray-300',
          ...style
        }}
        aria-label={`go to ${value}`}
        aria-current={selected}
        {...rest}
      >
        {children}
      </ButtonBase>
    </li>
  );
};

export default Dot;
