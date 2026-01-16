import { isValidElement } from 'react';
import { CarouselContent, CarouselContentProps } from './CarouselContent';
import { CarouselItem } from './CarouselItem';

export const countCarouselItems = (children: React.ReactNode): number => {
  const childrenArray = Array.isArray(children) ? children : [children];
  const contentEl: React.ReactElement<CarouselContentProps> =
    childrenArray.find(
      (element) => isValidElement(element) && element.type === CarouselContent
    );
  const contentElChildren = contentEl.props.children;
  const contentElChildrenArray = Array.isArray(contentElChildren)
    ? contentElChildren
    : [contentElChildren];

  const itemsCount = contentElChildrenArray.filter(
    (element) => isValidElement(element) && element.type === CarouselItem
  ).length;
  return itemsCount;
};
