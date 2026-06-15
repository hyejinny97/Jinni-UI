import { createContext } from 'react';

type DrawerContextProps = {
  drawerHeaderId: string;
  drawerBodyId: string;
};

const DrawerContext = createContext<DrawerContextProps | null>(null);

export default DrawerContext;
