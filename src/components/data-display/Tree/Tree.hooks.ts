import { useState, useEffect, useRef } from 'react';
import { TreeProps } from './Tree';
import { TreeItemIdType } from './TreeItem';
import { transformToArray } from '@/utils/transformToArray';
import { getDifference } from './Tree.utils';

export const useSelect = <MultiSelect extends boolean>({
  multiSelect,
  defaultSelectedItems,
  selectedItems,
  onSelectedItemsChange,
  checkboxSelection,
  onItemSelectionToggle,
  selectionPropagation,
  disableSelection
}: Pick<
  TreeProps<MultiSelect>,
  | 'multiSelect'
  | 'defaultSelectedItems'
  | 'selectedItems'
  | 'onSelectedItemsChange'
  | 'checkboxSelection'
  | 'onItemSelectionToggle'
  | 'selectionPropagation'
  | 'disableSelection'
>) => {
  const treeElRef = useRef<HTMLElement>(null);
  const isCtrlKeyPressedRef = useRef<boolean>(false);
  const isControlled = selectedItems !== undefined;
  const [uncontrolledSelectedItems, setUncontrolledSelectedItems] = useState<
    TreeItemIdType[]
  >(transformToArray(defaultSelectedItems));
  const selectedItemsValue: TreeItemIdType[] = isControlled
    ? transformToArray(selectedItems)
    : uncontrolledSelectedItems;

  const toggleItem = (
    items: TreeItemIdType[],
    targetItem: TreeItemIdType
  ): TreeItemIdType[] => {
    const alreadySelected = items.includes(targetItem);
    return alreadySelected
      ? items.filter((itemId) => itemId !== targetItem)
      : [...items, targetItem];
  };

  const checkAllChildrenSelected = (
    parentEl: HTMLElement,
    selectedItems: Set<TreeItemIdType>
  ): boolean => {
    const treeItemElList =
      parentEl.querySelectorAll<HTMLElement>('.JinniTreeItem');
    const treeItemIdList = [...treeItemElList]
      .map((treeItemEl) => treeItemEl.dataset.itemid)
      .filter((itemId): itemId is string => Boolean(itemId));
    return treeItemIdList.every((itemId) => selectedItems.has(itemId));
  };

  const changeAllChildrenSelection = (
    parentEl: HTMLElement,
    selectedItems: TreeItemIdType[],
    select: boolean
  ): TreeItemIdType[] => {
    const treeItemElList =
      parentEl.querySelectorAll<HTMLElement>('.JinniTreeItem');
    const treeItemIdList = [...treeItemElList]
      .map((treeItemEl) => treeItemEl.dataset.itemid)
      .filter((itemId): itemId is string => Boolean(itemId));
    const selectedItemsSet = new Set(selectedItems);
    treeItemIdList.forEach((itemId) => {
      if (select) selectedItemsSet.add(itemId);
      else selectedItemsSet.delete(itemId);
    });
    return [...selectedItemsSet];
  };

  const checkPropagation = (
    itemId: TreeItemIdType,
    selectedItemList: TreeItemIdType[]
  ): TreeItemIdType[] => {
    const TreeEl = treeElRef.current;
    const selectedItemEl = TreeEl?.querySelector<HTMLElement>(
      `.JinniTreeItem[data-itemid=${itemId}]`
    );
    if (!selectedItemEl) return selectedItemList;

    let newSelectedItemList: TreeItemIdType[] = [...selectedItemList];
    if (selectionPropagation?.parents) {
      const selectedItemSet = new Set(newSelectedItemList);
      let isPrevAllChildrenSelected: boolean = true;
      const checkParent = (childEl: HTMLElement) => {
        const parentEl =
          childEl.parentElement?.closest<HTMLElement>('.JinniTreeItem');
        if (!parentEl) return;
        const parentTreeItemId = parentEl.dataset.itemid;
        if (!parentTreeItemId) return;

        if (
          isPrevAllChildrenSelected &&
          checkAllChildrenSelected(parentEl, selectedItemSet)
        ) {
          isPrevAllChildrenSelected = true;
          selectedItemSet.add(parentTreeItemId);
        } else {
          isPrevAllChildrenSelected = false;
          selectedItemSet.delete(parentTreeItemId);
        }
        checkParent(parentEl);
      };
      checkParent(selectedItemEl);
      newSelectedItemList = [...selectedItemSet];
    }
    if (selectionPropagation?.descendants) {
      const isSelected = selectedItemList.includes(itemId);
      newSelectedItemList = changeAllChildrenSelection(
        selectedItemEl,
        newSelectedItemList,
        isSelected
      );
    }
    return newSelectedItemList;
  };

  const handleItemSelectionToggle = (
    event: Event | React.SyntheticEvent,
    prevSelectedItems: TreeItemIdType[],
    currentSelectedItems: TreeItemIdType[]
  ): void => {
    if (!onItemSelectionToggle) return;
    const prevSelectedItemsSet = new Set(prevSelectedItems);
    const currentSelectedItemsSet = new Set(currentSelectedItems);
    const unselectedItems = getDifference(
      prevSelectedItemsSet,
      currentSelectedItemsSet
    );
    const selectedItems = getDifference(
      currentSelectedItemsSet,
      prevSelectedItemsSet
    );
    unselectedItems.forEach((item) =>
      onItemSelectionToggle(event, item, false)
    );
    selectedItems.forEach((item) => onItemSelectionToggle(event, item, true));
  };

  const handleSingleSelect = (
    event: Event | React.SyntheticEvent,
    itemId: TreeItemIdType
  ) => {
    let newValue: TreeItemIdType[];
    if (checkboxSelection) {
      const alreadySelected = selectedItemsValue.includes(itemId);
      newValue = alreadySelected ? [] : [itemId];
    } else {
      newValue = [itemId];
    }
    if (!isControlled) setUncontrolledSelectedItems(newValue);
    if (onSelectedItemsChange)
      onSelectedItemsChange(
        event,
        (newValue[0] || null) as MultiSelect extends true
          ? TreeItemIdType[]
          : TreeItemIdType | null
      );
    handleItemSelectionToggle(event, selectedItemsValue, newValue);
  };

  const handleMultiSelect = (
    event: Event | React.SyntheticEvent,
    itemId: TreeItemIdType
  ) => {
    let newValue: TreeItemIdType[];
    if (checkboxSelection) {
      const newSelectedItems = toggleItem(selectedItemsValue, itemId);
      newValue = checkPropagation(itemId, newSelectedItems);
    } else {
      if (isCtrlKeyPressedRef.current) {
        const newSelectedItems = toggleItem(selectedItemsValue, itemId);
        newValue = checkPropagation(itemId, newSelectedItems);
      } else {
        newValue = [itemId];
      }
    }
    if (!isControlled) setUncontrolledSelectedItems(newValue);
    if (onSelectedItemsChange)
      onSelectedItemsChange(
        event,
        newValue as MultiSelect extends true
          ? TreeItemIdType[]
          : TreeItemIdType | null
      );
    handleItemSelectionToggle(event, selectedItemsValue, newValue);
  };

  const handleSelect = (
    event: Event | React.SyntheticEvent,
    itemId: TreeItemIdType
  ) => {
    if (disableSelection) return;
    if (multiSelect) handleMultiSelect(event, itemId);
    else handleSingleSelect(event, itemId);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey) isCtrlKeyPressedRef.current = true;
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      isCtrlKeyPressedRef.current = event.ctrlKey;
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return {
    selectedItemsValue,
    handleSelect,
    treeElRef
  };
};

export const useExpand = ({
  defaultExpandedItems,
  expandedItems,
  onExpandedItemsChange,
  onItemExpansionToggle
}: Pick<
  TreeProps,
  | 'defaultExpandedItems'
  | 'expandedItems'
  | 'onExpandedItemsChange'
  | 'onItemExpansionToggle'
>) => {
  const isControlled = expandedItems !== undefined;
  const [uncontrolledExpandedItems, setUncontrolledExpandedItems] = useState<
    TreeItemIdType[]
  >(defaultExpandedItems || []);
  const expandedItemsValue = isControlled
    ? expandedItems
    : uncontrolledExpandedItems;

  const handleExpand = (
    event: Event | React.SyntheticEvent,
    itemId: TreeItemIdType
  ) => {
    const isExpanded = expandedItemsValue.includes(itemId);
    const newExpandedItems = isExpanded
      ? expandedItemsValue.filter((expandedItemId) => expandedItemId !== itemId)
      : [...expandedItemsValue, itemId];
    if (!isControlled) setUncontrolledExpandedItems(newExpandedItems);
    if (onExpandedItemsChange) onExpandedItemsChange(event, newExpandedItems);
    if (onItemExpansionToggle)
      onItemExpansionToggle(event, itemId, !isExpanded);
  };

  return {
    expandedItemsValue,
    handleExpand
  };
};
