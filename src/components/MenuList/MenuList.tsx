'use client';

import './MenuList.scss';
import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import type { ElevationLevelType } from '@/types/elevation';
import { useKeyboardAccessibility } from './MenuList.hooks';
import { isNumber } from '@/utils/isNumber';
import MenuListContext from './MenuList.contexts';
import { mergeRefs } from '@/utils/mergeRefs';

export type MenuListProps<T extends AsType = 'ul'> =
  DefaultComponentProps<T> & {
    children?: React.ReactNode;
    elevation?: ElevationLevelType;
    dense?: boolean;
    disableAlphabetKeyFocus?: boolean;
  };

const MenuList = <T extends AsType = 'ul'>({
  ref,
  ...props
}: MenuListProps<T>) => {
  const {
    children,
    elevation = 3,
    dense,
    disableAlphabetKeyFocus,
    className,
    style,
    as,
    ...rest
  } = props;
  const Component = (as ?? 'ul') as React.ElementType;
  const { menuListElRef } = useKeyboardAccessibility({
    children,
    disableAlphabetKeyFocus
  });
  const newStyle = useStyle(style);

  return (
    <MenuListContext value={{ dense }}>
      <Component
        ref={mergeRefs(ref as React.Ref<HTMLElement>, menuListElRef)}
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
    </MenuListContext>
  );
};

MenuList.displayName = 'MenuList';

export default MenuList;
