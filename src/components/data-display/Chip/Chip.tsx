import './Chip.scss';
import cn from 'classnames';
import React from 'react';
import type { ColorType } from '@/types/color';
import { getColorStyle } from './Chip.utils';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import useColor from '@/hooks/useColor';

export type VariantType = 'filled' | 'subtle-filled' | 'outlined' | 'text';

type ChipProps<T extends AsType = 'span'> = DefaultComponentProps<T> & {
  children: React.ReactNode;
  variant?: VariantType;
  shape?: 'pill' | 'rounded';
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  color?: ColorType;
};

const Chip = <T extends AsType = 'span'>(props: ChipProps<T>) => {
  const {
    children,
    variant = 'outlined',
    shape = 'pill',
    startAdornment,
    endAdornment,
    size = 'md',
    color = 'gray-400',
    className,
    style,
    as: Component = 'span',
    ...rest
  } = props;
  const normalizedColor = useColor(color);
  const { textColor, backgroundColor, borderColor } = getColorStyle({
    color: normalizedColor,
    variant
  });
  const newStyle = useStyle({
    '--text-color': textColor,
    '--background-color': backgroundColor,
    '--border-color': borderColor,
    ...style
  });

  return (
    <Component
      className={cn('JinniChip', variant, shape, size, className)}
      style={newStyle}
      {...rest}
    >
      {startAdornment && (
        <span className="JinniChipAdornment start">{startAdornment}</span>
      )}
      <span className="JinniChipLabel">{children}</span>
      {endAdornment && (
        <span className="JinniChipAdornment end">{endAdornment}</span>
      )}
    </Component>
  );
};

export default Chip;
