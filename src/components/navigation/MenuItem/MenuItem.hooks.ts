import { useContext } from 'react';
import { MenuListContext } from '@/components/navigation/MenuList';

export const useMenuList = () => {
  const value = useContext(MenuListContext);
  return value;
};
