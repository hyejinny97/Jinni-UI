import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { ButtonBaseProps, ButtonBase } from '@/components/general/ButtonBase';
import { ColorType } from '@/types/color';

export type DotProps<T extends AsType = 'button'> = Omit<
  ButtonBaseProps<T>,
  'href' | 'children' | 'value'
> & {
  value: number | string;
  selected?: boolean;
  color?: ColorType;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
};

const Dot = <T extends AsType = 'button'>(props: DotProps<T>) => {
  const {
    selected = false,
    color = 'primary',
    size = 'md',
    children,
    className,
    style,
    ...rest
  } = props;

  return (
    <ButtonBase
      className={cn('JinniDot', size, className)}
      style={{ backgroundColor: selected ? color : 'gray-300', ...style }}
      {...rest}
    >
      {children}
    </ButtonBase>
  );
};

export default Dot;
