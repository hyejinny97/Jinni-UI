import './Tree.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { TreeItemIdType } from './TreeItem';
import { useSelect, useExpand } from './Tree.hooks';
import { TreeContext } from './Tree.contexts';

export type TreeProps<
  MultiSelect extends boolean = false,
  T extends AsType = 'ul'
> = DefaultComponentProps<T> & {
  children: React.ReactNode;
  onItemClick?: (
    event: Event | React.SyntheticEvent,
    itemId: TreeItemIdType
  ) => void;
  multiSelect?: MultiSelect;
  defaultSelectedItems?: MultiSelect extends true
    ? TreeItemIdType[]
    : TreeItemIdType;
  selectedItems?: MultiSelect extends true
    ? TreeItemIdType[]
    : TreeItemIdType | null;
  onSelectedItemsChange?: (
    event: Event | React.SyntheticEvent,
    itemId: MultiSelect extends true ? TreeItemIdType[] : TreeItemIdType | null
  ) => void;
  disableSelection?: boolean;
  checkboxSelection?: boolean;
  onItemSelectionToggle?: (
    event: Event | React.SyntheticEvent,
    itemId: TreeItemIdType,
    isSelected: boolean
  ) => void;
  selectionPropagation?: { parents?: boolean; descendants?: boolean };
  defaultExpandedItems?: TreeItemIdType[];
  expandedItems?: TreeItemIdType[];
  onExpandedItemsChange?: (
    event: Event | React.SyntheticEvent,
    itemId: TreeItemIdType[]
  ) => void;
  onItemExpansionToggle?: (
    event: Event | React.SyntheticEvent,
    itemId: TreeItemIdType,
    isExpanded: boolean
  ) => void;
  expansionTrigger?: 'content' | 'iconContainer';
};

const Tree = <MultiSelect extends boolean = false, T extends AsType = 'ul'>(
  props: TreeProps<MultiSelect, T>
) => {
  const {
    children,
    onItemClick,
    multiSelect,
    defaultSelectedItems,
    selectedItems,
    onSelectedItemsChange,
    disableSelection,
    checkboxSelection = false,
    onItemSelectionToggle,
    selectionPropagation,
    defaultExpandedItems,
    expandedItems,
    onExpandedItemsChange,
    onItemExpansionToggle,
    expansionTrigger = 'content',
    className,
    style,
    as: Component = 'ul',
    ...rest
  } = props;
  const { selectedItemsValue, handleSelect, treeElRef } = useSelect({
    multiSelect,
    defaultSelectedItems,
    selectedItems,
    onSelectedItemsChange,
    onItemSelectionToggle,
    checkboxSelection,
    disableSelection,
    selectionPropagation
  });
  const { expandedItemsValue, handleExpand } = useExpand({
    defaultExpandedItems,
    expandedItems,
    onExpandedItemsChange,
    onItemExpansionToggle
  });
  const newStyle = useStyle(style);

  return (
    <TreeContext.Provider
      value={{
        selectedItemsValue,
        handleSelect,
        expandedItemsValue,
        handleExpand,
        checkboxSelection,
        expansionTrigger,
        onItemClick
      }}
    >
      <Component
        ref={treeElRef}
        className={cn('JinniTree', className)}
        style={newStyle}
        {...rest}
      >
        {children}
      </Component>
    </TreeContext.Provider>
  );
};

export default Tree;
