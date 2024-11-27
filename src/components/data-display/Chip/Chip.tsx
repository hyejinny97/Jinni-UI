import './Chip.scss';
import cn from 'classnames';
import React from 'react';
import type { ColorType } from '@/types/color';
import { RippleContainer } from '@/components/_share/RippleContainer';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { getColorStyle } from './Chip.utils';
import { ChipLeftAvatar, ChipRightAvatar } from './ChipAvatar';
import { ChipLeftIcon, ChipRightIcon } from './ChipIcon';
import { ChipLabel } from './ChipLabel';
import { DeleteButton } from './DeleteButton';
import { DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

export type VariantType = 'filled' | 'subtle-filled' | 'outlined' | 'text';

interface ChipProps extends DefaultComponentProps<HTMLSpanElement> {
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
    deleteIcon = <CloseIcon />,
    onClick,
    onDelete,
    clickable = false,
    size = 'md',
    color = 'primary',
    style,
    className,
    ...rest
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
  const chipStyle = useStyle({ ...chipColorStyle, ...style });
  const avatarStyle = useStyle({ ...avatarColorStyle });
  const iconStyle = useStyle({ ...iconColorStyle });
  const deleteButtonStyle = useStyle({ ...deleteButtonColorStyle });

  return (
    <RippleContainer
      className={cn(
        'JinniChip',
        variant,
        shape,
        size,
        {
          clickable: isClickable
        },
        className
      )}
      onClick={onClick}
      role={isClickable ? 'button' : 'chip'}
      style={chipStyle}
      active={isClickable && !isDeletable}
      rippleColor={variant === 'filled' ? 'white' : 'black'}
      {...rest}
    >
      {leftAvatar && (
        <ChipLeftAvatar style={avatarStyle}>{leftAvatar}</ChipLeftAvatar>
      )}
      {leftIcon && <ChipLeftIcon style={iconStyle}>{leftIcon}</ChipLeftIcon>}
      <ChipLabel>{label}</ChipLabel>
      {rightAvatar && (
        <ChipRightAvatar style={avatarStyle}>{rightAvatar}</ChipRightAvatar>
      )}
      {rightIcon && (
        <ChipRightIcon style={iconStyle}>{rightIcon}</ChipRightIcon>
      )}
      {isDeletable && (
        <DeleteButton
          onDelete={onDelete}
          deleteIcon={deleteIcon}
          style={deleteButtonStyle}
        />
      )}
    </RippleContainer>
  );
};

export default Chip;
