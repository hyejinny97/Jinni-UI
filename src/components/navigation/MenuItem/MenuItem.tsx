import './MenuItem.scss';
import React, { forwardRef } from 'react';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { ButtonBase, ButtonBaseProps } from '@/components/general/ButtonBase';

export type MenuItemProps<T extends AsType = 'button'> = ButtonBaseProps<T> & {
  children?: React.ReactNode;
  selected?: boolean;
};

const MenuItem = forwardRef(
  <T extends AsType = 'li'>(
    props: MenuItemProps<T>,
    ref: React.Ref<HTMLLIElement>
  ) => {
    const { children, selected, className, ...rest } = props;

    return (
      <li ref={ref} className={cn('JinniMenuItem', className)} role="none">
        <ButtonBase
          className={cn('JinniMenuItemButton', {
            selected
          })}
          role="menuitem"
          {...rest}
        >
          {children}
        </ButtonBase>
      </li>
    );
  }
);

export default MenuItem;
