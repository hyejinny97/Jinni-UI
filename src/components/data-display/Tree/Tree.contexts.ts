import { createContext } from 'react';
import { TreeItemIdType } from './TreeItem';
import { TreeProps } from './Tree';

type TreeContextType = {
  selectedItemsValue: TreeItemIdType[];
  handleSelect: (
    event: Event | React.SyntheticEvent,
    itemId: TreeItemIdType
  ) => void;
  expandedItemsValue: TreeItemIdType[];
  handleExpand: (
    event: Event | React.SyntheticEvent,
    itemId: TreeItemIdType
  ) => void;
} & Required<Pick<TreeProps, 'checkboxSelection' | 'expansionTrigger'>> &
  Pick<TreeProps, 'onItemClick'>;

export const TreeContext = createContext<TreeContextType | null>(null);
