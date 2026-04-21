import { useRef, useMemo, useState, useEffect } from 'react';
import { TreeProps, ItemProps } from './Tree';
import { ROOT_TREE_ITEM_ID } from './Tree.constants';
import { TreeItemIdType } from './TreeItem';
import { transformToArray } from '@/utils/transformToArray';
import { isAlphabet } from '@/utils/isAlphabet';
import { findLastIndex } from '@/utils/findIndex';

type UseSelectProp<MultiSelect extends boolean = false> = Pick<
  TreeProps<MultiSelect>,
  | 'multiSelect'
  | 'defaultSelectedItem'
  | 'selectedItem'
  | 'onSelectedItemChange'
>;

type UseExpandProps = Pick<
  TreeProps,
  | 'defaultExpandedItems'
  | 'expandedItems'
  | 'onExpandedItemsChange'
  | 'onItemExpansionToggle'
>;

type UseTreeItemsProps<MultiSelect extends boolean = false> = Pick<
  TreeProps<MultiSelect>,
  | 'data'
  | 'treeNodes'
  | 'onItemClick'
  | 'multiSelect'
  | 'disabledItemsFocusable'
> & {
  selectedValues: TreeItemIdType[];
  expandedValues: TreeItemIdType[];
  handleSelect: (
    event: Event | React.SyntheticEvent,
    newSelectionInfo: {
      [id: TreeItemIdType]: boolean;
    }
  ) => void;
  handleExpand: (
    event: Event | React.SyntheticEvent,
    newExpansionInfo: {
      [id: TreeItemIdType]: boolean;
    }
  ) => void;
};

type UseKeyboardAccessibilityProps = Pick<TreeProps, 'disabledItemsFocusable'>;

export const useSelect = <MultiSelect extends boolean = false>({
  multiSelect,
  defaultSelectedItem,
  selectedItem,
  onSelectedItemChange
}: UseSelectProp<MultiSelect>) => {
  const isControlled = selectedItem !== undefined;
  const [uncontrolledSelectedItem, setUncontrolledSelectedItems] = useState<
    TreeItemIdType[]
  >(transformToArray(defaultSelectedItem));
  const selectedValues: TreeItemIdType[] = isControlled
    ? transformToArray(selectedItem)
    : uncontrolledSelectedItem;

  const handleSelect = (
    event: Event | React.SyntheticEvent,
    newSelectionInfo: { [id: TreeItemIdType]: boolean }
  ) => {
    const newSelectedValuesSet = new Set([...selectedValues]);
    Object.entries(newSelectionInfo).forEach(([id, selected]) => {
      if (selected) {
        newSelectedValuesSet.add(id);
      } else {
        newSelectedValuesSet.delete(id);
      }
    });
    const newSelectedValuesArr = [...newSelectedValuesSet];
    if (!isControlled) setUncontrolledSelectedItems(newSelectedValuesArr);
    if (onSelectedItemChange)
      onSelectedItemChange(
        event,
        (multiSelect
          ? newSelectedValuesArr
          : newSelectedValuesArr[0] || null) as MultiSelect extends true
          ? TreeItemIdType[]
          : TreeItemIdType | null
      );
  };

  return {
    selectedValues,
    handleSelect
  };
};

export const useExpand = ({
  defaultExpandedItems,
  expandedItems,
  onExpandedItemsChange,
  onItemExpansionToggle
}: UseExpandProps) => {
  const isControlled = expandedItems !== undefined;
  const [uncontrolledExpandedItems, setUncontrolledExpandedItems] = useState<
    TreeItemIdType[]
  >(defaultExpandedItems || []);
  const expandedValues = isControlled
    ? expandedItems
    : uncontrolledExpandedItems;

  const handleExpand = (
    event: Event | React.SyntheticEvent,
    newExpansionInfo: { [id: TreeItemIdType]: boolean }
  ) => {
    const newExpandedValuesSet = new Set([...expandedValues]);
    Object.entries(newExpansionInfo).forEach(([id, expanded]) => {
      if (expanded) {
        newExpandedValuesSet.add(id);
      } else {
        newExpandedValuesSet.delete(id);
      }
      onItemExpansionToggle?.(event, id, expanded);
    });
    const newExpandedValuesArr = [...newExpandedValuesSet];
    if (!isControlled) setUncontrolledExpandedItems(newExpandedValuesArr);
    if (onExpandedItemsChange)
      onExpandedItemsChange(event, newExpandedValuesArr);
  };

  return {
    expandedValues,
    handleExpand
  };
};

export const useTreeItems = <MultiSelect extends boolean = false>({
  data,
  treeNodes,
  multiSelect,
  selectedValues,
  expandedValues,
  disabledItemsFocusable,
  handleSelect,
  handleExpand,
  onItemClick
}: UseTreeItemsProps<MultiSelect>) => {
  const isCtrlPressedRef = useRef<boolean>(false);
  const isShiftPressedRef = useRef<boolean>(false);
  const lastSelectedItemIdRef = useRef<TreeItemIdType | null>(null);
  const prevSerialSelectedItemsByShiftRef = useRef<TreeItemIdType[]>([]);

  const { flattenTree, layerTable, ancestorsTable } = useMemo<{
    flattenTree: TreeItemIdType[];
    layerTable: { [id: TreeItemIdType]: number };
    ancestorsTable: { [id: TreeItemIdType]: TreeItemIdType[] };
  }>(() => {
    const layerTable: { [id: TreeItemIdType]: number } = {};
    const ancestorsTable: { [id: TreeItemIdType]: TreeItemIdType[] } = {};
    const dfs = (
      node: TreeItemIdType,
      layer: number,
      ancestors?: TreeItemIdType[]
    ): TreeItemIdType[] => {
      const result = [node];
      layerTable[node] = layer;
      if (treeNodes[node]) {
        for (const childNode of treeNodes[node]) {
          const currentAncestors = ancestors ? [...ancestors, node] : [];
          ancestorsTable[childNode] = currentAncestors;
          result.push(...dfs(childNode, layer + 1, currentAncestors));
        }
      }
      return result;
    };
    const flattenTree = dfs(ROOT_TREE_ITEM_ID, -1);
    flattenTree.shift();
    delete layerTable[ROOT_TREE_ITEM_ID];
    return {
      flattenTree,
      layerTable,
      ancestorsTable
    };
  }, [treeNodes]);

  const displayedItems = useMemo<TreeItemIdType[]>(() => {
    return flattenTree.filter((treeItemId) => {
      const isFirstLayer = treeNodes[ROOT_TREE_ITEM_ID].includes(treeItemId);
      const isAllAncestorExpanded = ancestorsTable[treeItemId].every(
        (ancestorId) => expandedValues.includes(ancestorId)
      );
      return isFirstLayer || isAllAncestorExpanded;
    });
  }, [treeNodes, expandedValues, flattenTree, ancestorsTable]);

  const treeItems = useMemo<ItemProps[]>(() => {
    const firstItemIdFocusable = disabledItemsFocusable
      ? displayedItems[0]
      : displayedItems.find((itemId) => !data[itemId].disabled);
    return displayedItems.map((treeItemId) => {
      const { label, disabled } = data[treeItemId];
      const selected = selectedValues.includes(treeItemId);
      const expanded = expandedValues.includes(treeItemId);
      const leaf = !treeNodes[treeItemId];
      return {
        id: treeItemId,
        label,
        layer: layerTable[treeItemId],
        leaf,
        selected,
        expanded,
        disabled,
        tabIndex: treeItemId === firstItemIdFocusable ? 0 : -1,
        onClick: (event: React.MouseEvent) => {
          const isCtrlPressed = isCtrlPressedRef.current;
          const isShiftPressed = isShiftPressedRef.current;
          const lastSelectedItemId = lastSelectedItemIdRef.current;
          const newSelectionInfo: { [id: TreeItemIdType]: boolean } = {};

          if (multiSelect && isShiftPressed) {
            if (lastSelectedItemId === null) {
              newSelectionInfo[treeItemId] = true;
            } else {
              prevSerialSelectedItemsByShiftRef.current.forEach((id) => {
                newSelectionInfo[id] = false;
              });

              let clickedItemIdx = -1;
              let lastSelectedItemIdx = -1;
              for (let idx = 0; idx < displayedItems.length; idx++) {
                if (clickedItemIdx !== -1 && lastSelectedItemIdx !== -1) break;
                const id = displayedItems[idx];
                if (id === treeItemId) clickedItemIdx = idx;
                if (id === lastSelectedItemId) lastSelectedItemIdx = idx;
              }
              const start = Math.min(clickedItemIdx, lastSelectedItemIdx);
              const end = Math.max(clickedItemIdx, lastSelectedItemIdx);
              const itemsToSelected = displayedItems.slice(start, end + 1);
              itemsToSelected.forEach((id) => {
                newSelectionInfo[id] = true;
              });

              prevSerialSelectedItemsByShiftRef.current = itemsToSelected;
            }
          } else if (multiSelect && isCtrlPressed) {
            newSelectionInfo[treeItemId] = !selected;
          } else {
            selectedValues.forEach((selectedItemId) => {
              newSelectionInfo[selectedItemId] = false;
            });
            newSelectionInfo[treeItemId] = true;
          }

          if (!(multiSelect && isShiftPressed && lastSelectedItemId !== null)) {
            lastSelectedItemIdRef.current = treeItemId;
            prevSerialSelectedItemsByShiftRef.current = [];
          }

          onItemClick?.(event, treeItemId);
          handleSelect(event, newSelectionInfo);

          if (
            leaf ||
            (expanded && multiSelect && (isShiftPressed || isCtrlPressed))
          )
            return;
          handleExpand(event, { [treeItemId]: !expanded });
        }
      };
    });
  }, [
    data,
    treeNodes,
    multiSelect,
    selectedValues,
    expandedValues,
    disabledItemsFocusable,
    layerTable,
    displayedItems,
    handleSelect,
    handleExpand,
    onItemClick
  ]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey) isCtrlPressedRef.current = true;
      if (event.shiftKey) isShiftPressedRef.current = true;
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      if (!event.ctrlKey) isCtrlPressedRef.current = false;
      if (!event.shiftKey) isShiftPressedRef.current = false;
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return { treeItems };
};

export const useKeyboardAccessibility = ({
  disabledItemsFocusable
}: UseKeyboardAccessibilityProps) => {
  const treeElRef = useRef<HTMLElement>(null);
  const treeItemElListRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const treeEl = treeElRef.current;
    if (!treeEl) return;

    const findTreeItemElList = () => {
      treeItemElListRef.current = Array.from(
        treeEl.querySelectorAll<HTMLElement>(
          disabledItemsFocusable
            ? '.JinniTreeItem'
            : '.JinniTreeItem:not(.disabled)'
        )
      );
    };
    const handleMouseDown = (event: KeyboardEvent) => {
      const focusedElement = document.activeElement as HTMLElement;
      if (!focusedElement || !treeEl.contains(focusedElement)) return;

      if (event.key === 'Enter' || event.key === 'Space') {
        if (!focusedElement.dataset.disabled) focusedElement.click();
        return;
      }

      const treeItemElList = treeItemElListRef.current;
      const focusedItemIdx = treeItemElList.findIndex(
        (itemEl) => itemEl === focusedElement
      );
      if (focusedItemIdx === -1) return;

      let nextTreeItemIdxToFocus: number = -1;
      switch (event.key) {
        case 'ArrowDown': {
          nextTreeItemIdxToFocus = Math.min(
            focusedItemIdx + 1,
            treeItemElList.length - 1
          );
          break;
        }
        case 'ArrowUp': {
          nextTreeItemIdxToFocus = Math.max(focusedItemIdx - 1, 0);
          break;
        }
        default: {
          if (isAlphabet(event.key)) {
            const lastMatchedItemIdx = findLastIndex(
              treeItemElList,
              (itemEl) => !!itemEl.dataset.id?.startsWith(event.key)
            );
            nextTreeItemIdxToFocus = treeItemElList.findIndex(
              (itemEl, itemIdx) => {
                const matched = itemEl.dataset.id?.startsWith(event.key);
                if (matched) {
                  if (focusedItemIdx === lastMatchedItemIdx) {
                    return true;
                  } else {
                    return focusedItemIdx < itemIdx;
                  }
                }
                return false;
              }
            );
          }
        }
      }

      if (nextTreeItemIdxToFocus !== -1) {
        event.preventDefault();
        const nextTreeItemToFocused = treeItemElList[nextTreeItemIdxToFocus];
        nextTreeItemToFocused.focus();
      }
    };

    treeEl.addEventListener('keydown', handleMouseDown);
    findTreeItemElList();
    const observer = new MutationObserver(findTreeItemElList);
    observer.observe(treeEl, { childList: true, subtree: true });
    return () => {
      treeEl.removeEventListener('keydown', handleMouseDown);
      observer.disconnect();
    };
  }, [disabledItemsFocusable]);

  return { treeElRef };
};
