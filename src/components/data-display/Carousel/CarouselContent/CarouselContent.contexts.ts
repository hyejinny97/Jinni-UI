import { createContext } from 'react';

type CarouselContentProps = {
  carouselContainerElRef: React.RefObject<HTMLElement>;
  itemValue: number;
};

const CarouselContentContext = createContext<CarouselContentProps | null>(null);

export default CarouselContentContext;
