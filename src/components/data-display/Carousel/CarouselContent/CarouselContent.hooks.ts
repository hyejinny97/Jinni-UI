import { useContext } from 'react';
import CarouselContentContext from './CarouselContent.contexts';

export const useCarouselContent = () => {
  const value = useContext(CarouselContentContext);
  if (!value) throw new Error('CarouselContentContext value is null');
  return value;
};
