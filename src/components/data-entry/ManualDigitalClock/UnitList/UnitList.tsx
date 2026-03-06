import './UnitList.scss';
import cn from 'classnames';
import { useRef, useLayoutEffect, useEffect, useCallback } from 'react';
import { Box } from '@/components/layout/Box';
import { MenuList } from '@/components/navigation/MenuList';
import { MenuItem } from '@/components/navigation/MenuItem';
import { UnitItemType } from '../ManualDigitalClock.types';

type UnitListProps = {
  items: UnitItemType[];
  onClick: (itemId: number) => void;
};

const UnitList = ({ items, onClick }: UnitListProps) => {
  const menuListElRef = useRef<HTMLElement>(null);
  const menuItemsElRef = useRef<Map<number, HTMLElement>>(new Map());

  const scrollToSelected = useCallback(
    ({ behavior }: { behavior: ScrollBehavior }) => {
      const menuListEl = menuListElRef.current;
      const menuItemsEl = menuItemsElRef.current;
      if (!menuListEl || !menuItemsEl) return;

      const selectedItem = items.find((item) => item.selected);
      if (selectedItem === undefined) return;

      const selectedItemEl = menuItemsEl.get(selectedItem.id);
      menuListEl.scrollTo({
        top: selectedItemEl?.offsetTop,
        behavior
      });
    },
    [items]
  );

  useLayoutEffect(() => {
    scrollToSelected({ behavior: 'instant' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollToSelected({ behavior: 'smooth' });
  }, [scrollToSelected]);

  return (
    <Box className="JinniUnitList">
      <MenuList ref={menuListElRef} elevation={0}>
        {items.map(({ id, label, selected, disabled, hide }) => (
          <MenuItem
            key={id}
            ref={(element) => {
              if (element && !menuItemsElRef.current.has(id)) {
                menuItemsElRef.current.set(id, element);
              }
            }}
            className={cn({ selected, hide })}
            onClick={() => onClick(id)}
            disabled={disabled}
          >
            {label}
          </MenuItem>
        ))}
      </MenuList>
    </Box>
  );
};

export default UnitList;
