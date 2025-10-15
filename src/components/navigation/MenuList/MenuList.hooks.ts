import { useEffect, useRef } from 'react';
import { isAlphabet } from '@/utils/isAlphabet';
import { MenuListProps } from './MenuList';

const INIT_FOCUSED_MENU_ITEM_IDX = -1;

const useKeyboardAccessibility = ({
  children,
  disableAlphabetKeyFocus
}: Pick<MenuListProps, 'children' | 'disableAlphabetKeyFocus'>) => {
  const menuListElRef = useRef<HTMLElement>(null);
  const focusedMenuItemIdxRef = useRef<number>(INIT_FOCUSED_MENU_ITEM_IDX);

  useEffect(() => {
    const menuListEl = menuListElRef.current;
    if (!menuListEl) return;
    const menuItems = menuListEl.querySelectorAll<HTMLElement>(
      'button.JinniMenuItemButton'
    );
    if (menuItems.length === 0) return;

    const focusMenuItem = (menuItemIdxToFocus: number) => {
      menuItems[menuItemIdxToFocus].focus();
      focusedMenuItemIdxRef.current = menuItemIdxToFocus;
    };
    const initFocus = () => {
      focusedMenuItemIdxRef.current = INIT_FOCUSED_MENU_ITEM_IDX;
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (isAlphabet(e.key) && !disableAlphabetKeyFocus) {
        const pressedChar = e.key.toLowerCase();
        const startIdx = (focusedMenuItemIdxRef.current + 1) % menuItems.length;
        const matchIdx = Array.from(menuItems)
          .slice(startIdx)
          .findIndex((item) =>
            item.textContent?.trim().toLowerCase().startsWith(pressedChar)
          );
        const targetIdx =
          matchIdx !== -1
            ? startIdx + matchIdx
            : Array.from(menuItems).findIndex((item) =>
                item.textContent?.trim().toLowerCase().startsWith(pressedChar)
              );

        if (targetIdx !== -1) {
          focusMenuItem(targetIdx);
        }
        return;
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const focusedMenuItemIdx = focusedMenuItemIdxRef.current;
        let nextFocusedMenuItemIdx;
        if (e.key === 'ArrowDown') {
          nextFocusedMenuItemIdx =
            focusedMenuItemIdx === menuItems.length - 1
              ? 0
              : focusedMenuItemIdx + 1;
        } else {
          nextFocusedMenuItemIdx =
            focusedMenuItemIdx === 0
              ? menuItems.length - 1
              : focusedMenuItemIdx - 1;
        }
        focusMenuItem(nextFocusedMenuItemIdx);
      }
    };
    const handleFocus = (e: FocusEvent) => {
      const isFocusedByKeyboard = (e.target as HTMLElement).matches(
        ':focus-visible'
      );
      if (isFocusedByKeyboard) {
        focusMenuItem(0);
      } else {
        initFocus();
      }
    };

    menuListEl.addEventListener('keydown', handleKeydown);
    menuListEl.addEventListener('focus', handleFocus);
    return () => {
      menuListEl.removeEventListener('keydown', handleKeydown);
      menuListEl.removeEventListener('focus', handleFocus);
      initFocus();
    };
  }, [children, disableAlphabetKeyFocus]);

  return { menuListElRef };
};

export default useKeyboardAccessibility;
