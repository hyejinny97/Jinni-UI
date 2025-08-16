import { useContext } from 'react';
import { TreeContext } from '../Tree.contexts';
import { LayerContext } from './TreeItem.contexts';
import { TreeItemIdType } from './TreeItem.types';

export const useTreeItem = ({ itemId }: { itemId: TreeItemIdType }) => {
  const value = useContext(TreeContext);
  if (value === null) throw Error('TreeContext value is null');
  const { selectedItemsValue, expandedItemsValue, ...rest } = value;
  return {
    isSelected: selectedItemsValue.includes(itemId),
    isExpanded: expandedItemsValue.includes(itemId),
    selectedItemsValue,
    ...rest
  };
};

export const useLayer = () => {
  const value = useContext(LayerContext);
  return value;
};
