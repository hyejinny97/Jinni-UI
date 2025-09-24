import React, { useCallback } from 'react';
import { AvatarGroupProps } from './AvatarGroup';
import { Avatar } from '@/components/data-display/Avatar';

export const useAvatarChildren = ({
  children
}: Pick<AvatarGroupProps, 'children'>) => {
  const containsAvatar = useCallback((node: React.ReactNode): boolean => {
    if (!node) return false;
    if (React.isValidElement(node)) {
      if (node.type === Avatar) return true;
      const props = node.props as { children?: React.ReactNode };
      if (props.children) {
        return React.Children.toArray(props.children).some(containsAvatar);
      }
    }
    return false;
  }, []);

  const childArray = React.Children.toArray(children);
  const avatarChildren = childArray.filter(
    (child): child is React.ReactElement =>
      React.isValidElement(child) && containsAvatar(child)
  );
  return { avatarChildren };
};
