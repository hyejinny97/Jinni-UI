import { DAY } from '@/constants/time';

export const dateToMonth = (date: Date): number => {
  const year = date.getFullYear() - 1;
  const month = date.getMonth();
  return year * 12 + month;
};

export const dateToDay = (date: Date): number =>
  Math.floor(date.getTime() / DAY);
