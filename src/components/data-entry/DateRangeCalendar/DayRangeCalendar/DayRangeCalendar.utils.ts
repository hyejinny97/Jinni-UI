import { DAY } from '@/constants/time';

export const dateToDay = (date: Date): number =>
  Math.floor(date.getTime() / DAY);
