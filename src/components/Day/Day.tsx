'use client';

import './Day.scss';
import { memo, useMemo } from 'react';
import cn from 'classnames';
import ButtonBase, { ButtonBaseProps } from '@/components/ButtonBase';
import { ColorType } from '@/types/color';
import { getCloserToWhiteOrBlack } from '@/utils/colorLuminance';
import useColor from '@/hooks/useColor';

export type DayProps = Omit<ButtonBaseProps<'button'>, 'children' | 'value'> & {
  value: Date;
  children: React.ReactNode;
  selected?: boolean;
  marked?: boolean;
  color?: ColorType;
  readOnly?: boolean;
};

const Day = ({ ref, ...props }: DayProps) => {
  const {
    value,
    children,
    selected,
    marked,
    color = 'primary',
    readOnly,
    onClick,
    className,
    style,
    ...rest
  } = props;

  const normalizedBgColorSelected = useColor(color);
  const contrastColor = useMemo(() => {
    const closerColor = getCloserToWhiteOrBlack(normalizedBgColorSelected);
    return closerColor === 'white' ? 'black' : 'white';
  }, [normalizedBgColorSelected]);

  return (
    <ButtonBase
      ref={ref}
      className={cn('JinniDay', { selected, marked }, className)}
      onClick={readOnly ? undefined : onClick}
      style={{
        '--bg-color-selected': color,
        '--text-color-selected': contrastColor,
        ...style
      }}
      data-value={value.toISOString()}
      {...(selected && {
        overlayColor: contrastColor,
        rippleColor: contrastColor
      })}
      {...rest}
    >
      {children}
    </ButtonBase>
  );
};

export default memo(Day);
