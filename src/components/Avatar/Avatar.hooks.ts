import { useContext } from 'react';
import { AvatarGroupContext } from '@/components/AvatarGroup';

export const useAvatarGroup = () => {
  const value = useContext(AvatarGroupContext);
  return value;
};
