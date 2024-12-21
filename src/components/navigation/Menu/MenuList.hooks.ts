import { useEffect, useState } from 'react';
import { findFirstCharacter } from './MenuList.utils';
import { isAlphabet } from '@/utils/isAlphabet';
import { MenuListProps } from './MenuList';

const INIT_FOCUS_ITEM_ORDER = -1;

const useKeyDown = ({ children }: Pick<MenuListProps, 'children'>) => {
  const focusableItemsIdx = children
    .map((element) => !element.props.disabled)
    .reduce(
      (acc: Array<number>, focusable, idx) => (focusable ? [...acc, idx] : acc),
      []
    );
  const focusableItemsNum = focusableItemsIdx.length;
  const [focusOrder, setFocusOrder] = useState(INIT_FOCUS_ITEM_ORDER);

  useEffect(() => {
    const firstCharacters: Array<string | null> = children
      .filter((element) => !element.props.disabled)
      .map((element: JSX.Element) => findFirstCharacter(element));

    const handleKeydown = (e: KeyboardEvent) => {
      const pressedKey = e.key;
      if (pressedKey === 'ArrowDown')
        return setFocusOrder((prevIdx) => (prevIdx + 1) % focusableItemsNum);
      if (pressedKey === 'ArrowUp')
        return setFocusOrder((prevIdx) =>
          prevIdx === -1
            ? focusableItemsNum - 1
            : (prevIdx - 1 + focusableItemsNum) % focusableItemsNum
        );
      if (isAlphabet(pressedKey)) {
        const uppercaseKey = pressedKey.toUpperCase();
        const uppercaseCharacters = firstCharacters.map((character) =>
          typeof character === 'string' ? character.toUpperCase() : character
        );
        const matchedCharactersIdx = uppercaseCharacters.reduce(
          (cul: Array<number>, character, idx) =>
            character === uppercaseKey ? [...cul, idx] : cul,
          []
        );
        if (matchedCharactersIdx.length === 0) {
          return setFocusOrder(INIT_FOCUS_ITEM_ORDER);
        }
        return setFocusOrder((prevIdx) => {
          const matchedIdx = matchedCharactersIdx.indexOf(prevIdx);
          return matchedIdx === -1
            ? matchedCharactersIdx[0]
            : matchedCharactersIdx[
                (matchedIdx + 1) % matchedCharactersIdx.length
              ];
        });
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [children, focusableItemsNum]);

  return { focusedItemIdx: focusableItemsIdx[focusOrder] };
};

export default useKeyDown;
