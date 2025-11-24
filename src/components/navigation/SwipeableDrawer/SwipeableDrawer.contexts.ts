import { createContext } from 'react';

type SwipeableDrawerContextProps = {
  drawerHeaderId: string;
  drawerBodyId: string;
};

const SwipeableDrawerContext =
  createContext<SwipeableDrawerContextProps | null>(null);

export default SwipeableDrawerContext;
