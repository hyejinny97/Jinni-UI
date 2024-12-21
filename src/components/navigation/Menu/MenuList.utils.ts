import type { MenuItemProps } from './MenuItem';
import { isValidElement } from 'react';

export const insertProps = (
  elements: Array<JSX.Element>,
  props: Pick<MenuItemProps, 'dense'> & {
    focus: (elementIdx: number) => boolean;
  }
): Array<JSX.Element> => {
  return elements.map((element, elementIdx) => ({
    ...element,
    props: {
      ...element.props,
      dense: props.dense,
      focus: props.focus(elementIdx)
    }
  }));
};

export const findFirstCharacter = (element: React.ReactNode): string | null => {
  if (typeof element === 'string') {
    return element.trim().charAt(0) || null;
  }

  if (typeof element === 'number') {
    return String(element).charAt(0);
  }

  if (Array.isArray(element)) {
    for (const child of element) {
      const char = findFirstCharacter(child);
      if (char) return char;
    }
  }

  if (isValidElement(element)) {
    const reactElement = element as React.ReactElement;
    return findFirstCharacter(reactElement.props.children);
  }

  return null;
};
