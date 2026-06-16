import { createContext } from 'react';
import { CircularSpeedDialProps } from './CircularSpeedDial';

type CircularSpeedDialContextType = Pick<
  CircularSpeedDialProps,
  'positionType' | 'container'
>;

export const CircularSpeedDialContext =
  createContext<CircularSpeedDialContextType | null>(null);
