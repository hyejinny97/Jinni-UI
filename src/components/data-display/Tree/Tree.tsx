import './Tree.scss';
import cn from 'classnames';
import React, { Fragment } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { TreeItem, TreeItemIdType } from './TreeItem';
import {
  useSelect,
  useExpand,
  useTreeItems,
  useKeyboardAccessibility
} from './Tree.hooks';
import { ROOT_TREE_ITEM_ID } from './Tree.constants';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { ArrowDownIcon } from '@/components/icons/ArrowDownIcon';

export type ItemProps = {
  id: TreeItemIdType;
  label: React.ReactNode;
  layer: number;
  leaf: boolean;
  selected: boolean;
  expanded: boolean;
  disabled?: boolean;
  onClick: (event: React.MouseEvent) => void;
};

export type TreeProps<
  MultiSelect extends boolean = false,
  T extends AsType = 'ul'
> = DefaultComponentProps<T> & {
  data: {
    [id: TreeItemIdType]: { label: React.ReactNode; disabled?: boolean };
  };
  treeNodes: {
    [ROOT_TREE_ITEM_ID]: TreeItemIdType[];
    [id: TreeItemIdType]: TreeItemIdType[];
  };
  multiSelect?: MultiSelect;
  defaultSelectedItem?: MultiSelect extends true
    ? TreeItemIdType[]
    : TreeItemIdType;
  selectedItem?: MultiSelect extends true
    ? TreeItemIdType[]
    : TreeItemIdType | null;
  defaultExpandedItems?: TreeItemIdType[];
  expandedItems?: TreeItemIdType[];
  disabledItemsFocusable?: boolean;
  onItemClick?: (
    event: Event | React.SyntheticEvent,
    id: TreeItemIdType
  ) => void;
  onSelectedItemChange?: (
    event: Event | React.SyntheticEvent,
    id: MultiSelect extends true ? TreeItemIdType[] : TreeItemIdType | null
  ) => void;
  onExpandedItemsChange?: (
    event: Event | React.SyntheticEvent,
    id: TreeItemIdType[]
  ) => void;
  onItemExpansionToggle?: (
    event: Event | React.SyntheticEvent,
    id: TreeItemIdType,
    isExpanded: boolean
  ) => void;
  renderTreeItem?: (itemProps: ItemProps) => React.ReactNode;
};

const DefaultTreeItem = (itemProps: ItemProps) => {
  const { leaf, expanded, label, ...rest } = itemProps;
  let icon: React.ReactNode = null;
  if (!leaf) {
    icon = expanded ? (
      <ArrowDownIcon color="on-surface-variant" />
    ) : (
      <ArrowRightIcon color="on-surface-variant" />
    );
  }
  return (
    <TreeItem expanded={expanded} {...rest}>
      <div className="JinniTreeItemIconContainer">{icon}</div>
      <div className="JinniTreeItemContents">{label}</div>
    </TreeItem>
  );
};

const Tree = <MultiSelect extends boolean = false, T extends AsType = 'ul'>(
  props: TreeProps<MultiSelect, T>
) => {
  const {
    data,
    treeNodes,
    multiSelect,
    defaultSelectedItem,
    selectedItem,
    defaultExpandedItems,
    expandedItems,
    disabledItemsFocusable,
    onItemClick,
    onSelectedItemChange,
    onExpandedItemsChange,
    onItemExpansionToggle,
    renderTreeItem = (itemProps: ItemProps) => (
      <DefaultTreeItem {...itemProps} />
    ),
    className,
    style,
    as: Component = 'ul',
    ...rest
  } = props;
  const { selectedValues, handleSelect } = useSelect({
    multiSelect,
    defaultSelectedItem,
    selectedItem,
    onSelectedItemChange
  });
  const { expandedValues, handleExpand } = useExpand({
    defaultExpandedItems,
    expandedItems,
    onExpandedItemsChange,
    onItemExpansionToggle
  });
  const { treeItems } = useTreeItems({
    data,
    treeNodes,
    multiSelect,
    selectedValues,
    expandedValues,
    disabledItemsFocusable,
    handleSelect,
    handleExpand,
    onItemClick
  });
  const { treeElRef } = useKeyboardAccessibility({ disabledItemsFocusable });
  const newStyle = useStyle(style);

  return (
    <Component
      ref={treeElRef}
      role="tree"
      className={cn('JinniTree', className)}
      style={newStyle}
      aria-multiselectable={multiSelect}
      {...rest}
    >
      {treeItems.map((itemProps) => (
        <Fragment key={itemProps.id}>{renderTreeItem(itemProps)}</Fragment>
      ))}
    </Component>
  );
};

export default Tree;
