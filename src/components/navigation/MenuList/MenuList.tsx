import './MenuList.scss';
import cn from 'classnames';
import { forwardRef } from 'react';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import type { ElevationLevelType } from '@/types/elevation';
import { insertProps } from './MenuList.utils';
import useKeyDown from './MenuList.hooks';

export type MenuListProps<T extends AsType = 'ul'> =
  DefaultComponentProps<T> & {
    children: Array<JSX.Element>;
    elevation?: ElevationLevelType;
    dense?: boolean;
  };

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
    const { focusedItemIdx } = useKeyDown({ children });
    const newStyle = useStyle({ elevation, ...style });

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
