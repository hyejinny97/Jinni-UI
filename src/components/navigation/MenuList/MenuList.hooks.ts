import { useEffect, useState } from 'react';
import { findFirstCharacter } from './MenuList.utils';
import { isAlphabet } from '@/utils/isAlphabet';
import { MenuListProps } from './MenuList';

const INIT_FOCUS_ITEM_ORDER = -1;

const useKeyDown = ({
  children,
  disableAlphabetKeyFocus
}: Pick<MenuListProps, 'children' | 'disableAlphabetKeyFocus'>) => {
  const focusableItemsIdx = children
    .map((element) => !element.props.disabled)
    .reduce(
      (acc: Array<number>, focusable, idx) => (focusable ? [...acc, idx] : acc),
      []
    );
  const focusableItemsNum = focusableItemsIdx.length;
  const [focusOrder, setFocusOrder] = useState(INIT_FOCUS_ITEM_ORDER);

  useEffect(() => {
    const focusableItems = children.filter(
      (element) => !element.props.disabled
    );
    const firstCharacters: Array<string | null> = focusableItems.map(
      (element: JSX.Element) => findFirstCharacter(element)
    );

    const handleKeydown = (e: KeyboardEvent) => {
      if (disableAlphabetKeyFocus) return;
      const pressedKey = e.key;
      if (pressedKey === 'ArrowDown')
        return setFocusOrder(
          (prevOrder) => (prevOrder + 1) % focusableItemsNum
        );
      if (pressedKey === 'ArrowUp')
        return setFocusOrder((prevOrder) =>
          prevOrder === -1
            ? focusableItemsNum - 1
            : (prevOrder - 1 + focusableItemsNum) % focusableItemsNum
        );
      if (isAlphabet(pressedKey)) {
        const uppercaseKey = pressedKey.toUpperCase();
        const uppercaseCharacters = firstCharacters.map((character) =>
          typeof character === 'string' ? character.toUpperCase() : character
        );
        const matchedOrders = uppercaseCharacters.reduce(
          (cul: Array<number>, character, idx) =>
            character === uppercaseKey ? [...cul, idx] : cul,
          []
        );
        if (matchedOrders.length === 0) {
          return setFocusOrder(INIT_FOCUS_ITEM_ORDER);
        }
        return setFocusOrder((prevOrder) => {
          const order = matchedOrders.indexOf(prevOrder);
          return order === -1
            ? matchedOrders[0]
            : matchedOrders[(order + 1) % matchedOrders.length];
        });
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [children, focusableItemsNum, disableAlphabetKeyFocus]);

  return { focusedItemIdx: focusableItemsIdx[focusOrder] };
};

export default useKeyDown;
