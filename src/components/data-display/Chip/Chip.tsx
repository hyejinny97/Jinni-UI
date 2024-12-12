import './Chip.scss';
import cn from 'classnames';
import React from 'react';
import type { ColorType } from '@/types/color';
import { useRipple } from '@/hooks/useRipple';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { getColorStyle, getBorderRadius } from './Chip.utils';
import { ChipLeftAvatar, ChipRightAvatar } from './ChipAvatar';
import { ChipLeftIcon, ChipRightIcon } from './ChipIcon';
import { ChipLabel } from './ChipLabel';
import { DeleteButton } from './DeleteButton';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

export type VariantType = 'filled' | 'subtle-filled' | 'outlined' | 'text';
export type ShapeType = 'pill' | 'rounded';

type ChipProps<T extends AsType = 'span'> = DefaultComponentProps<T> & {
  label: React.ReactNode;
  variant?: VariantType;
  shape?: ShapeType;
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
};

const Chip = <T extends AsType = 'span'>(props: ChipProps<T>) => {
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
    className,
    style,
    as: Component = 'span',
    ...rest
  } = props;
  const isClickable = !!onClick || clickable;
  const isDeletable = !!onDelete;
  const showRipple = isClickable && !isDeletable;
  const borderRadius = getBorderRadius(shape);
  const {
    chipColorStyle,
    avatarColorStyle,
    iconColorStyle,
    deleteButtonColorStyle
  } = getColorStyle({
    color,
    variant
  });
  const chipStyle = useStyle({ borderRadius, ...chipColorStyle, ...style });
  const avatarStyle = useStyle({ ...avatarColorStyle });
  const iconStyle = useStyle({ ...iconColorStyle });
  const deleteButtonStyle = useStyle({ ...deleteButtonColorStyle });
  const { rippleTargetRef, RippleContainer } = useRipple({
    rippleColor: variant === 'filled' ? 'white' : 'black'
  });

  return (
    <Component
      ref={rippleTargetRef}
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
      {showRipple && <RippleContainer />}
    </Component>
  );
};

export default Chip;
