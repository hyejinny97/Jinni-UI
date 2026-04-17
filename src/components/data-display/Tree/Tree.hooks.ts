import { useRef, useMemo, useState, useEffect } from 'react';
import { TreeProps, ItemProps } from './Tree';
import { ROOT_TREE_ITEM_ID } from './Tree.constants';
import { TreeItemIdType } from './TreeItem';
import { transformToArray } from '@/utils/transformToArray';

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
  'data' | 'treeNodes' | 'onItemClick' | 'multiSelect'
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
    layerTable,
    displayedItems,
    handleSelect,
    handleExpand,
    onItemClick
  ]);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (event.ctrlKey) isCtrlPressedRef.current = true;
      if (event.shiftKey) isShiftPressedRef.current = true;
    };
    const handleMouseUp = (event: MouseEvent) => {
      if (!event.ctrlKey) isCtrlPressedRef.current = false;
      if (!event.shiftKey) isShiftPressedRef.current = false;
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return { treeItems };
};
