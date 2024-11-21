import './Chip.scss';
import cn from 'classnames';
import React from 'react';
import type { ColorType } from '@/types/color';
import type { StyleType } from '@/types/style';
import { editColorStyle } from '@/utils/editColorStyle';
import { getColorStyle } from './Chip.utils';
import { RippleContainer } from '@/components/_share/RippleContainer';
import { ChipLeftAvatar, ChipRightAvatar } from './ChipAvatar';
import { ChipLeftIcon, ChipRightIcon } from './ChipIcon';
import { ChipLabel } from './ChipLabel';
import { DeleteButton } from './DeleteButton';

export type VariantType = 'filled' | 'subtle-filled' | 'outlined' | 'text';

interface ChipProps extends React.HtmlHTMLAttributes<HTMLSpanElement> {
  label: React.ReactNode;
  variant?: VariantType;
  shape?: 'pill' | 'rounded';
  leftAvatar?: JSX.Element;
  rightAvatar?: JSX.Element;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  deleteIcon?: JSX.Element;
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onDelete?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  clickable?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: ColorType;
  style?: StyleType;
}

const Chip = (props: ChipProps) => {
  const {
    label,
    variant = 'filled',
    shape = 'pill',
    leftAvatar,
    rightAvatar,
    leftIcon,
    rightIcon,
    deleteIcon,
    onClick,
    onDelete,
    clickable = false,
    size = 'md',
    color = 'primary',
    style
  } = props;
  const isClickable = !!onClick || clickable;
  const isDeletable = !!onDelete;
  const {
    chipColorStyle,
    avatarColorStyle,
    iconColorStyle,
    deleteButtonColorStyle
  } = getColorStyle({
    color,
    variant
  });
  const newChipStyle = { ...chipColorStyle, ...style };

  return (
    <RippleContainer
      className={cn('JinniChip', variant, shape, size, {
        clickable: isClickable
      })}
      onClick={onClick}
      role={isClickable ? 'button' : 'chip'}
      style={editColorStyle(newChipStyle)}
      active={isClickable && !isDeletable}
      rippleColor={variant === 'filled' ? 'white' : 'black'}
    >
      {leftAvatar && (
        <ChipLeftAvatar colorStyle={avatarColorStyle}>
          {leftAvatar}
        </ChipLeftAvatar>
      )}
      {leftIcon && (
        <ChipLeftIcon colorStyle={iconColorStyle}>{leftIcon}</ChipLeftIcon>
      )}
      <ChipLabel>{label}</ChipLabel>
      {rightAvatar && (
        <ChipRightAvatar colorStyle={avatarColorStyle}>
          {rightAvatar}
        </ChipRightAvatar>
      )}
      {rightIcon && (
        <ChipRightIcon colorStyle={iconColorStyle}>{rightIcon}</ChipRightIcon>
      )}
      {isDeletable && (
        <DeleteButton
          onDelete={onDelete}
          deleteIcon={deleteIcon}
          colorStyle={deleteButtonColorStyle}
        />
      )}
    </RippleContainer>
  );
};

export default Chip;
