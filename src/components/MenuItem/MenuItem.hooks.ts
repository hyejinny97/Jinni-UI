import { useContext } from 'react';
import { MenuListContext } from '@/components/MenuList';

export const useMenuList = () => {
  const value = useContext(MenuListContext);
  return value;
};
