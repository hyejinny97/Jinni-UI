import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tree, TreeItem, TreeItemIdType } from '.';
import { Box } from '@/components/layout/Box';
import { Text } from '@/components/general/Text';
import { Stack } from '@/components/layout/Stack';
import { Switch } from '@/components/data-entry/Switch';
import { SwitchLabel } from '@/components/data-entry/SwitchLabel';

const meta: Meta<typeof Tree> = {
  component: Tree,
  argTypes: {
    children: {
      description: 'TreeItem 컴포넌트 등 내용',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    onItemClick: {
      description: 'TreeItem을 클릭했을 때 호출되는 함수',
      table: {
        type: {
          summary: `(event: Event | React.SyntheticEvent, itemId: TreeItemIdType) => void;`
        }
      }
    },
    defaultSelectedItems: {
      description: '초기 selected items',
      table: {
        type: {
          summary: `MultiSelect extends true ? TreeItemIdType[] : TreeItemIdType`
        }
      }
    },
    selectedItems: {
      description: 'selected items',
      table: {
        type: {
          summary: `MultiSelect extends true ? TreeItemIdType[] : TreeItemIdType`
        }
      }
    },
    onSelectedItemsChange: {
      description: 'selected items에 변화가 있을 때 호출되는 함수',
      table: {
        type: {
          summary: `(event: Event | React.SyntheticEvent, itemId: MultiSelect extends true ? TreeItemIdType[] : TreeItemIdType | null) => void;`
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
    disableSelection: {
      description: 'true이면, select 불가',
      table: {
        type: {
          summary: `boolean`
        }
      }
    },
    checkboxSelection: {
      description: 'true이면, checkbox를 통해 select 가능',
      table: {
        type: {
          summary: `boolean`
        }
      }
    },
    selectionPropagation: {
      description:
        '한 TreeItem의 selection이 상위나 하위의 selection에 영향을 미침',
      table: {
        type: {
          summary: `{ parents?: boolean; descendants?: boolean }`
        }
      }
    },
    onItemSelectionToggle: {
      description: 'TreeItem이 select되거나 unselect 됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(event: Event | React.SyntheticEvent, itemId: TreeItemIdType, isSelected: boolean) => void;`
        }
      }
    },
    defaultExpandedItems: {
      description: '초기 expanded items',
      table: {
        type: {
          summary: `TreeItemIdType[]`
        }
      }
    },
    expandedItems: {
      description: 'expanded items',
      table: {
        type: {
          summary: `TreeItemIdType[]`
        }
      }
    },
    onExpandedItemsChange: {
      description: 'expanded items가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(event: Event | React.SyntheticEvent, itemId: TreeItemIdType[]) => void;`
        }
      }
    },
    expansionTrigger: {
      description: 'item expansion을 트리거하는 요소',
      table: {
        type: {
          summary: `'content' | 'iconContainer'`
        },
        defaultValue: { summary: `'content'` }
      }
    },
    onItemExpansionToggle: {
      description: 'TreeItem이 collapse되거나 expanse될 때 호출되는 함수',
      table: {
        type: {
          summary: `(event: Event | React.SyntheticEvent, itemId: TreeItemIdType, isExpanded: boolean) => void;`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Tree>;

type TreeItemType = {
  itemId: string;
  label: string;
  disabled?: boolean;
  children?: TreeItemType[];
};

const ITEMS: TreeItemType[] = [
  {
    itemId: 'news',
    label: 'News',
    children: [
      { itemId: 'weather', label: 'Weather' },
      {
        itemId: 'sports',
        label: 'Sports',
        children: [
          { itemId: 'baseball', label: 'Baseball' },
          { itemId: 'tennis', label: 'Tennis' }
        ]
      },
      { itemId: 'entertainment', label: 'Entertainment' }
    ]
  },
  {
    itemId: 'shopping',
    label: 'Shopping',
    children: [
      { itemId: 'store', label: 'Store' },
      { itemId: 'shoppingLive', label: 'Shopping-Live' }
    ]
  },
  {
    itemId: 'tool',
    label: 'Tool',
    children: [
      { itemId: 'email', label: 'Email' },
      { itemId: 'calendar', label: 'Calendar' }
    ]
  }
];

const ITEMS_WITH_DISABLED: TreeItemType[] = [
  {
    itemId: 'news',
    label: 'News',
    children: [
      { itemId: 'weather', label: 'Weather' },
      {
        itemId: 'sports',
        label: 'Sports',
        children: [
          { itemId: 'baseball', label: 'Baseball' },
          { itemId: 'tennis', label: 'Tennis' }
        ]
      },
      { itemId: 'entertainment', label: 'Entertainment' }
    ]
  },
  {
    itemId: 'shopping',
    label: 'Shopping',
    children: [
      { itemId: 'store', label: 'Store', disabled: true },
      { itemId: 'shoppingLive', label: 'Shopping-Live' }
    ]
  },
  {
    itemId: 'tool',
    label: 'Tool',
    disabled: true,
    children: [
      { itemId: 'email', label: 'Email' },
      { itemId: 'calendar', label: 'Calendar' }
    ]
  }
];

const TreeBox = ({ children }: { children: React.ReactNode }) => {
  return <Box style={{ width: '300px' }}>{children}</Box>;
};

const RecursiveTreeItem = ({ item }: { item: TreeItemType }) => {
  const { itemId, label, disabled, children } = item;
  return (
    <TreeItem key={itemId} itemId={itemId} label={label} disabled={disabled}>
      {children &&
        children.map((child) => (
          <RecursiveTreeItem key={child.itemId} item={child} />
        ))}
    </TreeItem>
  );
};

const TrackItemClicksTemplate = () => {
  const [lastClickedItem, setLastClickedItem] = useState<TreeItemIdType | null>(
    null
  );

  const handleItemClick = (
    _: Event | React.SyntheticEvent,
    itemId: TreeItemIdType
  ) => {
    setLastClickedItem(itemId);
  };

  return (
    <>
      <Text>
        {lastClickedItem === null
          ? 'No item click recorded'
          : `Last clicked item: '${lastClickedItem}'`}
      </Text>
      <TreeBox>
        <Tree onItemClick={handleItemClick}>
          {ITEMS.map((item) => (
            <RecursiveTreeItem key={item.itemId} item={item} />
          ))}
        </Tree>
      </TreeBox>
    </>
  );
};

const ControlledSelectionTemplate = () => {
  const [selectedItem, setSelectedItem] = useState<TreeItemIdType | null>(null);

  const handleSelectedItemsChange = (
    _: Event | React.SyntheticEvent,
    itemId: TreeItemIdType | null
  ) => {
    setSelectedItem(itemId);
  };

  return (
    <>
      <Text>{`Selected Item: ${selectedItem}`}</Text>
      <TreeBox>
        <Tree
          selectedItems={selectedItem}
          onSelectedItemsChange={handleSelectedItemsChange}
        >
          {ITEMS.map((item) => (
            <RecursiveTreeItem key={item.itemId} item={item} />
          ))}
        </Tree>
      </TreeBox>
    </>
  );
};

const AutomaticSelectionTemplate = () => {
  const [propagation, setPropagation] = useState({
    parents: true,
    descendants: true
  });

  const handleSwitchChange =
    (type: 'parents' | 'descendants') =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPropagation((prev) => ({
        ...prev,
        [type]: event.target.checked
      }));
    };

  return (
    <>
      <Stack direction="row" spacing={20}>
        <SwitchLabel label="parents">
          <Switch
            checked={propagation.parents}
            onChange={handleSwitchChange('parents')}
          />
        </SwitchLabel>
        <SwitchLabel label="descendants">
          <Switch
            checked={propagation.descendants}
            onChange={handleSwitchChange('descendants')}
          />
        </SwitchLabel>
      </Stack>
      <TreeBox>
        <Tree multiSelect checkboxSelection selectionPropagation={propagation}>
          {ITEMS.map((item) => (
            <RecursiveTreeItem key={item.itemId} item={item} />
          ))}
        </Tree>
      </TreeBox>
    </>
  );
};

const TrackItemSelectionChangeTemplate = () => {
  const [lastSelectedItem, setLastClickedItem] =
    useState<TreeItemIdType | null>(null);

  const handleItemSelectionToggle = (
    _: Event | React.SyntheticEvent,
    itemId: TreeItemIdType,
    isSelected: boolean
  ) => {
    if (isSelected) setLastClickedItem(itemId);
  };

  return (
    <>
      <Text>
        {lastSelectedItem === null
          ? 'No item selection recorded'
          : `Last selected item: '${lastSelectedItem}'`}
      </Text>
      <TreeBox>
        <Tree onItemSelectionToggle={handleItemSelectionToggle}>
          {ITEMS.map((item) => (
            <RecursiveTreeItem key={item.itemId} item={item} />
          ))}
        </Tree>
      </TreeBox>
    </>
  );
};

const ControlledExpansionTemplate = () => {
  const [expandedItems, setExpandedItems] = useState<TreeItemIdType[]>([]);

  const handleExpandedItemsChange = (
    _: Event | React.SyntheticEvent,
    itemId: TreeItemIdType[]
  ) => {
    setExpandedItems(itemId);
  };

  return (
    <>
      <Text>{`Expanded Items: ${expandedItems}`}</Text>
      <TreeBox>
        <Tree
          expandedItems={expandedItems}
          onExpandedItemsChange={handleExpandedItemsChange}
        >
          {ITEMS.map((item) => (
            <RecursiveTreeItem key={item.itemId} item={item} />
          ))}
        </Tree>
      </TreeBox>
    </>
  );
};

const TrackItemExpansionChangeTemplate = () => {
  const [action, setAction] = useState<{
    itemId: TreeItemIdType;
    isExpanded: boolean;
  } | null>(null);

  const handleItemExpansionToggle = (
    _: Event | React.SyntheticEvent,
    itemId: TreeItemIdType,
    isExpanded: boolean
  ) => {
    setAction({ itemId, isExpanded });
  };

  return (
    <>
      <Text>
        {action === null
          ? 'No action recorded'
          : `Last action: ${action.isExpanded ? 'expand' : 'collapse'} ${action.itemId}`}
      </Text>
      <TreeBox>
        <Tree onItemExpansionToggle={handleItemExpansionToggle}>
          {ITEMS.map((item) => (
            <RecursiveTreeItem key={item.itemId} item={item} />
          ))}
        </Tree>
      </TreeBox>
    </>
  );
};

export const BasicTree: Story = {
  render: () => {
    return (
      <TreeBox>
        <Tree>
          <TreeItem itemId="news" label="News">
            <TreeItem itemId="weather" label="Weather" />
            <TreeItem itemId="sports" label="Sports">
              <TreeItem itemId="baseball" label="Baseball" />
              <TreeItem itemId="tennis" label="Tennis" />
            </TreeItem>
            <TreeItem itemId="entertainment" label="Entertainment" />
          </TreeItem>
          <TreeItem itemId="shopping" label="Shopping">
            <TreeItem itemId="store" label="Store" />
            <TreeItem itemId="shoppingLive" label="Shopping-Live" />
          </TreeItem>
          <TreeItem itemId="tool" label="Tool">
            <TreeItem itemId="email" label="Email" />
            <TreeItem itemId="calendar" label="Calendar" />
          </TreeItem>
        </Tree>
      </TreeBox>
    );
  }
};

export const DisabledItems: Story = {
  render: () => {
    return (
      <TreeBox>
        <Tree>
          {ITEMS_WITH_DISABLED.map((item) => (
            <RecursiveTreeItem key={item.itemId} item={item} />
          ))}
        </Tree>
      </TreeBox>
    );
  }
};

export const TrackItemClick: Story = {
  render: () => {
    return <TrackItemClicksTemplate />;
  }
};

export const BasicSelection: Story = {
  render: () => {
    return (
      <TreeBox>
        <Tree defaultSelectedItems="shopping">
          {ITEMS.map((item) => (
            <RecursiveTreeItem key={item.itemId} item={item} />
          ))}
        </Tree>
      </TreeBox>
    );
  }
};

export const ControlledSelection: Story = {
  render: () => {
    return <ControlledSelectionTemplate />;
  }
};

export const MultiSelection: Story = {
  render: () => {
    return (
      <TreeBox>
        <Tree multiSelect>
          {ITEMS.map((item) => (
            <RecursiveTreeItem key={item.itemId} item={item} />
          ))}
        </Tree>
      </TreeBox>
    );
  }
};

export const DisableSelection: Story = {
  render: () => {
    return (
      <TreeBox>
        <Tree disableSelection>
          {ITEMS.map((item) => (
            <RecursiveTreeItem key={item.itemId} item={item} />
          ))}
        </Tree>
      </TreeBox>
    );
  }
};

export const CheckboxSelection: Story = {
  render: () => {
    return (
      <TreeBox>
        <Tree checkboxSelection>
          {ITEMS.map((item) => (
            <RecursiveTreeItem key={item.itemId} item={item} />
          ))}
        </Tree>
      </TreeBox>
    );
  }
};

export const AutomaticParentsAndChildrenSelection: Story = {
  render: () => {
    return <AutomaticSelectionTemplate />;
  }
};

export const TrackItemSelectionChange: Story = {
  render: () => {
    return <TrackItemSelectionChangeTemplate />;
  }
};

export const BasicExpansion: Story = {
  render: () => {
    return (
      <TreeBox>
        <Tree defaultExpandedItems={['tool']}>
          {ITEMS.map((item) => (
            <RecursiveTreeItem key={item.itemId} item={item} />
          ))}
        </Tree>
      </TreeBox>
    );
  }
};

export const ControlledExpansion: Story = {
  render: () => {
    return <ControlledExpansionTemplate />;
  }
};

export const LimitExpansionToIconContainer: Story = {
  render: () => {
    return (
      <TreeBox>
        <Tree expansionTrigger="iconContainer">
          {ITEMS.map((item) => (
            <RecursiveTreeItem key={item.itemId} item={item} />
          ))}
        </Tree>
      </TreeBox>
    );
  }
};

export const TrackItemExpansionChange: Story = {
  render: () => {
    return <TrackItemExpansionChangeTemplate />;
  }
};
