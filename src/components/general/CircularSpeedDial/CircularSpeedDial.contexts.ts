import { createContext } from 'react';

export type CircularSpeedDialContextType = {
  mainCircleRadius: number;
  circularSpeedDialContentRadius: number;
  rotationAngleList: Array<number>;
};

const CircularSpeedDialContext =
  createContext<CircularSpeedDialContextType | null>(null);

export default CircularSpeedDialContext;
