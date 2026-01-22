import { isValidElement } from 'react';
import {
  CarouselContent,
  CarouselContentProps,
  CarouselItem,
  CarouselItemElement
} from '@/components/data-display/Carousel';

export const findCarouselItems = (
  children: React.ReactNode
): CarouselItemElement[] => {
  const childrenArray = Array.isArray(children) ? children : [children];
  const contentEl: React.ReactElement<CarouselContentProps> =
    childrenArray.find(
      (element) => isValidElement(element) && element.type === CarouselContent
    );
  const contentElChildren = contentEl.props.children;
  const contentElChildrenArray = Array.isArray(contentElChildren)
    ? contentElChildren
    : [contentElChildren];

  const items = contentElChildrenArray.filter(
    (element) => isValidElement(element) && element.type === CarouselItem
  );
  return items;
};

export const addItemsToFrontAndBack = ({
  children,
  itemsAddedToFront,
  itemsAddedToBack
}: {
  children: React.ReactNode;
  itemsAddedToFront: CarouselItemElement[];
  itemsAddedToBack: CarouselItemElement[];
}): React.ReactNode => {
  const childrenArray = Array.isArray(children) ? children : [children];
  const contentEl: React.ReactElement<CarouselContentProps> =
    childrenArray.find(
      (element) => isValidElement(element) && element.type === CarouselContent
    );
  const contentElChildren = contentEl.props.children;
  const contentElChildrenArray = Array.isArray(contentElChildren)
    ? contentElChildren
    : [contentElChildren];

  const newSlides = [
    ...itemsAddedToFront,
    ...contentElChildrenArray,
    ...itemsAddedToBack
  ];

  return [...childrenArray].map((element) =>
    isValidElement(element) && element.type === CarouselContent
      ? { ...element, props: { children: newSlides } }
      : element
  );
};
