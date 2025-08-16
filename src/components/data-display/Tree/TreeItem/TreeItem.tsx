import './TreeItem.scss';
import { useRef, useMemo } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { TreeItemIdType } from './TreeItem.types';
import { Checkbox } from '@/components/data-entry/Checkbox';
import { ArrowDownIcon } from '@/components/icons/ArrowDownIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { useTreeItem, useLayer } from './TreeItem.hooks';
import { toRgbaObject } from '@/utils/colorFormat';
import { LayerContext } from './TreeItem.contexts';

type TreeItemProps<T extends AsType = 'li'> = DefaultComponentProps<T> & {
  children?: React.ReactNode;
  itemId: TreeItemIdType;
  label?: number | string;
  disabled?: boolean;
};

const TreeItem = <T extends AsType = 'li'>(props: TreeItemProps<T>) => {
  const {
    children,
    itemId,
    label = '',
    disabled,
    className,
    style,
    as: Component = 'li',
    ...rest
  } = props;
  const treeItemElRef = useRef<HTMLElement>(null);
  const {
    isSelected,
    isExpanded,
    handleSelect,
    handleExpand,
    selectedItemsValue,
    checkboxSelection,
    expansionTrigger,
    onItemClick
  } = useTreeItem({ itemId });
  const layer = useLayer();
  const { r, g, b } = toRgbaObject('primary-container');
  const newStyle = useStyle({
    '--selected-color': `rgba(${r},${g},${b},0.8)`,
    '--layer': layer,
    ...style
  });

  const indeterminate = useMemo<boolean | undefined>(() => {
    if (!checkboxSelection || isSelected) return false;
    const treeItemEl = treeItemElRef.current;
    if (treeItemEl) {
      const childrenItems =
        treeItemEl.querySelectorAll<HTMLElement>('.JinniTreeItem');
      return [...childrenItems].some((item) => {
        const itemId = item.dataset.itemid;
        return itemId !== undefined
          ? selectedItemsValue.includes(itemId)
          : false;
      });
    }
  }, [checkboxSelection, isSelected, selectedItemsValue]);

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (!checkboxSelection) handleSelect(event, itemId);
    if (children && expansionTrigger === 'content') handleExpand(event, itemId);
    if (onItemClick) onItemClick(event, itemId);
  };

  const expandIcon = isExpanded ? (
    <ArrowDownIcon size={18} />
  ) : (
    <ArrowRightIcon size={18} />
  );

  return (
    <LayerContext.Provider value={layer + 1}>
      <Component
        ref={treeItemElRef}
        className={cn('JinniTreeItem', className)}
        data-itemid={itemId}
        data-selected={isSelected}
        style={newStyle}
        {...rest}
      >
        <div
          className={cn('JinniTreeItemContent', {
            disabled,
            isSelected
          })}
          onClick={handleContentClick}
        >
          <div
            className="JinniTreeItemIconContainer"
            onClick={(event) =>
              !disabled &&
              children &&
              expansionTrigger === 'iconContainer' &&
              handleExpand(event, itemId)
            }
          >
            {children && expandIcon}
          </div>
          {checkboxSelection && (
            <Checkbox
              className="JinniTreeItemCheckbox"
              indeterminate={indeterminate}
              checked={isSelected}
              onChange={(event) => handleSelect(event, itemId)}
              onClick={(event) => event.stopPropagation()}
              disableRipple
              disabled={disabled}
            />
          )}
          <div className="JinniTreeItemLabel">{label}</div>
        </div>
        <ul className={cn('JinniSubTree', { isExpanded })}>{children}</ul>
      </Component>
    </LayerContext.Provider>
  );
};

export default TreeItem;
