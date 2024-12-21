import './MenuList.scss';
import cn from 'classnames';
import { forwardRef, useEffect, useState } from 'react';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import type { ElevationLevelType } from '@/types/elevation';
import { insertProps } from './MenuList.utils';
import { findFirstCharacter } from './MenuList.utils';
import { isAlphabet } from '@/utils/isAlphabet';

export type MenuListProps<T extends AsType = 'ul'> =
  DefaultComponentProps<T> & {
    children: Array<JSX.Element>;
    elevation?: ElevationLevelType;
    dense?: boolean;
  };

const INIT_FOCUS_ITEM_IDX = -1;

const MenuList = forwardRef(
  <T extends AsType = 'ul'>(
    props: MenuListProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      children,
      elevation = 3,
      dense = false,
      className,
      style,
      as: Component = 'ul',
      ...rest
    } = props;
    const newStyle = useStyle({ elevation, ...style });
    const [focusedItemIdx, setFocusedItemIdx] = useState(INIT_FOCUS_ITEM_IDX);

    useEffect(() => {
      const totalItems = children.length;
      const firstCharacters: Array<string | null> = children.map(
        (element: JSX.Element) => findFirstCharacter(element)
      );

      const handleKeydown = (e: KeyboardEvent) => {
        const pressedKey = e.key;
        if (pressedKey === 'ArrowDown')
          return setFocusedItemIdx((prevIdx) => (prevIdx + 1) % totalItems);
        if (pressedKey === 'ArrowUp')
          return setFocusedItemIdx((prevIdx) =>
            prevIdx === -1
              ? totalItems - 1
              : (prevIdx - 1 + totalItems) % totalItems
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
            return setFocusedItemIdx(INIT_FOCUS_ITEM_IDX);
          }
          return setFocusedItemIdx((prevIdx) => {
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
    }, [children]);

    return (
      <Component
        ref={ref}
        className={cn('JinniMenuList', className)}
        style={newStyle}
        {...rest}
      >
        {insertProps(children, {
          dense,
          focus: (elementIdx: number) => focusedItemIdx === elementIdx
        })}
      </Component>
    );
  }
);

MenuList.displayName = 'MenuList';

export default MenuList;
