import './MenuItem.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import ButtonBase, { ButtonBaseProps } from '@/components/ButtonBase';
import { useMenuList } from './MenuItem.hooks';
import useJinni from '@/hooks/useJinni';

export type MenuItemProps<T extends AsType = 'button'> = Omit<
  ButtonBaseProps<T>,
  'ref'
> & {
  children?: React.ReactNode;
  selected?: boolean;
  ref?: React.Ref<HTMLLIElement>;
};

const MenuItem = <T extends AsType = 'li'>({
  ref,
  ...props
}: MenuItemProps<T>) => {
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
        {...(rest as ButtonBaseProps<T>)}
      >
        {children}
      </ButtonBase>
    </li>
  );
};

export default MenuItem;
