import { ELEVATION_LEVELS } from '@/constants/elevation';

export type ElevationLevelType = (typeof ELEVATION_LEVELS)[number];

export type ElevationSpecType = {
  'box-shadow': string;
  'background-image'?: string;
};
