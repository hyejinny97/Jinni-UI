import {
  useContext,
  useState,
  useLayoutEffect,
  useRef,
  useEffect,
  useCallback
} from 'react';
import InfiniteCarouselContext from './InfiniteCarousel.contexts';
import { InfiniteCarouselProps } from './InfiniteCarousel';
import { CarouselItemElement } from '@/components/data-display/Carousel';
import { findCarouselItems } from './InfiniteCarousel.utils';

type UseCarouselItemsValueProps = {
  defaultValue: number;
};

type UseAddItemsProps = Pick<InfiniteCarouselProps, 'children'> &
  Required<
    Pick<InfiniteCarouselProps, 'orientation' | 'spacing' | 'slideAlignment'>
  > & {
    infiniteCarouselElRef: React.RefObject<HTMLElement>;
    defaultValue: number;
    handleChange: (newValue: number) => void;
  };

type UseTransformProps = {
  baseCount: number;
  itemsAddedToFront: CarouselItemElement[];
};

type UseCarouselJumpOnLimitProps = Required<
  Pick<InfiniteCarouselProps, 'orientation' | 'slideAlignment'>
> & {
  infiniteCarouselElRef: React.RefObject<HTMLElement>;
  freezeCarouselValueRef: React.MutableRefObject<boolean>;
  baseCount: number;
  itemsAddedToFront: CarouselItemElement[];
  itemsAddedToBack: CarouselItemElement[];
  carouselValue: number;
  handleChange: (newValue: number) => void;
};

export const useCarouselValue = ({
  defaultValue
}: UseCarouselItemsValueProps) => {
  const freezeCarouselValueRef = useRef<boolean>(false);
  const [carouselValue, setCarouselValue] = useState<number>(defaultValue);

  const handleChange = useCallback((newValue: number) => {
    if (freezeCarouselValueRef.current) return;
    setCarouselValue(newValue);
  }, []);

  return {
    carouselValue,
    handleChange,
    freezeCarouselValueRef
  };
};

export const useAddItems = ({
  infiniteCarouselElRef,
  children,
  orientation,
  slideAlignment,
  defaultValue,
  handleChange
}: UseAddItemsProps) => {
  const baseCarouselItems = findCarouselItems(children);
  const baseCount = baseCarouselItems.length;
  const [itemsAddedToFront, setItemsAddedToFront] = useState<
    CarouselItemElement[]
  >([]);
  const [itemsAddedToBack, setItemsAddedToBack] = useState<
    CarouselItemElement[]
  >([]);

  useLayoutEffect(() => {
    const infiniteCarouselEl = infiniteCarouselElRef.current;
    if (!infiniteCarouselEl) return;

    const carouselContainerEl = infiniteCarouselEl.querySelector<HTMLElement>(
      ':scope > .JinniCarouselContainer'
    );
    if (!carouselContainerEl) return;

    const carouselContentEl = carouselContainerEl.querySelector<HTMLElement>(
      ':scope > .JinniCarouselContent'
    );
    if (!carouselContentEl) return;

    const carouselItemElList = carouselContentEl.querySelectorAll<HTMLElement>(
      ':scope > .JinniCarouselItem'
    );
    const baseItems = [...carouselItemElList].slice(
      itemsAddedToFront.length,
      itemsAddedToFront.length + baseCount
    );
    const firstItem = baseItems[0];
    const lastItem = baseItems[baseItems.length - 1];

    const generateItemsAddedToFront = () => {
      const clientSize =
        orientation === 'horizontal' ? 'clientWidth' : 'clientHeight';
      const sizeToFill =
        slideAlignment === 'start'
          ? lastItem[clientSize]
          : (carouselContainerEl[clientSize] + lastItem[clientSize]) / 2;

      let itemsNmToAdded = 0;
      let sizeAddedItems = 0;
      while (sizeToFill >= sizeAddedItems) {
        const slideIdx = baseCount - 1 - (itemsNmToAdded % baseCount);
        sizeAddedItems += baseItems[slideIdx][clientSize];
        itemsNmToAdded += 1;
      }

      return Array(itemsNmToAdded)
        .fill(0)
        .map((_, idx) => {
          const offset = itemsNmToAdded - 1 - idx;
          const slideIdx = baseCount - 1 - (offset % baseCount);
          return {
            ...baseCarouselItems[slideIdx],
            key: `item-${offset} added in front`
          };
        });
    };
    const generateItemsAddedToBack = () => {
      const clientSize =
        orientation === 'horizontal' ? 'clientWidth' : 'clientHeight';
      const sizeToFill =
        slideAlignment === 'start'
          ? carouselContainerEl[clientSize]
          : (carouselContainerEl[clientSize] + firstItem[clientSize]) / 2;

      let itemsNmToAdded = 0;
      let sizeAddedItems = 0;
      while (sizeToFill >= sizeAddedItems) {
        const slideIdx = itemsNmToAdded % baseCount;
        sizeAddedItems += baseItems[slideIdx][clientSize];
        itemsNmToAdded += 1;
      }

      return Array(itemsNmToAdded)
        .fill(0)
        .map((_, offset) => {
          const slideIdx = offset % baseCount;
          return {
            ...baseCarouselItems[slideIdx],
            key: `item-${offset} added in back`
          };
        });
    };
    const setItems = () => {
      const frontItems = generateItemsAddedToFront();
      const backItems = generateItemsAddedToBack();
      setItemsAddedToFront(frontItems);
      setItemsAddedToBack(backItems);
      handleChange(defaultValue + frontItems.length);
    };

    setItems();
    const resizeObserver = new ResizeObserver(setItems);
    resizeObserver.observe(carouselContainerEl);
    return () => {
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    itemsAddedToFront,
    itemsAddedToBack,
    baseCount
  };
};

export const useTransform = ({
  baseCount,
  itemsAddedToFront
}: UseTransformProps) => {
  const transformToSlideIdx = (carouselItemIdx: number): number => {
    const itemsNmAddedInFront = itemsAddedToFront.length;
    const isAddedItemToFront = carouselItemIdx < itemsNmAddedInFront;
    const isAddedItemToBack =
      carouselItemIdx >= baseCount + itemsNmAddedInFront;
    if (isAddedItemToFront) {
      const offset = itemsNmAddedInFront - carouselItemIdx - 1;
      return baseCount - 1 - (offset % baseCount);
    }
    if (isAddedItemToBack) {
      const offset = carouselItemIdx - itemsNmAddedInFront - baseCount;
      return offset % baseCount;
    }
    return carouselItemIdx - itemsNmAddedInFront;
  };
  const transformToCarouselItemIdx = (slideIdx: number): number => {
    const itemsNmAddedInFront = itemsAddedToFront.length;
    return slideIdx + itemsNmAddedInFront;
  };

  return {
    transformToSlideIdx,
    transformToCarouselItemIdx
  };
};

export const useCarouselJumpOnLimit = ({
  infiniteCarouselElRef,
  freezeCarouselValueRef,
  orientation,
  slideAlignment,
  baseCount,
  itemsAddedToFront,
  itemsAddedToBack,
  carouselValue,
  handleChange
}: UseCarouselJumpOnLimitProps) => {
  useEffect(() => {
    const infiniteCarouselEl = infiniteCarouselElRef.current;
    if (
      !infiniteCarouselEl ||
      itemsAddedToFront.length === 0 ||
      itemsAddedToBack.length === 0
    )
      return;

    const carouselContainerEl = infiniteCarouselEl.querySelector<HTMLElement>(
      ':scope > .JinniCarouselContainer'
    );
    if (!carouselContainerEl) return;

    const carouselContentEl = carouselContainerEl.querySelector<HTMLElement>(
      ':scope > .JinniCarouselContent'
    );
    if (!carouselContentEl) return;

    const carouselItemElList = carouselContentEl.querySelectorAll<HTMLElement>(
      ':scope > .JinniCarouselItem'
    );
    const frontLimitItemIdx = itemsAddedToFront.length - 1;
    const backLimitItemIdx = itemsAddedToFront.length + baseCount;
    const frontLimitItem = carouselItemElList[frontLimitItemIdx];
    const backLimitItem = carouselItemElList[backLimitItemIdx];

    const offsetAxis =
      orientation === 'horizontal' ? 'offsetLeft' : 'offsetTop';
    const scrollAxis =
      orientation === 'horizontal' ? 'scrollLeft' : 'scrollTop';
    const clientSize =
      orientation === 'horizontal' ? 'clientWidth' : 'clientHeight';

    const frontLimitItemStart = frontLimitItem[offsetAxis];
    const frontLimitItemCenter =
      frontLimitItemStart + frontLimitItem[clientSize] / 2;
    const backLimitItemStart = backLimitItem[offsetAxis];
    const backLimitItemEnd = backLimitItemStart + backLimitItem[clientSize];
    const backLimitItemCenter =
      backLimitItemStart + backLimitItem[clientSize] / 2;

    switch (slideAlignment) {
      case 'start': {
        if (
          carouselContainerEl[scrollAxis] ===
          carouselItemElList[carouselValue][offsetAxis]
        ) {
          freezeCarouselValueRef.current = false;
        }
        break;
      }
      case 'center': {
        const containerSize = carouselContainerEl[clientSize];
        const activeItemSize = carouselItemElList[carouselValue][clientSize];
        if (
          carouselContainerEl[scrollAxis] ===
          Math.round(
            carouselItemElList[carouselValue][offsetAxis] -
              (containerSize - activeItemSize) / 2
          )
        ) {
          freezeCarouselValueRef.current = false;
        }
      }
    }

    const handleScroll = () => {
      const containerStart = carouselContainerEl[scrollAxis];
      const containerCenter =
        containerStart + carouselContainerEl[clientSize] / 2;

      let isCrossingFrontLimitItem = false;
      let isCrossingBackLimitItem = false;
      switch (slideAlignment) {
        case 'start': {
          isCrossingFrontLimitItem = containerStart <= frontLimitItemStart;
          isCrossingBackLimitItem =
            backLimitItemStart <= containerStart &&
            containerStart < backLimitItemEnd;
          break;
        }
        case 'center': {
          isCrossingFrontLimitItem =
            containerCenter <= Math.round(frontLimitItemCenter) &&
            frontLimitItemStart < containerCenter;
          isCrossingBackLimitItem =
            Math.round(backLimitItemCenter) <= containerCenter &&
            containerCenter < backLimitItemEnd;
        }
      }

      if (isCrossingFrontLimitItem || isCrossingBackLimitItem) {
        freezeCarouselValueRef.current = false;
        const itemIdxToJump = isCrossingFrontLimitItem
          ? frontLimitItemIdx + baseCount
          : backLimitItemIdx - baseCount;
        switch (slideAlignment) {
          case 'start': {
            carouselContainerEl[scrollAxis] =
              carouselItemElList[itemIdxToJump][offsetAxis];
            break;
          }
          case 'center': {
            carouselContainerEl[scrollAxis] =
              carouselItemElList[itemIdxToJump][offsetAxis] -
              (carouselContainerEl[clientSize] -
                carouselItemElList[itemIdxToJump][clientSize]) /
                2;
          }
        }
        handleChange(itemIdxToJump);
      } else {
        freezeCarouselValueRef.current = true;
      }
    };
    const handleScrollEnd = () => {
      freezeCarouselValueRef.current = false;
    };

    carouselContainerEl.addEventListener('scroll', handleScroll);
    carouselContainerEl.addEventListener('scrollend', handleScrollEnd);
    return () => {
      carouselContainerEl.removeEventListener('scroll', handleScroll);
      carouselContainerEl.removeEventListener('scrollend', handleScrollEnd);
    };
  }, [
    infiniteCarouselElRef,
    freezeCarouselValueRef,
    orientation,
    slideAlignment,
    baseCount,
    itemsAddedToFront,
    itemsAddedToBack,
    carouselValue,
    handleChange
  ]);
};

export const useInfiniteCarousel = () => {
  const value = useContext(InfiniteCarouselContext);
  return value;
};
