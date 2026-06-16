import { createContext } from 'react';

type InfiniteCarouselContextProps = {
  count: number;
  slideValue: number;
  transformToCarouselItemIdx: (slideIdx: number) => number;
};

const InfiniteCarouselContext =
  createContext<InfiniteCarouselContextProps | null>(null);

export default InfiniteCarouselContext;
