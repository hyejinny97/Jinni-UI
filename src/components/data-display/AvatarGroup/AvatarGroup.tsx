import './AvatarGroup.scss';
import cn from 'classnames';
import React from 'react';
import { Avatar } from '@/components/data-display/Avatar';
import type { AvatarProps } from '@/components/data-display/Avatar';
import { insertProps } from './AvatarGroup.utils';
import { DefaultComponentProps } from '@/types/default-component-props';

export interface AvatarGroupProps
  extends DefaultComponentProps<HTMLSpanElement> {
  children: Array<React.ReactElement<AvatarProps>>;
  max?: number;
  total?: number;
  renderSurplus?: (surplus: number) => React.ReactElement<AvatarProps>;
  spacing?: 'sm' | 'md' | 'lg';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square' | 'rounded';
}

const AvatarGroup = (props: AvatarGroupProps) => {
  const {
    children,
    max = children.length,
    total = children.length,
    renderSurplus,
    spacing = 'md',
    size = 'md',
    shape = 'circle',
    className,
    style,
    ...rest
  } = props;
  const surplusNum = total - max;

  const displayedAvatars = children.slice(0, max);
  const surplusAvatar = (
    <Avatar
      key="surplus-avatar"
      className="surplus-avatar"
      style={{ backgroundColor: 'gray-400', color: 'gray-50' }}
    >
      {renderSurplus ? renderSurplus(surplusNum) : `+${surplusNum}`}
    </Avatar>
  );
  const avatars =
    surplusNum > 0 ? [...displayedAvatars, surplusAvatar] : displayedAvatars;

  return (
    <span
      className={cn(
        'JinniAvatarGroup',
        `spacing-${spacing}`,
        `size-${size}`,
        className
      )}
      {...rest}
    >
      {insertProps(avatars, { size, shape, style }).reverse()}
    </span>
  );
};

export default AvatarGroup;
