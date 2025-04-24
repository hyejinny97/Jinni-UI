import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, Fragment } from 'react';
import { List, ListItem, ListItemButton } from '.';
import { Avatar } from '@/components/data-display/Avatar';
import { Text } from '@/components/general/Text';
import { ButtonBase } from '@/components/general/ButtonBase';
import { TrashcanIcon } from '@/components/icons/TrashcanIcon';
import { HomeIcon } from '@/components/icons/HomeIcon';
import { MailIcon } from '@/components/icons/MailIcon';
import { FavoriteIcon } from '@/components/icons/FavoriteIcon';
import { ArrowUpIcon } from '@/components/icons/ArrowUpIcon';
import { ArrowDownIcon } from '@/components/icons/ArrowDownIcon';
import { StyleType } from '@/types/style';
import { Checkbox } from '@/components/data-entry/Checkbox';
import { Switch } from '@/components/data-entry/Switch';

const meta: Meta<typeof List> = {
  component: List,
  argTypes: {
    children: {
      description: 'list items',
      table: {
        type: { summary: `node` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof List>;

const ITEMS = [
  {
    title: 'Item 1',
    description: 'This is item 1.',
    avatar: 'A',
    icon: <HomeIcon />,
    disabled: false
  },
  {
    title: 'Item 2',
    description: 'This is item 2.',
    avatar: 'B',
    icon: <MailIcon />,
    disabled: false
  },
  {
    title: 'Item 3',
    description: 'This is item 3.',
    avatar: 'C',
    icon: <FavoriteIcon />,
    disabled: true
  }
];
const SUB_ITEMS = [{ title: 'Item 3-1' }, { title: 'Item 3-2' }];
const ITEMS_GROUP = [
  {
    label: 'Group 1',
    items: [
      {
        title: 'Item 1-1'
      },
      {
        title: 'Item 1-2'
      },
      {
        title: 'Item 1-3'
      }
    ]
  },
  {
    label: 'Group 2',
    items: [
      {
        title: 'Item 2-1'
      },
      {
        title: 'Item 2-2'
      },
      {
        title: 'Item 2-3'
      }
    ]
  },
  {
    label: 'Group 3',
    items: [
      {
        title: 'Item 3-1'
      },
      {
        title: 'Item 3-2'
      },
      {
        title: 'Item 3-3'
      }
    ]
  },
  {
    label: 'Group 4',
    items: [
      {
        title: 'Item 4-1'
      },
      {
        title: 'Item 4-2'
      },
      {
        title: 'Item 4-3'
      }
    ]
  }
];

const ListTemplate = ({
  children,
  style,
  ...props
}: {
  children: React.ReactNode;
  style?: StyleType;
}) => {
  return (
    <List style={{ backgroundColor: 'gray-50', ...style }} {...props}>
      {children}
    </List>
  );
};

const SubListTemplate = () => {
  return (
    <ListTemplate style={{ padding: 0 }}>
      {SUB_ITEMS.map(({ title }) => (
        <ListItem key={title} style={{ padding: 0 }}>
          <ListItemButton href="#" style={{ gap: '10px', paddingLeft: '50px' }}>
            <Text className="typo-body-medium" style={{ flex: 1 }}>
              {title}
            </Text>
          </ListItemButton>
        </ListItem>
      ))}
    </ListTemplate>
  );
};

const NestedListTemplate = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prev) => !prev);
  };
  const toggleIcon = open ? <ArrowUpIcon /> : <ArrowDownIcon />;

  return (
    <ListTemplate>
      {ITEMS.map(({ title, icon }, idx) => {
        const isLastItem = idx === ITEMS.length - 1;
        return (
          <ListItem key={title} style={{ padding: 0 }}>
            <ListItemButton
              href={isLastItem ? undefined : '#'}
              onClick={isLastItem ? toggle : undefined}
              style={{ gap: '10px' }}
            >
              {icon}
              <Text className="typo-body-medium" style={{ flex: 1 }}>
                {title}
              </Text>
              {isLastItem && toggleIcon}
            </ListItemButton>
          </ListItem>
        );
      })}
      {open && <SubListTemplate />}
    </ListTemplate>
  );
};

const SelectedListTemplate = () => {
  const [selectedItemIdx, setSelectedItemIdx] = useState(0);

  const handleClick = (itemIdx: number) => {
    setSelectedItemIdx(itemIdx);
  };

  return (
    <ListTemplate>
      {ITEMS.map(({ title, description, icon }, idx) => (
        <ListItem key={title} style={{ padding: 0 }}>
          <ListItemButton
            selected={selectedItemIdx === idx}
            onClick={() => handleClick(idx)}
            style={{ gap: '10px', alignItems: 'start' }}
          >
            {icon}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                rowGap: '5px'
              }}
            >
              <Text className="typo-body-medium" style={{ margin: '0' }}>
                {title}
              </Text>
              <Text className="typo-label-medium" style={{ margin: '0' }}>
                {description}
              </Text>
            </div>
          </ListItemButton>
        </ListItem>
      ))}
    </ListTemplate>
  );
};

const ListWithCheckboxTemplate = () => {
  const [checkedItems, setCheckedItems] = useState<Array<number>>([]);

  const handleClick = (itemIdx: number) => {
    if (checkedItems.includes(itemIdx)) {
      setCheckedItems((prev) => prev.filter((item) => itemIdx !== item));
    } else {
      setCheckedItems((prev) => [...prev, itemIdx]);
    }
  };

  return (
    <ListTemplate>
      {ITEMS.map(({ title }, idx) => (
        <ListItem key={title} style={{ padding: 0 }}>
          <ListItemButton
            style={{ gap: '10px' }}
            onClick={() => handleClick(idx)}
          >
            <Checkbox checked={checkedItems.includes(idx)} />
            <Text
              className="typo-body-medium"
              style={{ flex: 1, margin: '5px 0' }}
            >
              {title}
            </Text>
          </ListItemButton>
        </ListItem>
      ))}
    </ListTemplate>
  );
};

const ListWithSwitchTemplate = () => {
  const [checkedItems, setCheckedItems] = useState<Array<number>>([]);

  const handleClick = (itemIdx: number) => {
    if (checkedItems.includes(itemIdx)) {
      setCheckedItems((prev) => prev.filter((item) => itemIdx !== item));
    } else {
      setCheckedItems((prev) => [...prev, itemIdx]);
    }
  };

  return (
    <ListTemplate>
      {ITEMS.map(({ title, icon }, idx) => (
        <ListItem key={title} style={{ gap: '10px' }}>
          {icon}
          <Text
            className="typo-body-medium"
            style={{ flex: 1, margin: '5px 0' }}
          >
            {title}
          </Text>
          <Switch
            checked={checkedItems.includes(idx)}
            onClick={() => handleClick(idx)}
          />
        </ListItem>
      ))}
    </ListTemplate>
  );
};

export const BasicList: Story = {
  render: (args) => (
    <ListTemplate {...args}>
      {ITEMS.map(({ title }) => (
        <ListItem key={title}>{title}</ListItem>
      ))}
    </ListTemplate>
  )
};

export const ListWithIconAndAvatar: Story = {
  render: (args) => (
    <ListTemplate {...args}>
      {ITEMS.map(({ title, avatar }) => (
        <ListItem key={title} style={{ gap: '10px' }}>
          <Avatar size="xs">{avatar}</Avatar>
          <Text
            className="typo-body-medium"
            style={{ flex: 1, margin: '5px 0' }}
          >
            {title}
          </Text>
          <ButtonBase
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '5px',
              height: 'max-content',
              aspectRatio: '1/1',
              borderRadius: '50%'
            }}
          >
            <TrashcanIcon />
          </ButtonBase>
        </ListItem>
      ))}
    </ListTemplate>
  )
};

export const ClickableList: Story = {
  render: (args) => (
    <ListTemplate {...args}>
      {ITEMS.map(({ title, icon, disabled }) => (
        <ListItem key={title} style={{ padding: 0 }}>
          <ListItemButton style={{ gap: '10px' }} disabled={disabled}>
            {icon}
            <Text
              className="typo-body-medium"
              style={{ flex: 1, margin: '5px 0' }}
            >
              {title}
            </Text>
          </ListItemButton>
        </ListItem>
      ))}
    </ListTemplate>
  )
};

export const NestedList: Story = {
  render: (args) => <NestedListTemplate {...args} />
};

export const SelectedList: Story = {
  render: (args) => <SelectedListTemplate {...args} />
};

export const ListWithLabel: Story = {
  render: (args) => (
    <ListTemplate
      style={{
        position: 'relative',
        height: '200px',
        overflow: 'auto',
        padding: 0
      }}
      {...args}
    >
      {ITEMS_GROUP.map(({ label, items }) => (
        <Fragment key={label}>
          <ListItem
            className="typo-title-medium"
            style={{
              position: 'sticky',
              top: 0,
              left: 0,
              zIndex: 1,
              backgroundColor: 'gray-100'
            }}
          >
            {label}
          </ListItem>
          {items.map(({ title }) => (
            <ListItem key={title} style={{ padding: 0 }}>
              <ListItemButton className="typo-body-medium">
                {title}
              </ListItemButton>
            </ListItem>
          ))}
        </Fragment>
      ))}
    </ListTemplate>
  )
};

export const ListWithCheckbox: Story = {
  render: (args) => <ListWithCheckboxTemplate {...args} />
};

export const ListWithSwitch: Story = {
  render: (args) => <ListWithSwitchTemplate {...args} />
};
