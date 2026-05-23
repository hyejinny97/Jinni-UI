import './MenuItem.scss';
import React, { forwardRef } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { ButtonBase, ButtonBaseProps } from '@/components/general/ButtonBase';
import { useMenuList } from './MenuItem.hooks';
import useJinni from '@/hooks/useJinni';

export type MenuItemProps<T extends AsType = 'button'> = ButtonBaseProps<T> & {
  children?: React.ReactNode;
  selected?: boolean;
};

const MenuItem = forwardRef(
  <T extends AsType = 'li'>(
    props: MenuItemProps<T>,
    ref: React.Ref<HTMLLIElement>
  ) => {
    const { children, selected, className, style, ...rest } = props;
    const { theme } = useJinni();
    const menuListValue = useMenuList();

    return (
      <li ref={ref} className={cn('JinniMenuItem', className)} role="none">
        <ButtonBase
          className={cn('JinniMenuItemButton', {
            selected,
            dense: menuListValue?.dense
          })}
          role="menuitem"
          tabIndex={-1}
          style={{
            '--overlay-color':
              theme === 'light'
                ? 'var(--jinni-black-overlay-5)'
                : 'var(--jinni-white-overlay-8)',
            ...style
          }}
          {...rest}
        >
          {children}
        </ButtonBase>
      </li>
    );
  }
);

export default MenuItem;
