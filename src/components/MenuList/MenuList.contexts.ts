import { createContext } from 'react';
import { MenuListProps } from './MenuList';

type MenuListContextProps = Pick<MenuListProps, 'dense'>;

const MenuListContext = createContext<MenuListContextProps | null>(null);

export default MenuListContext;
