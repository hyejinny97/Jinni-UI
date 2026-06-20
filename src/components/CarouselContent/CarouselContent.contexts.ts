import { createContext } from 'react';

type CarouselContentProps = {
  carouselContainerElRef: React.RefObject<HTMLDivElement | null>;
  itemValue: number;
};

const CarouselContentContext = createContext<CarouselContentProps | null>(null);

export default CarouselContentContext;
