import './Dot.scss';
import cn from 'classnames';
import { useMemo } from 'react';
import { AsType } from '@/types/default-component-props';
import { ButtonBaseProps, ButtonBase } from '@/components/general/ButtonBase';
import { ColorType } from '@/types/color';
import { useDots } from '../Dots.hooks';
import { getCloserToWhiteOrBlack } from '@/utils/colorLuminance';
import useColor from '@/hooks/useColor';

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

  const backgroundColor = selected ? color : 'surface-container-highest';
  const normalizedBackgroundColor = useColor(backgroundColor);
  const textColor = useMemo(() => {
    const closerColor = getCloserToWhiteOrBlack(normalizedBackgroundColor);
    return closerColor === 'white' ? 'black' : 'white';
  }, [normalizedBackgroundColor]);

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
          '--background-color': backgroundColor,
          '--color': textColor,
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
