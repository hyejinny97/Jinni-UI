import './MenuList.scss';
import cn from 'classnames';
import { forwardRef, MutableRefObject } from 'react';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import type { ElevationLevelType } from '@/types/elevation';
import { useKeyboardAccessibility } from './MenuList.hooks';
import { isNumber } from '@/utils/isNumber';
import MenuListContext from './MenuList.contexts';

export type MenuListProps<T extends AsType = 'ul'> =
  DefaultComponentProps<T> & {
    children?: React.ReactNode;
    elevation?: ElevationLevelType;
    dense?: boolean;
    disableAlphabetKeyFocus?: boolean;
  };

const MenuList = forwardRef(
  <T extends AsType = 'ul'>(
    props: MenuListProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const {
      children,
      elevation = 3,
      dense,
      disableAlphabetKeyFocus,
      className,
      style,
      as: Component = 'ul',
      ...rest
    } = props;
    const { menuListElRef } = useKeyboardAccessibility({
      children,
      disableAlphabetKeyFocus
    });
    const newStyle = useStyle(style);

    return (
      <MenuListContext.Provider value={{ dense }}>
        <Component
          ref={(element: HTMLElement | null) => {
            if (element) {
              (menuListElRef as MutableRefObject<HTMLElement>).current =
                element;
              if (typeof ref === 'function') {
                ref(element);
              } else if (ref && 'current' in ref) {
                (ref as MutableRefObject<HTMLElement>).current = element;
              }
            }
          }}
          className={cn(
            'JinniMenuList',
            isNumber(elevation) && `elevation-${elevation}`,
            className
          )}
          style={newStyle}
          role="menu"
          tabIndex={0}
          {...rest}
        >
          {children}
        </Component>
      </MenuListContext.Provider>
    );
  }
);

MenuList.displayName = 'MenuList';

export default MenuList;
