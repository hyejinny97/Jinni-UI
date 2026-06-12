import type { AvatarGroupProps } from './AvatarGroup';

export const getAvatarWidth = ({
  size
}: Required<Pick<AvatarGroupProps, 'size'>>): string => {
  if (typeof size === 'number') return `${size}px`;

  switch (size) {
    case 'xs':
      return '24px';
    case 'sm':
      return '32px';
    case 'md':
      return '48px';
    case 'lg':
      return '64px';
    case 'xl':
      return '96px';
  }
};
