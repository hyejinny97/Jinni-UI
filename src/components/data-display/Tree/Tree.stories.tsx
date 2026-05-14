import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Tree, TreeItem, TreeItemIdType, TreeProps } from '.';
import { Box } from '@/components/layout/Box';
import { Text } from '@/components/general/Text';
import { Stack } from '@/components/layout/Stack';
import { Checkbox } from '@/components/data-entry/Checkbox';
import { Switch } from '@/components/data-entry/Switch';
import { Label } from '@/components/data-entry/Label';
import { CircularProgress } from '@/components/feedback/CircularProgress';
import { Button } from '@/components/general/Button';
import { Divider } from '@/components/layout/Divider';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { ArrowDownIcon } from '@/components/icons/ArrowDownIcon';
import { MailIcon } from '@/components/icons/MailIcon';
import { TrashcanIcon } from '@/components/icons/TrashcanIcon';
import { PersonIcon } from '@/components/icons/PersonIcon';
import { BookmarkIcon } from '@/components/icons/BookmarkIcon';
import { FavoriteIcon } from '@/components/icons/FavoriteIcon';

const meta: Meta<typeof Tree> = {
  component: Tree,
  argTypes: {
    data: {
      description: 'tree item에 관한 정보',
      table: {
        type: {
          summary:
            '{ [id: string | number]: { label: React.ReactNode; disabled?: boolean; } }'
        }
      }
    },
    defaultExpandedItems: {
      description: '초기 expanded items',
      table: {
        type: { summary: 'Array<string | number>' }
      }
    },
    defaultSelectedItem: {
      description: '초기 selected item',
      table: {
        type: {
          summary: `multiSelect = 'true' ? Array<string | number> : string | number`
        }
      }
    },
    disabledItemsFocusable: {
      description: 'true이면, disabled tree item은 focus 가능함',
      table: {
        type: {
          summary: `boolean`
        }
      }
    },
    expandedItems: {
      description: 'expanded items',
      table: {
        type: {
          summary: `Array<string | number>`
        }
      }
    },
    multiSelect: {
      description: 'true이면, 다중 select이 가능함',
      table: {
        type: {
          summary: `boolean`
        }
      }
    },
    onExpandedItemsChange: {
      description: 'expanded items가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(event: Event, id: Array<string | number>) => void;`
        }
      }
    },
    onItemClick: {
      description: 'TreeItem을 클릭했을 때 호출되는 함수',
      table: {
        type: {
          summary: `(event: React.MouseEvent, id: string | number) => void;`
        }
      }
    },
    onItemExpansionToggle: {
      description: 'TreeItem이 collapse되거나 expand될 때 호출되는 함수',
      table: {
        type: {
          summary: `(event: Event, id: string | number, isExpanded: boolean) => void;`
        }
      }
    },
    onSelectedItemChange: {
      description: 'selected item에 변화가 있을 때 호출되는 함수',
      table: {
        type: {
          summary: `(event: Event, id: multiSelect === 'true' ? Array<string | number> : string | number | null) => void;`
        }
      }
    },

    renderTreeItem: {
      description: 'itemProps를 입력 받아 TreeItem를 렌더하는 함수',
      table: {
        type: {
          summary: `(itemProps: {
	id: string | number;
	label: React.ReactNode; 
	disabled?: boolean;
	layer: number; 
	leaf: boolean; 
	expanded: boolean; 
	selected: boolean; 
	onClick?: (event: MouseEvent) => void;
}) => React.ReactNode;`
        },
        defaultValue: {
          summary: `(itemProps: ItemProps) => {
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
};`
        }
      }
    },
    selectedItem: {
      description: 'selected item',
      table: {
        type: {
          summary: `multiSelect = 'true' ? Array<string | number> : string | number | null`
        }
      }
    },
    treeNodes: {
      description: 'tree 구조',
      table: {
        type: {
          summary: `{ 'root': Array<string | number>, [id: string | number]: Array<string | number> }`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Tree>;

const CustomLabel = ({
  icon,
  label,
  count
}: {
  icon: React.ReactNode;
  label: string;
  count?: number;
}) => {
  return (
    <Stack direction="row" spacing={10} style={{ alignItems: 'center' }}>
      {icon}
      <Text className="typo-label-medium" style={{ flex: 1 }}>
        {label}
      </Text>
      <Text
        className="typo-label-small"
        style={{ color: 'on-surface-variant' }}
      >
        {count}
      </Text>
    </Stack>
  );
};

const DATA: TreeProps['data'] = {
  news: { label: 'News' },
  weather: { label: 'Weather' },
  sports: { label: 'Sports' },
  baseball: { label: 'Baseball' },
  tenis: { label: 'Tenis' },
  entertainment: { label: 'Entertainment' },
  shopping: { label: 'Shopping' },
  store: { label: 'Store' },
  shoppinglive: { label: 'Shopping-Live' },
  tool: { label: 'Tool' },
  email: { label: 'Email' },
  calendar: { label: 'Calendar' }
};

const DATA_WITH_DISABLED: TreeProps['data'] = {
  news: { label: 'News' },
  weather: { label: 'Weather' },
  sports: { label: 'Sports' },
  baseball: { label: 'Baseball' },
  tenis: { label: 'Tenis' },
  entertainment: { label: 'Entertainment', disabled: true },
  shopping: { label: 'Shopping' },
  store: { label: 'Store' },
  shoppinglive: { label: 'Shopping-Live' },
  tool: { label: 'Tool', disabled: true },
  email: { label: 'Email' },
  calendar: { label: 'Calendar' }
};

const MANY_DATA: TreeProps['data'] = {
  listA: { label: 'List A' },
  listB: { label: 'List B' },
  listC: { label: 'List C' },
  item1: { label: 'Item 1' },
  item2: { label: 'Item 2' },
  item3: { label: 'Item 3' },
  item4: { label: 'Item 4' },
  item5: { label: 'Item 5' },
  item6: { label: 'Item 6' },
  item7: { label: 'Item 7' },
  item8: { label: 'Item 8' },
  item9: { label: 'Item 9' },
  item10: { label: 'Item 10' },
  item11: { label: 'Item 11' },
  item12: { label: 'Item 12' },
  item13: { label: 'Item 13' },
  item14: { label: 'Item 14' },
  item15: { label: 'Item 15' }
};

const DATA_WITH_NODE_LABEL: TreeProps['data'] = {
  mail: {
    label: (
      <CustomLabel
        label="Mail"
        icon={<MailIcon size={20} color="on-surface-variant" />}
      />
    )
  },
  trash: {
    label: (
      <CustomLabel
        label="Trash"
        icon={<TrashcanIcon size={20} color="on-surface-variant" />}
      />
    )
  },
  myPage: {
    label: (
      <CustomLabel
        label="My Page"
        icon={<PersonIcon size={20} color="on-surface-variant" />}
      />
    )
  },
  bookmark: {
    label: (
      <CustomLabel
        label="Bookmarks"
        icon={<BookmarkIcon size={20} color="on-surface-variant" />}
        count={55}
      />
    )
  },
  favorite: {
    label: (
      <CustomLabel
        label="Favorite"
        icon={<FavoriteIcon size={20} color="on-surface-variant" />}
        count={13}
      />
    )
  }
};

const TREE_NODES: TreeProps['treeNodes'] = {
  root: ['news', 'shopping', 'tool'],
  news: ['weather', 'sports', 'entertainment'],
  sports: ['baseball', 'tenis'],
  shopping: ['store', 'shoppinglive'],
  tool: ['email', 'calendar']
};

const MANY_TREE_NODES: TreeProps['treeNodes'] = {
  root: ['listA', 'listB', 'listC'],
  listA: ['item1', 'item2', 'item3', 'item4', 'item5'],
  listB: ['item6', 'item7', 'item8', 'item9', 'item10'],
  listC: ['item11', 'item12', 'item13', 'item14', 'item15']
};

const ICON_LABEL_TREE_NODES: TreeProps['treeNodes'] = {
  root: ['mail', 'trash', 'myPage'],
  myPage: ['bookmark', 'favorite']
};

const TrackItemClickTemplate = () => {
  const [clickedItem, setClickedItem] = useState<TreeItemIdType | null>(null);

  const handleItemClick = (
    _: Event | React.SyntheticEvent,
    id: TreeItemIdType
  ) => {
    setClickedItem(id);
  };

  return (
    <Stack spacing={20}>
      <Text noMargin style={{ color: 'on-surface' }}>
        Clicked item: {clickedItem}
      </Text>
      <Box style={{ width: '300px' }}>
        <Tree
          data={DATA}
          treeNodes={TREE_NODES}
          onItemClick={handleItemClick}
        />
      </Box>
    </Stack>
  );
};

const ControlledSelectionTemplate = () => {
  const [selectedItem, setSelectedItem] = useState<TreeItemIdType | null>(null);

  const handleSelect = (
    _: Event | React.SyntheticEvent,
    id: TreeItemIdType | null
  ) => {
    setSelectedItem(id);
  };

  return (
    <Stack spacing={20}>
      <Text noMargin style={{ color: 'on-surface' }}>
        Selected item: {selectedItem}
      </Text>
      <Box style={{ width: '300px' }}>
        <Tree
          data={DATA}
          treeNodes={TREE_NODES}
          selectedItem={selectedItem}
          onSelectedItemChange={handleSelect}
        />
      </Box>
    </Stack>
  );
};

const DisableSelectionExpandableTreeItemsTemplate = () => {
  const [selectedItem, setSelectedItem] = useState<TreeItemIdType | null>(null);

  const handleSelect = (
    _: Event | React.SyntheticEvent,
    id: TreeItemIdType | null
  ) => {
    const isLeafNode = !Object.keys(TREE_NODES).some((node) => node === id);
    if (isLeafNode) {
      setSelectedItem(id);
    }
  };

  return (
    <Box style={{ width: '300px' }}>
      <Tree
        data={DATA}
        treeNodes={TREE_NODES}
        selectedItem={selectedItem}
        onSelectedItemChange={handleSelect}
      />
    </Box>
  );
};

const CheckboxSelectionTemplate = () => {
  const [selectedItems, setSelectedItems] = useState<TreeItemIdType[]>([]);

  const handleSelect = (id: TreeItemIdType) => {
    if (selectedItems.includes(id)) {
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems((prev) => [...prev, id]);
    }
  };

  return (
    <Box style={{ width: '300px' }}>
      <Tree
        data={DATA}
        treeNodes={TREE_NODES}
        multiSelect
        selectedItem={selectedItems}
        renderTreeItem={(itemProps) => {
          const { id, leaf, expanded, label, ...rest } = itemProps;
          let icon: React.ReactNode = null;
          if (!leaf) {
            icon = expanded ? (
              <ArrowDownIcon color="on-surface-variant" />
            ) : (
              <ArrowRightIcon color="on-surface-variant" />
            );
          }
          const isChildNodeSelected =
            !leaf &&
            TREE_NODES[id].some((childNode) =>
              selectedItems.includes(childNode)
            );
          return (
            <TreeItem id={id} expanded={expanded} {...rest}>
              <div className="JinniTreeItemIconContainer">{icon}</div>
              <div
                className="JinniTreeItemContents"
                style={{ display: 'inline-flex', alignItems: 'center' }}
              >
                <Checkbox
                  indeterminate={isChildNodeSelected}
                  checked={selectedItems.includes(id)}
                  onChange={() => handleSelect(id)}
                />
                {label}
              </div>
            </TreeItem>
          );
        }}
      />
    </Box>
  );
};

const PropagateSelectionFromParentsToDescendantsTemplate = () => {
  const [selectedItems, setSelectedItems] = useState<TreeItemIdType[]>([]);

  const dfs = (node: TreeItemIdType): TreeItemIdType[] => {
    const result = [node];
    if (TREE_NODES[node]) {
      for (const childNode of TREE_NODES[node]) {
        result.push(...dfs(childNode));
      }
    }
    return result;
  };

  const handleSelect = (id: TreeItemIdType, leaf: boolean) => {
    const alreadySelected = selectedItems.includes(id);
    const itemsToChange: TreeItemIdType[] = [id];
    if (!leaf) {
      itemsToChange.push(...dfs(id));
    }

    const selectedItemsSet = new Set(selectedItems);
    itemsToChange.forEach((item) => {
      if (alreadySelected) {
        selectedItemsSet.delete(item);
      } else {
        selectedItemsSet.add(item);
      }
    });
    setSelectedItems([...selectedItemsSet]);
  };

  return (
    <Box style={{ width: '300px' }}>
      <Tree
        data={DATA}
        treeNodes={TREE_NODES}
        multiSelect
        selectedItem={selectedItems}
        renderTreeItem={(itemProps) => {
          const { id, leaf, expanded, label, ...rest } = itemProps;
          let icon: React.ReactNode = null;
          if (!leaf) {
            icon = expanded ? (
              <ArrowDownIcon color="on-surface-variant" />
            ) : (
              <ArrowRightIcon color="on-surface-variant" />
            );
          }
          return (
            <TreeItem id={id} expanded={expanded} {...rest}>
              <div className="JinniTreeItemIconContainer">{icon}</div>
              <div
                className="JinniTreeItemContents"
                style={{ display: 'inline-flex', alignItems: 'center' }}
              >
                <Checkbox
                  checked={selectedItems.includes(id)}
                  onChange={() => handleSelect(id, leaf)}
                />
                {label}
              </div>
            </TreeItem>
          );
        }}
      />
    </Box>
  );
};

const PropagateSelectionFromDescendantsToParentsTemplate = () => {
  const [selectedItems, setSelectedItems] = useState<TreeItemIdType[]>([]);
  const ancestorsTable = useMemo<{
    [id: TreeItemIdType]: TreeItemIdType[];
  }>(() => {
    const ancestorTable: { [id: TreeItemIdType]: TreeItemIdType[] } = {};
    const dfs = (node: TreeItemIdType, ancestors?: TreeItemIdType[]) => {
      for (const child of TREE_NODES[node] ?? []) {
        const currentAncestors = ancestors ? [node, ...ancestors] : [];
        ancestorTable[child] = currentAncestors;
        dfs(child, currentAncestors);
      }
    };
    dfs('root');
    return ancestorTable;
  }, []);

  const isAllDescendantsSelected = (
    parentNode: TreeItemIdType,
    selectedNodes: TreeItemIdType[]
  ): boolean => {
    return (TREE_NODES[parentNode] ?? []).every(
      (child) =>
        selectedNodes.includes(child) &&
        isAllDescendantsSelected(child, selectedNodes)
    );
  };

  const handleSelect = (id: TreeItemIdType) => {
    const ancestors = ancestorsTable[id];
    const alreadySelected = selectedItems.includes(id);
    const itemsToAdd: TreeItemIdType[] = [];
    const itemsToDelete: TreeItemIdType[] = [];

    if (alreadySelected) {
      itemsToDelete.push(id, ...ancestors);
    } else {
      itemsToAdd.push(id);
      for (const ancestor of ancestors) {
        if (
          isAllDescendantsSelected(ancestor, [...selectedItems, ...itemsToAdd])
        ) {
          itemsToAdd.push(ancestor);
        } else {
          break;
        }
      }
    }

    const selectedItemsSet = new Set(selectedItems);
    itemsToAdd.forEach((item) => {
      selectedItemsSet.add(item);
    });
    itemsToDelete.forEach((item) => {
      selectedItemsSet.delete(item);
    });
    setSelectedItems([...selectedItemsSet]);
  };

  return (
    <Box style={{ width: '300px' }}>
      <Tree
        data={DATA}
        treeNodes={TREE_NODES}
        multiSelect
        selectedItem={selectedItems}
        renderTreeItem={(itemProps) => {
          const { id, leaf, expanded, label, ...rest } = itemProps;
          let icon: React.ReactNode = null;
          if (!leaf) {
            icon = expanded ? (
              <ArrowDownIcon color="on-surface-variant" />
            ) : (
              <ArrowRightIcon color="on-surface-variant" />
            );
          }
          return (
            <TreeItem id={id} expanded={expanded} {...rest}>
              <div className="JinniTreeItemIconContainer">{icon}</div>
              <div
                className="JinniTreeItemContents"
                style={{ display: 'inline-flex', alignItems: 'center' }}
              >
                <Checkbox
                  checked={selectedItems.includes(id)}
                  onChange={() => handleSelect(id)}
                />
                {label}
              </div>
            </TreeItem>
          );
        }}
      />
    </Box>
  );
};

const TrackItemSelectionChangeTemplate = () => {
  const prevSelectedItemsRef = useRef<TreeItemIdType[]>([]);
  const [selectedItems, setSelectedItems] = useState<TreeItemIdType[]>([]);

  const lastSelectedItems = selectedItems.filter(
    (itemId) => !prevSelectedItemsRef.current.includes(itemId)
  );
  const lastUnselectedItems = prevSelectedItemsRef.current.filter(
    (itemId) => !selectedItems.includes(itemId)
  );

  const handleSelect = (
    _: Event | React.SyntheticEvent,
    id: TreeItemIdType[]
  ) => {
    setSelectedItems(id);
  };

  useEffect(() => {
    prevSelectedItemsRef.current = selectedItems;
  }, [selectedItems]);

  return (
    <Stack spacing={20}>
      <Stack spacing={5}>
        <Text
          noMargin
          style={{ color: 'on-surface' }}
        >{`Last selected items: [${lastSelectedItems.join(', ')}]`}</Text>
        <Text
          noMargin
          style={{ color: 'on-surface' }}
        >{`Last unselected items: [${lastUnselectedItems.join(', ')}]`}</Text>
      </Stack>
      <Box style={{ width: '300px' }}>
        <Tree
          data={DATA}
          treeNodes={TREE_NODES}
          multiSelect
          selectedItem={selectedItems}
          onSelectedItemChange={handleSelect}
        />
      </Box>
    </Stack>
  );
};

const ControlledExpansionTemplate = () => {
  const [expandedItems, setExpandedItems] = useState<TreeItemIdType[]>([]);

  const handleExpand = (
    _: Event | React.SyntheticEvent,
    id: TreeItemIdType[]
  ) => {
    setExpandedItems(id);
  };

  return (
    <Stack spacing={20}>
      <Text
        noMargin
        style={{ color: 'on-surface' }}
      >{`Expanded items: [${expandedItems.join(', ')}]`}</Text>
      <Box style={{ width: '300px' }}>
        <Tree
          data={DATA}
          treeNodes={TREE_NODES}
          expandedItems={expandedItems}
          onExpandedItemsChange={handleExpand}
        />
      </Box>
    </Stack>
  );
};

const LimitExpansionToIconContainerTemplate = () => {
  const [expandedItems, setExpandedItems] = useState<TreeItemIdType[]>([]);

  const handleExpand = (
    event: Event | React.SyntheticEvent,
    id: TreeItemIdType[]
  ) => {
    const expandedEl = event.target as Element;
    if (expandedEl && expandedEl.closest('.JinniTreeItemIconContainer')) {
      setExpandedItems(id);
    }
  };

  return (
    <Box style={{ width: '300px' }}>
      <Tree
        data={DATA}
        treeNodes={TREE_NODES}
        expandedItems={expandedItems}
        onExpandedItemsChange={handleExpand}
      />
    </Box>
  );
};

const TrackItemExpansionChangeTemplate = () => {
  const [action, setAction] = useState<{
    id: TreeItemIdType;
    isExpanded: boolean;
  } | null>(null);

  const toggle = (
    _: Event | React.SyntheticEvent,
    id: TreeItemIdType,
    isExpanded: boolean
  ) => {
    setAction({ id, isExpanded });
  };

  return (
    <Stack spacing={20}>
      <Text style={{ color: 'on-surface' }}>
        {action === null
          ? 'No action recorded'
          : `Last action: ${action.isExpanded ? 'expand' : 'collapse'} ${action.id}`}
      </Text>
      <Box style={{ width: '300px' }}>
        <Tree
          data={DATA}
          treeNodes={TREE_NODES}
          onItemExpansionToggle={toggle}
        />
      </Box>
    </Stack>
  );
};

const LazyLoadingTemplate = () => {
  const [data, setData] = useState<TreeProps['data']>({
    news: { label: 'News' },
    shopping: { label: 'Shopping' },
    tool: { label: 'Tool' }
  });
  const [treeNodes, setTreeNodes] = useState<TreeProps['treeNodes']>({
    root: ['news', 'shopping', 'tool'],
    news: [],
    sports: [],
    shopping: [],
    tool: []
  });
  const [itemIdLoaded, setItemIdLoaded] = useState<TreeItemIdType | null>(null);

  const handleExpansionToggle = (
    _: Event | React.SyntheticEvent,
    id: TreeItemIdType,
    isExpanded: boolean
  ) => {
    if (isExpanded && treeNodes[id].length === 0) {
      setItemIdLoaded(id);
      setTimeout(() => {
        setTreeNodes((prev) => ({ ...prev, [id]: TREE_NODES[id] }));
        setData((prev) => {
          const newData = { ...prev };
          TREE_NODES[id].forEach((itemId) => (newData[itemId] = DATA[itemId]));
          return newData;
        });
        setItemIdLoaded(null);
      }, 1500);
    }
  };

  return (
    <Box style={{ width: '300px' }}>
      <Tree
        data={data}
        treeNodes={treeNodes}
        onItemExpansionToggle={handleExpansionToggle}
        renderTreeItem={(itemProps) => {
          const { id, leaf, expanded, label, ...rest } = itemProps;
          let icon: React.ReactNode = null;
          if (itemIdLoaded === id) {
            icon = <CircularProgress size={16} />;
          } else if (!leaf) {
            icon = expanded ? (
              <ArrowDownIcon color="on-surface-variant" />
            ) : (
              <ArrowRightIcon color="on-surface-variant" />
            );
          }
          return (
            <TreeItem id={id} expanded={expanded} {...rest}>
              <div className="JinniTreeItemIconContainer">{icon}</div>
              <div className="JinniTreeItemContents">{label}</div>
            </TreeItem>
          );
        }}
      />
    </Box>
  );
};

const FocusableDisabledItemsTemplate = () => {
  const [checked, setChecked] = useState(false);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Stack spacing={20}>
      <Label content="Disabled items focusable" style={{ color: 'on-surface' }}>
        <Switch checked={checked} onChange={handleCheck} />
      </Label>
      <Box style={{ width: '300px' }}>
        <Tree
          data={DATA_WITH_DISABLED}
          treeNodes={TREE_NODES}
          disabledItemsFocusable={checked}
        />
      </Box>
    </Stack>
  );
};

const FocusAndScrollTemplate = () => {
  const treeBoxElRef = useRef<HTMLElement>(null);

  const handleClick = () => {
    const treeBoxEl = treeBoxElRef.current;
    if (!treeBoxEl) return;

    const itemEl = treeBoxEl.querySelector<HTMLElement>(
      `.JinniTreeItem[data-id='listC']`
    );
    if (itemEl) {
      itemEl.focus();
    }
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Button onClick={handleClick}>Focus and scroll to 'listC' item</Button>
      <Box
        ref={treeBoxElRef}
        style={{ width: '300px', maxHeight: '200px', overflowY: 'auto' }}
      >
        <Tree
          data={MANY_DATA}
          treeNodes={MANY_TREE_NODES}
          defaultExpandedItems={['listA', 'listB', 'listC']}
        />
      </Box>
    </Stack>
  );
};

export const BasicTree: Story = {
  render: () => (
    <Box style={{ width: '300px' }}>
      <Tree data={DATA} treeNodes={TREE_NODES} />
    </Box>
  ),
  parameters: {
    docs: {
      source: {
        code: `
const DATA = {
  news: { label: 'News' },
  weather: { label: 'Weather' },
  sports: { label: 'Sports' },
  baseball: { label: 'Baseball' },
  tenis: { label: 'Tenis' },
  entertainment: { label: 'Entertainment' },
  shopping: { label: 'Shopping' },
  store: { label: 'Store' },
  shoppinglive: { label: 'Shopping-Live' },
  tool: { label: 'Tool' },
  email: { label: 'Email' },
  calendar: { label: 'Calendar' }
};
const TREE_NODES = {
  root: ['news', 'shopping', 'tool'],
  news: ['weather', 'sports', 'entertainment'],
  sports: ['baseball', 'tenis'],
  shopping: ['store', 'shoppinglive'],
  tool: ['email', 'calendar']
};

<Box style={{ width: '300px' }}>
  <Tree data={DATA} treeNodes={TREE_NODES} />
</Box>
        `.trim()
      }
    }
  }
};

export const DisabledItems: Story = {
  render: () => (
    <Box style={{ width: '300px' }}>
      <Tree data={DATA_WITH_DISABLED} treeNodes={TREE_NODES} />
    </Box>
  ),
  parameters: {
    docs: {
      source: {
        code: `
const DATA_WITH_DISABLED = {
  news: { label: 'News' },
  weather: { label: 'Weather' },
  sports: { label: 'Sports' },
  baseball: { label: 'Baseball' },
  tenis: { label: 'Tenis' },
  entertainment: { label: 'Entertainment', disabled: true },
  shopping: { label: 'Shopping' },
  store: { label: 'Store' },
  shoppinglive: { label: 'Shopping-Live' },
  tool: { label: 'Tool', disabled: true },
  email: { label: 'Email' },
  calendar: { label: 'Calendar' }
};
const TREE_NODES = {
  root: ['news', 'shopping', 'tool'],
  news: ['weather', 'sports', 'entertainment'],
  sports: ['baseball', 'tenis'],
  shopping: ['store', 'shoppinglive'],
  tool: ['email', 'calendar']
};

<Box style={{ width: '300px' }}>
  <Tree data={DATA_WITH_DISABLED} treeNodes={TREE_NODES} />
</Box>
`.trim()
      }
    }
  }
};

export const TrackItemClick: Story = {
  render: () => <TrackItemClickTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const TrackItemClickTemplate = () => {
  const [clickedItem, setClickedItem] = useState<TreeItemIdType | null>(null);

  const handleItemClick = (
    _: Event | React.SyntheticEvent,
    id: TreeItemIdType
  ) => {
    setClickedItem(id);
  };

  return (
    <Stack spacing={20}>
      <Text noMargin style={{ color: 'on-surface' }}>
        Clicked item: {clickedItem}
      </Text>
      <Box style={{ width: '300px' }}>
        <Tree
          data={DATA}
          treeNodes={TREE_NODES}
          onItemClick={handleItemClick}
        />
      </Box>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const BasicSelection: Story = {
  render: () => (
    <Box style={{ width: '300px' }}>
      <Tree data={DATA} treeNodes={TREE_NODES} defaultSelectedItem="tool" />
    </Box>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Box style={{ width: '300px' }}>
  <Tree data={DATA} treeNodes={TREE_NODES} defaultSelectedItem="tool" />
</Box>`.trim()
      }
    }
  }
};

export const ControlledSelection: Story = {
  render: () => <ControlledSelectionTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledSelectionTemplate = () => {
  const [selectedItem, setSelectedItem] = useState<TreeItemIdType | null>(null);

  const handleSelect = (
    _: Event | React.SyntheticEvent,
    id: TreeItemIdType | null
  ) => {
    setSelectedItem(id);
  };

  return (
    <Stack spacing={20}>
      <Text noMargin style={{ color: 'on-surface' }}>
        Selected item: {selectedItem}
      </Text>
      <Box style={{ width: '300px' }}>
        <Tree
          data={DATA}
          treeNodes={TREE_NODES}
          selectedItem={selectedItem}
          onSelectedItemChange={handleSelect}
        />
      </Box>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const MultiSelection: Story = {
  render: () => (
    <Box style={{ width: '300px' }}>
      <Tree data={DATA} treeNodes={TREE_NODES} multiSelect />
    </Box>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Box style={{ width: '300px' }}>
  <Tree data={DATA} treeNodes={TREE_NODES} multiSelect />
</Box>`.trim()
      }
    }
  }
};

export const DisableSelectionAllTreeItems: Story = {
  render: () => (
    <Box style={{ width: '300px' }}>
      <Tree data={DATA} treeNodes={TREE_NODES} selectedItem={null} />
    </Box>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Box style={{ width: '300px' }}>
  <Tree data={DATA} treeNodes={TREE_NODES} selectedItem={null} />
</Box>`.trim()
      }
    }
  }
};

export const DisableSelectionExpandableTreeItems: Story = {
  render: () => <DisableSelectionExpandableTreeItemsTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const DisableSelectionExpandableTreeItemsTemplate = () => {
  const [selectedItem, setSelectedItem] = useState<TreeItemIdType | null>(null);

  const handleSelect = (
    _: Event | React.SyntheticEvent,
    id: TreeItemIdType | null
  ) => {
    const isLeafNode = !Object.keys(TREE_NODES).some((node) => node === id);
    if (isLeafNode) {
      setSelectedItem(id);
    }
  };

  return (
    <Box style={{ width: '300px' }}>
      <Tree
        data={DATA}
        treeNodes={TREE_NODES}
        selectedItem={selectedItem}
        onSelectedItemChange={handleSelect}
      />
    </Box>
  );
};`.trim()
      }
    }
  }
};

export const CheckboxSelection: Story = {
  render: () => <CheckboxSelectionTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const CheckboxSelectionTemplate = () => {
  const [selectedItems, setSelectedItems] = useState<TreeItemIdType[]>([]);

  const handleSelect = (id: TreeItemIdType) => {
    if (selectedItems.includes(id)) {
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems((prev) => [...prev, id]);
    }
  };

  return (
    <Box style={{ width: '300px' }}>
      <Tree
        data={DATA}
        treeNodes={TREE_NODES}
        multiSelect
        selectedItem={selectedItems}
        renderTreeItem={(itemProps) => {
          const { id, leaf, expanded, label, ...rest } = itemProps;
          let icon: React.ReactNode = null;
          if (!leaf) {
            icon = expanded ? (
              <ArrowDownIcon color="on-surface-variant" />
            ) : (
              <ArrowRightIcon color="on-surface-variant" />
            );
          }
          const isChildNodeSelected =
            !leaf &&
            TREE_NODES[id].some((childNode) =>
              selectedItems.includes(childNode)
            );
          return (
            <TreeItem id={id} expanded={expanded} {...rest}>
              <div className="JinniTreeItemIconContainer">{icon}</div>
              <div
                className="JinniTreeItemContents"
                style={{ display: 'inline-flex', alignItems: 'center' }}
              >
                <Checkbox
                  indeterminate={isChildNodeSelected}
                  checked={selectedItems.includes(id)}
                  onChange={() => handleSelect(id)}
                />
                {label}
              </div>
            </TreeItem>
          );
        }}
      />
    </Box>
  );
};`.trim()
      }
    }
  }
};

export const PropagateSelectionFromParentsToDescendants: Story = {
  render: () => <PropagateSelectionFromParentsToDescendantsTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const PropagateSelectionFromParentsToDescendantsTemplate = () => {
  const [selectedItems, setSelectedItems] = useState<TreeItemIdType[]>([]);

  const dfs = (node: TreeItemIdType): TreeItemIdType[] => {
    const result = [node];
    if (TREE_NODES[node]) {
      for (const childNode of TREE_NODES[node]) {
        result.push(...dfs(childNode));
      }
    }
    return result;
  };

  const handleSelect = (id: TreeItemIdType, leaf: boolean) => {
    const alreadySelected = selectedItems.includes(id);
    const itemsToChange: TreeItemIdType[] = [id];
    if (!leaf) {
      itemsToChange.push(...dfs(id));
    }

    const selectedItemsSet = new Set(selectedItems);
    itemsToChange.forEach((item) => {
      if (alreadySelected) {
        selectedItemsSet.delete(item);
      } else {
        selectedItemsSet.add(item);
      }
    });
    setSelectedItems([...selectedItemsSet]);
  };

  return (
    <Box style={{ width: '300px' }}>
      <Tree
        data={DATA}
        treeNodes={TREE_NODES}
        multiSelect
        selectedItem={selectedItems}
        renderTreeItem={(itemProps) => {
          const { id, leaf, expanded, label, ...rest } = itemProps;
          let icon: React.ReactNode = null;
          if (!leaf) {
            icon = expanded ? (
              <ArrowDownIcon color="on-surface-variant" />
            ) : (
              <ArrowRightIcon color="on-surface-variant" />
            );
          }
          return (
            <TreeItem id={id} expanded={expanded} {...rest}>
              <div className="JinniTreeItemIconContainer">{icon}</div>
              <div
                className="JinniTreeItemContents"
                style={{ display: 'inline-flex', alignItems: 'center' }}
              >
                <Checkbox
                  checked={selectedItems.includes(id)}
                  onChange={() => handleSelect(id, leaf)}
                />
                {label}
              </div>
            </TreeItem>
          );
        }}
      />
    </Box>
  );
};`.trim()
      }
    }
  }
};

export const PropagateSelectionFromDescendantsToParents: Story = {
  render: () => <PropagateSelectionFromDescendantsToParentsTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const PropagateSelectionFromDescendantsToParentsTemplate = () => {
  const [selectedItems, setSelectedItems] = useState<TreeItemIdType[]>([]);
  const ancestorsTable = useMemo<{
    [id: TreeItemIdType]: TreeItemIdType[];
  }>(() => {
    const ancestorTable: { [id: TreeItemIdType]: TreeItemIdType[] } = {};
    const dfs = (node: TreeItemIdType, ancestors?: TreeItemIdType[]) => {
      for (const child of TREE_NODES[node] ?? []) {
        const currentAncestors = ancestors ? [node, ...ancestors] : [];
        ancestorTable[child] = currentAncestors;
        dfs(child, currentAncestors);
      }
    };
    dfs('root');
    return ancestorTable;
  }, []);

  const isAllDescendantsSelected = (
    parentNode: TreeItemIdType,
    selectedNodes: TreeItemIdType[]
  ): boolean => {
    return (TREE_NODES[parentNode] ?? []).every(
      (child) =>
        selectedNodes.includes(child) &&
        isAllDescendantsSelected(child, selectedNodes)
    );
  };

  const handleSelect = (id: TreeItemIdType) => {
    const ancestors = ancestorsTable[id];
    const alreadySelected = selectedItems.includes(id);
    const itemsToAdd: TreeItemIdType[] = [];
    const itemsToDelete: TreeItemIdType[] = [];

    if (alreadySelected) {
      itemsToDelete.push(id, ...ancestors);
    } else {
      itemsToAdd.push(id);
      for (const ancestor of ancestors) {
        if (
          isAllDescendantsSelected(ancestor, [...selectedItems, ...itemsToAdd])
        ) {
          itemsToAdd.push(ancestor);
        } else {
          break;
        }
      }
    }

    const selectedItemsSet = new Set(selectedItems);
    itemsToAdd.forEach((item) => {
      selectedItemsSet.add(item);
    });
    itemsToDelete.forEach((item) => {
      selectedItemsSet.delete(item);
    });
    setSelectedItems([...selectedItemsSet]);
  };

  return (
    <Box style={{ width: '300px' }}>
      <Tree
        data={DATA}
        treeNodes={TREE_NODES}
        multiSelect
        selectedItem={selectedItems}
        renderTreeItem={(itemProps) => {
          const { id, leaf, expanded, label, ...rest } = itemProps;
          let icon: React.ReactNode = null;
          if (!leaf) {
            icon = expanded ? (
              <ArrowDownIcon color="on-surface-variant" />
            ) : (
              <ArrowRightIcon color="on-surface-variant" />
            );
          }
          return (
            <TreeItem id={id} expanded={expanded} {...rest}>
              <div className="JinniTreeItemIconContainer">{icon}</div>
              <div
                className="JinniTreeItemContents"
                style={{ display: 'inline-flex', alignItems: 'center' }}
              >
                <Checkbox
                  checked={selectedItems.includes(id)}
                  onChange={() => handleSelect(id)}
                />
                {label}
              </div>
            </TreeItem>
          );
        }}
      />
    </Box>
  );
};`.trim()
      }
    }
  }
};

export const TrackItemSelectionChange: Story = {
  render: () => <TrackItemSelectionChangeTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const TrackItemSelectionChangeTemplate = () => {
  const prevSelectedItemsRef = useRef<TreeItemIdType[]>([]);
  const [selectedItems, setSelectedItems] = useState<TreeItemIdType[]>([]);

  const lastSelectedItems = selectedItems.filter(
    (itemId) => !prevSelectedItemsRef.current.includes(itemId)
  );
  const lastUnselectedItems = prevSelectedItemsRef.current.filter(
    (itemId) => !selectedItems.includes(itemId)
  );

  const handleSelect = (
    _: Event | React.SyntheticEvent,
    id: TreeItemIdType[]
  ) => {
    setSelectedItems(id);
  };

  useEffect(() => {
    prevSelectedItemsRef.current = selectedItems;
  }, [selectedItems]);

  return (
    <Stack spacing={20}>
      <Stack spacing={5}>
        <Text
          noMargin
          style={{ color: 'on-surface' }}
        >{\`Last selected items: [\${lastSelectedItems.join(', ')}]\`}</Text>
        <Text
          noMargin
          style={{ color: 'on-surface' }}
        >{\`Last unselected items: [\${lastUnselectedItems.join(', ')}]\`}</Text>
      </Stack>
      <Box style={{ width: '300px' }}>
        <Tree
          data={DATA}
          treeNodes={TREE_NODES}
          multiSelect
          selectedItem={selectedItems}
          onSelectedItemChange={handleSelect}
        />
      </Box>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const BasicExpansion: Story = {
  render: () => (
    <Box style={{ width: '300px' }}>
      <Tree
        data={DATA}
        treeNodes={TREE_NODES}
        defaultExpandedItems={['sports', 'tool']}
      />
    </Box>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Box style={{ width: '300px' }}>
  <Tree
    data={DATA}
    treeNodes={TREE_NODES}
    defaultExpandedItems={['sports', 'tool']}
  />
</Box>`.trim()
      }
    }
  }
};

export const ControlledExpansion: Story = {
  render: () => <ControlledExpansionTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledExpansionTemplate = () => {
  const [expandedItems, setExpandedItems] = useState<TreeItemIdType[]>([]);

  const handleExpand = (
    _: Event | React.SyntheticEvent,
    id: TreeItemIdType[]
  ) => {
    setExpandedItems(id);
  };

  return (
    <Stack spacing={20}>
      <Text
        noMargin
        style={{ color: 'on-surface' }}
      >{\`Expanded items: [\${expandedItems.join(', ')}]\`}</Text>
      <Box style={{ width: '300px' }}>
        <Tree
          data={DATA}
          treeNodes={TREE_NODES}
          expandedItems={expandedItems}
          onExpandedItemsChange={handleExpand}
        />
      </Box>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const LimitExpansionToIconContainer: Story = {
  render: () => <LimitExpansionToIconContainerTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const LimitExpansionToIconContainerTemplate = () => {
  const [expandedItems, setExpandedItems] = useState<TreeItemIdType[]>([]);

  const handleExpand = (
    event: Event | React.SyntheticEvent,
    id: TreeItemIdType[]
  ) => {
    const expandedEl = event.target as Element;
    if (expandedEl && expandedEl.closest('.JinniTreeItemIconContainer')) {
      setExpandedItems(id);
    }
  };

  return (
    <Box style={{ width: '300px' }}>
      <Tree
        data={DATA}
        treeNodes={TREE_NODES}
        expandedItems={expandedItems}
        onExpandedItemsChange={handleExpand}
      />
    </Box>
  );
};
`.trim()
      }
    }
  }
};

export const TrackItemExpansionChange: Story = {
  render: () => <TrackItemExpansionChangeTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const TrackItemExpansionChangeTemplate = () => {
  const [action, setAction] = useState<{
    id: TreeItemIdType;
    isExpanded: boolean;
  } | null>(null);

  const toggle = (
    _: Event | React.SyntheticEvent,
    id: TreeItemIdType,
    isExpanded: boolean
  ) => {
    setAction({ id, isExpanded });
  };

  return (
    <Stack spacing={20}>
      <Text style={{ color: 'on-surface' }}>
        {action === null
          ? 'No action recorded'
          : \`Last action: \${action.isExpanded ? 'expand' : 'collapse'} \${action.id}\`}
      </Text>
      <Box style={{ width: '300px' }}>
        <Tree
          data={DATA}
          treeNodes={TREE_NODES}
          onItemExpansionToggle={toggle}
        />
      </Box>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const LazyLoading: Story = {
  render: () => <LazyLoadingTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const LazyLoadingTemplate = () => {
  const [data, setData] = useState<TreeProps['data']>({
    news: { label: 'News' },
    shopping: { label: 'Shopping' },
    tool: { label: 'Tool' }
  });
  const [treeNodes, setTreeNodes] = useState<TreeProps['treeNodes']>({
    root: ['news', 'shopping', 'tool'],
    news: [],
    sports: [],
    shopping: [],
    tool: []
  });
  const [itemIdLoaded, setItemIdLoaded] = useState<TreeItemIdType | null>(null);

  const handleExpansionToggle = (
    _: Event | React.SyntheticEvent,
    id: TreeItemIdType,
    isExpanded: boolean
  ) => {
    if (isExpanded && treeNodes[id].length === 0) {
      setItemIdLoaded(id);
      setTimeout(() => {
        setTreeNodes((prev) => ({ ...prev, [id]: TREE_NODES[id] }));
        setData((prev) => {
          const newData = { ...prev };
          TREE_NODES[id].forEach((itemId) => (newData[itemId] = DATA[itemId]));
          return newData;
        });
        setItemIdLoaded(null);
      }, 1500);
    }
  };

  return (
    <Box style={{ width: '300px' }}>
      <Tree
        data={data}
        treeNodes={treeNodes}
        onItemExpansionToggle={handleExpansionToggle}
        renderTreeItem={(itemProps) => {
          const { id, leaf, expanded, label, ...rest } = itemProps;
          let icon: React.ReactNode = null;
          if (itemIdLoaded === id) {
            icon = <CircularProgress size={16} />;
          } else if (!leaf) {
            icon = expanded ? (
              <ArrowDownIcon color="on-surface-variant" />
            ) : (
              <ArrowRightIcon color="on-surface-variant" />
            );
          }
          return (
            <TreeItem id={id} expanded={expanded} {...rest}>
              <div className="JinniTreeItemIconContainer">{icon}</div>
              <div className="JinniTreeItemContents">{label}</div>
            </TreeItem>
          );
        }}
      />
    </Box>
  );
};`.trim()
      }
    }
  }
};

export const FocusableDisabledItems: Story = {
  render: () => <FocusableDisabledItemsTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const FocusableDisabledItemsTemplate = () => {
  const [checked, setChecked] = useState(false);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Stack spacing={20}>
      <Label
        content="Disabled items focusable"
        style={{ color: 'on-surface' }}
      >
        <Switch checked={checked} onChange={handleCheck} />
      </Label>
      <Box style={{ width: '300px' }}>
        <Tree
          data={DATA_WITH_DISABLED}
          treeNodes={TREE_NODES}
          disabledItemsFocusable={checked}
        />
      </Box>
    </Stack>
  );
};
`.trim()
      }
    }
  }
};

export const FocusAndScroll: Story = {
  render: () => <FocusAndScrollTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const FocusAndScrollTemplate = () => {
  const treeBoxElRef = useRef<HTMLElement>(null);

  const handleClick = () => {
    const treeBoxEl = treeBoxElRef.current;
    if (!treeBoxEl) return;

    const itemEl = treeBoxEl.querySelector<HTMLElement>(
      \`.JinniTreeItem[data-id='listC']\`
    );
    if (itemEl) {
      itemEl.focus();
    }
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Button onClick={handleClick}>Focus and scroll to 'listC' item</Button>
      <Box
        ref={treeBoxElRef}
        style={{ width: '300px', maxHeight: '200px', overflowY: 'auto' }}
      >
        <Tree
          data={MANY_DATA}
          treeNodes={MANY_TREE_NODES}
          defaultExpandedItems={['listA', 'listB', 'listC']}
        />
      </Box>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const CustomExpandIconsAndStyles: Story = {
  render: () => (
    <Box style={{ width: '300px' }}>
      <Tree
        data={DATA}
        treeNodes={TREE_NODES}
        renderTreeItem={(itemProps) => {
          const { leaf, expanded, label, layer, ...rest } = itemProps;
          let icon: React.ReactNode = null;
          if (leaf) {
            icon = '▪';
          } else {
            icon = expanded ? '⬇' : '➡';
          }
          return (
            <Stack direction="row">
              {Array(layer)
                .fill(0)
                .map(() => (
                  <Box
                    style={{
                      display: 'inline-flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px'
                    }}
                  >
                    <Divider orientation="vertical" variant="dashed" />
                  </Box>
                ))}
              <TreeItem expanded={expanded} style={{ flex: 1 }} {...rest}>
                <div className="JinniTreeItemIconContainer">{icon}</div>
                <div className="JinniTreeItemContents">{label}</div>
              </TreeItem>
            </Stack>
          );
        }}
      />
    </Box>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Box style={{ width: '300px' }}>
  <Tree
    data={DATA}
    treeNodes={TREE_NODES}
    renderTreeItem={(itemProps) => {
      const { leaf, expanded, label, layer, ...rest } = itemProps;
      let icon: React.ReactNode = null;
      if (leaf) {
        icon = '▪';
      } else {
        icon = expanded ? '⬇' : '➡';
      }
      return (
        <Stack direction="row">
          {Array(layer)
            .fill(0)
            .map(() => (
              <Box
                style={{
                  display: 'inline-flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px'
                }}
              >
                <Divider orientation="vertical" variant="dashed" />
              </Box>
            ))}
          <TreeItem expanded={expanded} style={{ flex: 1 }} {...rest}>
            <div className="JinniTreeItemIconContainer">{icon}</div>
            <div className="JinniTreeItemContents">{label}</div>
          </TreeItem>
        </Stack>
      );
    }}
  />
</Box>`.trim()
      }
    }
  }
};

export const LabelWithIcon: Story = {
  render: () => (
    <Box style={{ width: '300px' }}>
      <Tree data={DATA_WITH_NODE_LABEL} treeNodes={ICON_LABEL_TREE_NODES} />
    </Box>
  ),
  parameters: {
    docs: {
      source: {
        code: `
const CustomLabel = ({
  icon,
  label,
  count
}: {
  icon: React.ReactNode;
  label: string;
  count?: number;
}) => {
  return (
    <Stack direction="row" spacing={10} style={{ alignItems: 'center' }}>
      {icon}
      <Text className="typo-label-medium" style={{ flex: 1 }}>
        {label}
      </Text>
      <Text
        className="typo-label-small"
        style={{ color: 'on-surface-variant' }}
      >
        {count}
      </Text>
    </Stack>
  );
};

const DATA: TreeProps['data'] = {
  mail: {
    label: (
      <CustomLabel
        label="Mail"
        icon={<MailIcon size={20} color="on-surface-variant" />}
      />
    )
  },
  trash: {
    label: (
      <CustomLabel
        label="Trash"
        icon={<TrashcanIcon size={20} color="on-surface-variant" />}
      />
    )
  },
  myPage: {
    label: (
      <CustomLabel
        label="My Page"
        icon={<PersonIcon size={20} color="on-surface-variant" />}
      />
    )
  },
  bookmark: {
    label: (
      <CustomLabel
        label="Bookmarks"
        icon={<BookmarkIcon size={20} color="on-surface-variant" />}
        count={55}
      />
    )
  },
  favorite: {
    label: (
      <CustomLabel
        label="Favorite"
        icon={<FavoriteIcon size={20} color="on-surface-variant" />}
        count={13}
      />
    )
  }
};

const TREE_NODES: TreeProps['treeNodes'] = {
  root: ['mail', 'trash', 'myPage'],
  myPage: ['bookmark', 'favorite']
};

<Box style={{ width: '300px' }}>
  <Tree data={DATA} treeNodes={TREE_NODES} />
</Box>
`.trim()
      }
    }
  }
};
