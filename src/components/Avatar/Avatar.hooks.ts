import { useContext } from 'react';
import { AvatarGroupContext } from '@/components/data-display/AvatarGroup';

export const useAvatarGroup = () => {
  const value = useContext(AvatarGroupContext);
  return value;
};
