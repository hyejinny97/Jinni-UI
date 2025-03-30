import { createContext } from 'react';
import { DirectionType } from './LinearSpeedDial';

type LinearSpeedDialContextType = {
  direction: DirectionType;
};

const LinearSpeedDialContext = createContext<LinearSpeedDialContextType | null>(
  null
);

export default LinearSpeedDialContext;
