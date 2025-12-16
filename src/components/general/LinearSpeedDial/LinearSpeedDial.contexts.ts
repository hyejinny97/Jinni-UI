import { createContext } from 'react';
import { PlacementType } from './LinearSpeedDial';

type LinearSpeedDialContextType = {
  placement: PlacementType;
};

export const LinearSpeedDialContext =
  createContext<LinearSpeedDialContextType | null>(null);
