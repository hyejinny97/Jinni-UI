import { createContext } from 'react';
import { LinearSpeedDialProps } from './LinearSpeedDial';

type LinearSpeedDialContextType = Required<
  Pick<LinearSpeedDialProps, 'placement'>
> &
  Pick<LinearSpeedDialProps, 'positionType' | 'container'>;

export const LinearSpeedDialContext =
  createContext<LinearSpeedDialContextType | null>(null);
