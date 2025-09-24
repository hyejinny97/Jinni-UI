import './AvatarGroup.scss';
import React from 'react';
import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { Avatar } from '@/components/data-display/Avatar';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { useAvatarChildren } from './AvatarGroup.hooks';
import { validatePositiveInteger, getAvatarWidth } from './AvatarGroup.utils';
import AvatarGroupContext from './AvatarGroup.contexts';

export type AvatarGroupProps<T extends AsType = 'span'> =
  DefaultComponentProps<T> & {
    children: React.ReactNode;
    max?: number;
    total?: number;
    renderSurplus?: (surplus: number) => React.ReactNode;
    spacing?: 'sm' | 'md' | 'lg';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
    shape?: 'circle' | 'square' | 'rounded';
  };

const AvatarGroup = <T extends AsType = 'span'>(props: AvatarGroupProps<T>) => {
  const {
    children,
    max = 5,
    total,
    renderSurplus = (surplus: number) => (
      <Avatar key="surplus-avatar" className="surplus-avatar">
        {`+${surplus}`}
      </Avatar>
    ),
    spacing = 'md',
    size = 'md',
    shape = 'circle',
    className,
    style,
    as: Component = 'span',
    ...rest
  } = props;
  const { avatarChildren } = useAvatarChildren({ children });
  const avatarWidth = getAvatarWidth({ size });
  const newStyle = useStyle({ '--avatar-width': avatarWidth, ...style });

  const totalCount = total ?? avatarChildren.length;
  const validatedMax = validatePositiveInteger(max);
  const validatedTotal = validatePositiveInteger(totalCount);
  const maxToShow = Math.min(validatedMax, avatarChildren.length);
  const surplus = validatedTotal - maxToShow;

  const displayedAvatars = avatarChildren.slice(0, maxToShow);
  const surplusAvatar = renderSurplus(surplus);
  const avatars =
    surplus > 0 ? [...displayedAvatars, surplusAvatar] : displayedAvatars;

  return (
    <AvatarGroupContext.Provider value={{ shape, size }}>
      <Component
        className={cn('JinniAvatarGroup', spacing, className)}
        style={newStyle}
        {...rest}
      >
        {avatars.reverse().map((avatar, idx) => (
          <span key={idx} className="JinniAvatarItem">
            {avatar}
          </span>
        ))}
      </Component>
    </AvatarGroupContext.Provider>
  );
};

export default AvatarGroup;
