import type { Meta, StoryObj } from '@storybook/react';
import { useState, Fragment } from 'react';
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
import { Checkbox } from '@/components/data-entry/Checkbox';
import { Switch } from '@/components/data-entry/Switch';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof List> = {
  component: List,
  argTypes: {
    children: {
      description: 'list items',
      table: {
        type: { summary: `React.ReactNode` }
      }
    },
    dense: {
      description:
        'true이면, ListItem과 ListItemButton의 padding과 font-size가 작아짐',
      table: {
        type: { summary: `boolean` },
        defaultValue: { summary: 'false' }
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
    icon: <HomeIcon color="gray-600" />,
    disabled: false
  },
  {
    title: 'Item 2',
    description: 'This is item 2.',
    avatar: 'B',
    icon: <MailIcon color="gray-600" />,
    disabled: false
  },
  {
    title: 'Item 3',
    description: 'This is item 3.',
    avatar: 'C',
    icon: <FavoriteIcon color="gray-600" />,
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

const NestedListTemplate = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prev) => !prev);
  };
  const toggleIcon = open ? <ArrowUpIcon /> : <ArrowDownIcon />;

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '25px',
        backgroundColor: 'gray-50'
      }}
    >
      <Box
        style={{
          width: '300px',
          backgroundColor: 'white'
        }}
      >
        <List as="nav">
          {ITEMS.map(({ title, icon }, idx) => {
            const isLastItem = idx === ITEMS.length - 1;
            return (
              <ListItemButton
                key={title}
                style={{ gap: '10px' }}
                {...(isLastItem ? { onClick: toggle } : { href: '#' })}
              >
                {icon}
                <Text className="typo-body-medium" noMargin style={{ flex: 1 }}>
                  {title}
                </Text>
                {isLastItem && toggleIcon}
              </ListItemButton>
            );
          })}
          {open && (
            <List as="div" style={{ padding: 0 }}>
              {SUB_ITEMS.map(({ title }) => (
                <ListItemButton
                  key={title}
                  href="#"
                  style={{ gap: '10px', paddingLeft: '50px' }}
                >
                  <Text
                    className="typo-body-medium"
                    noMargin
                    style={{ flex: 1 }}
                  >
                    {title}
                  </Text>
                </ListItemButton>
              ))}
            </List>
          )}
        </List>
      </Box>
    </Box>
  );
};

const SelectedListTemplate = () => {
  const [selectedItemIdx, setSelectedItemIdx] = useState(0);

  const handleClick = (itemIdx: number) => {
    setSelectedItemIdx(itemIdx);
  };

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '25px',
        backgroundColor: 'gray-50'
      }}
    >
      <Box
        style={{
          width: '300px',
          backgroundColor: 'white'
        }}
      >
        <List as="div">
          {ITEMS.map(({ title, description, icon }, idx) => (
            <ListItemButton
              key={title}
              selected={selectedItemIdx === idx}
              onClick={() => handleClick(idx)}
              style={{ gap: '10px', alignItems: 'start' }}
            >
              {icon}
              <Stack
                spacing={5}
                style={{
                  flex: 1
                }}
              >
                <Text className="typo-body-medium" noMargin>
                  {title}
                </Text>
                <Text
                  className="typo-label-medium"
                  noMargin
                  style={{ color: 'gray-500' }}
                >
                  {description}
                </Text>
              </Stack>
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
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
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '25px',
        backgroundColor: 'gray-50'
      }}
    >
      <Box
        style={{
          width: '300px',
          backgroundColor: 'white'
        }}
      >
        <List as="nav">
          {ITEMS.map(({ title }, idx) => (
            <ListItemButton
              key={title}
              style={{ gap: '10px' }}
              onClick={() => handleClick(idx)}
            >
              <Checkbox checked={checkedItems.includes(idx)} />
              <Text className="typo-body-medium" noMargin style={{ flex: 1 }}>
                {title}
              </Text>
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
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
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '25px',
        backgroundColor: 'gray-50'
      }}
    >
      <Box
        style={{
          width: '300px',
          backgroundColor: 'white'
        }}
      >
        <List>
          {ITEMS.map(({ title, icon }, idx) => (
            <ListItem key={title} style={{ gap: '10px' }}>
              {icon}
              <Text className="typo-body-medium" noMargin style={{ flex: 1 }}>
                {title}
              </Text>
              <Switch
                checked={checkedItems.includes(idx)}
                onClick={() => handleClick(idx)}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export const BasicList: Story = {
  render: (args) => (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '25px',
        backgroundColor: 'gray-50'
      }}
    >
      <Box
        style={{
          width: '300px',
          backgroundColor: 'white'
        }}
      >
        <List {...args}>
          {ITEMS.map(({ title }) => (
            <ListItem key={title}>{title}</ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
};

export const Dense: Story = {
  render: (args) => (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '25px',
        backgroundColor: 'gray-50'
      }}
    >
      <Box
        style={{
          width: '300px',
          backgroundColor: 'white'
        }}
      >
        <List dense {...args}>
          {ITEMS.map(({ title }) => (
            <ListItem key={title}>{title}</ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
};

export const ListWithIconAndAvatar: Story = {
  render: (args) => (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '25px',
        backgroundColor: 'gray-50'
      }}
    >
      <Box
        style={{
          width: '300px',
          backgroundColor: 'white'
        }}
      >
        <List {...args}>
          {ITEMS.map(({ title, avatar }) => (
            <ListItem key={title} style={{ gap: '10px' }}>
              <Avatar size="xs">{avatar}</Avatar>
              <Text className="typo-body-medium" noMargin style={{ flex: 1 }}>
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
        </List>
      </Box>
    </Box>
  )
};

export const ClickableList: Story = {
  render: (args) => (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '25px',
        backgroundColor: 'gray-50'
      }}
    >
      <Box
        style={{
          width: '300px',
          backgroundColor: 'white'
        }}
      >
        <List as="nav" {...args}>
          {ITEMS.map(({ title, icon, disabled }) => (
            <ListItemButton
              key={title}
              style={{ gap: '10px' }}
              disabled={disabled}
            >
              {icon}
              <Text className="typo-body-medium" noMargin style={{ flex: 1 }}>
                {title}
              </Text>
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  )
};

export const NestedList: Story = {
  render: () => <NestedListTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const NestedListTemplate = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prev) => !prev);
  };
  const toggleIcon = open ? <ArrowUpIcon /> : <ArrowDownIcon />;

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '25px',
        backgroundColor: 'gray-50'
      }}
    >
      <Box
        style={{
          width: '300px',
          backgroundColor: 'white'
        }}
      >
        <List as="nav">
          {ITEMS.map(({ title, icon }, idx) => {
            const isLastItem = idx === ITEMS.length - 1;
            return (
              <ListItemButton
                key={title}
                style={{ gap: '10px' }}
                {...(isLastItem ? { onClick: toggle } : { href: '#' })}
              >
                {icon}
                <Text className="typo-body-medium" noMargin style={{ flex: 1 }}>
                  {title}
                </Text>
                {isLastItem && toggleIcon}
              </ListItemButton>
            );
          })}
          {open && (
            <List as="div" style={{ padding: 0 }}>
              {SUB_ITEMS.map(({ title }) => (
                <ListItemButton
                  key={title}
                  href="#"
                  style={{ gap: '10px', paddingLeft: '50px' }}
                >
                  <Text
                    className="typo-body-medium"
                    noMargin
                    style={{ flex: 1 }}
                  >
                    {title}
                  </Text>
                </ListItemButton>
              ))}
            </List>
          )}
        </List>
      </Box>
    </Box>
  );
};
`.trim()
      }
    }
  }
};

export const SelectedList: Story = {
  render: () => <SelectedListTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const SelectedListTemplate = () => {
  const [selectedItemIdx, setSelectedItemIdx] = useState(0);

  const handleClick = (itemIdx: number) => {
    setSelectedItemIdx(itemIdx);
  };

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '25px',
        backgroundColor: 'gray-50'
      }}
    >
      <Box
        style={{
          width: '300px',
          backgroundColor: 'white'
        }}
      >
        <List as="div">
          {ITEMS.map(({ title, description, icon }, idx) => (
            <ListItemButton
              key={title}
              selected={selectedItemIdx === idx}
              onClick={() => handleClick(idx)}
              style={{ gap: '10px', alignItems: 'start' }}
            >
              {icon}
              <Stack
                spacing={5}
                style={{
                  flex: 1
                }}
              >
                <Text className="typo-body-medium" noMargin>
                  {title}
                </Text>
                <Text
                  className="typo-label-medium"
                  noMargin
                  style={{ color: 'gray-500' }}
                >
                  {description}
                </Text>
              </Stack>
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );
};`.trim()
      }
    }
  }
};

export const ListWithLabel: Story = {
  render: (args) => (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '25px',
        backgroundColor: 'gray-50'
      }}
    >
      <Box
        style={{
          width: '300px',
          backgroundColor: 'white'
        }}
      >
        <List
          as="nav"
          style={{
            position: 'relative',
            height: '188px',
            overflow: 'auto',
            padding: 0
          }}
          {...args}
        >
          {ITEMS_GROUP.map(({ label, items }) => (
            <Fragment key={label}>
              <ListItem
                as="div"
                className="typo-title-medium"
                style={{
                  position: 'sticky',
                  top: 0,
                  left: 0,
                  zIndex: 1,
                  backgroundColor: 'gray-500',
                  color: 'white'
                }}
              >
                {label}
              </ListItem>
              {items.map(({ title }) => (
                <ListItemButton key={title} className="typo-body-medium">
                  {title}
                </ListItemButton>
              ))}
            </Fragment>
          ))}
        </List>
      </Box>
    </Box>
  )
};

export const ListWithCheckbox: Story = {
  render: () => <ListWithCheckboxTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ListWithCheckboxTemplate = () => {
  const [checkedItems, setCheckedItems] = useState<Array<number>>([]);

  const handleClick = (itemIdx: number) => {
    if (checkedItems.includes(itemIdx)) {
      setCheckedItems((prev) => prev.filter((item) => itemIdx !== item));
    } else {
      setCheckedItems((prev) => [...prev, itemIdx]);
    }
  };

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '25px',
        backgroundColor: 'gray-50'
      }}
    >
      <Box
        style={{
          width: '300px',
          backgroundColor: 'white'
        }}
      >
        <List as="nav">
          {ITEMS.map(({ title }, idx) => (
            <ListItemButton
              key={title}
              style={{ gap: '10px' }}
              onClick={() => handleClick(idx)}
            >
              <Checkbox checked={checkedItems.includes(idx)} />
              <Text className="typo-body-medium" noMargin style={{ flex: 1 }}>
                {title}
              </Text>
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );
};`.trim()
      }
    }
  }
};

export const ListWithSwitch: Story = {
  render: () => <ListWithSwitchTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ListWithSwitchTemplate = () => {
  const [checkedItems, setCheckedItems] = useState<Array<number>>([]);

  const handleClick = (itemIdx: number) => {
    if (checkedItems.includes(itemIdx)) {
      setCheckedItems((prev) => prev.filter((item) => itemIdx !== item));
    } else {
      setCheckedItems((prev) => [...prev, itemIdx]);
    }
  };

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '25px',
        backgroundColor: 'gray-50'
      }}
    >
      <Box
        style={{
          width: '300px',
          backgroundColor: 'white'
        }}
      >
        <List>
          {ITEMS.map(({ title, icon }, idx) => (
            <ListItem key={title} style={{ gap: '10px' }}>
              {icon}
              <Text className="typo-body-medium" noMargin style={{ flex: 1 }}>
                {title}
              </Text>
              <Switch
                checked={checkedItems.includes(idx)}
                onClick={() => handleClick(idx)}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};
`.trim()
      }
    }
  }
};
