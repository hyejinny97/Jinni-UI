import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import Breadcrumbs from './Breadcrumbs';
import { Stack } from '@/components/layout/Stack';
import { HomeIcon } from '@/components/icons/HomeIcon';
import { PersonIcon } from '@/components/icons/PersonIcon';
import { CartIcon } from '@/components/icons/CartIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { Menu } from '@/components/navigation/Menu';
import { MenuItem } from '@/components/navigation/MenuItem';
import { Button } from '@/components/general/Button';

const meta: Meta<typeof Breadcrumbs> = {
  component: Breadcrumbs,
  argTypes: {
    children: {
      description: 'Breadcrumbs 콘텐츠'
    },
    itemsAfterCollapse: {
      description:
        'Breadcrumbs 개수가 maxItems 값 이상일 때, ellipse 버튼 이후에 나타나는 아이템 개수',
      defaultValue: { summary: '1' }
    },
    itemsBeforeCollapse: {
      description:
        'Breadcrumbs 개수가 maxItems 값 이상일 때, ellipse 버튼 이전에 나타나는 아이템 개수',
      defaultValue: { summary: '1' }
    },
    maxItems: {
      description: '화면 상에 나타나는 최대 Breadcrumbs 갯수',
      defaultValue: { summary: '5' }
    },
    separator: {
      description: 'Breadcrumbs 사이 구분선',
      defaultValue: { summary: `'/'` }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

const ICON_LINK_STYLE = {
  display: 'inline-flex',
  alignItems: 'center',
  columnGap: '3px'
};

const CondensedBreadcrumbsWithMenuTemplate = ({ ...args }) => {
  const anchorRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const handleCollapsedButtonClick = () => {
    setOpen(true);
  };
  const handleMenuClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Breadcrumbs {...args}>
        <a href="#">route1</a>
        <Button
          ref={anchorRef}
          variant="text"
          color="black"
          size="sm"
          onClick={handleCollapsedButtonClick}
        >
          ...
        </Button>
        <a href="#">route4</a>
      </Breadcrumbs>
      <Menu
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom'
        }}
        menuOrigin={{
          horizontal: 'center',
          vertical: 'top'
        }}
        open={open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
      >
        <MenuItem>route2</MenuItem>
        <MenuItem>route3</MenuItem>
      </Menu>
    </>
  );
};

export const BasicBreadcrumbs: Story = {
  render: (args) => {
    return (
      <Stack>
        <Breadcrumbs {...args}>
          <a href="#">route1</a>
          <a href="#">route2</a>
        </Breadcrumbs>
        <Breadcrumbs {...args}>
          <a href="#">route1</a>
          <span>route2</span>
        </Breadcrumbs>
      </Stack>
    );
  }
};

export const BreadcrumbsWithIcons: Story = {
  render: (args) => {
    return (
      <Breadcrumbs {...args}>
        <a href="#" style={ICON_LINK_STYLE}>
          <HomeIcon size={15} />
          Home
        </a>
        <a href="#" style={ICON_LINK_STYLE}>
          <PersonIcon size={15} />
          Profile
        </a>
        <a href="#" style={ICON_LINK_STYLE}>
          <CartIcon size={15} />
          Cart
        </a>
      </Breadcrumbs>
    );
  }
};

export const MaxItems: Story = {
  render: (args) => {
    return (
      <Breadcrumbs maxItems={3} {...args}>
        <a href="#">route1</a>
        <a href="#">route2</a>
        <a href="#">route3</a>
        <a href="#">route4</a>
        <a href="#">route5</a>
        <a href="#">route6</a>
      </Breadcrumbs>
    );
  }
};

export const ItemsBeforeCollapse: Story = {
  render: (args) => {
    return (
      <Breadcrumbs itemsBeforeCollapse={2} {...args}>
        <a href="#">route1</a>
        <a href="#">route2</a>
        <a href="#">route3</a>
        <a href="#">route4</a>
        <a href="#">route5</a>
        <a href="#">route6</a>
      </Breadcrumbs>
    );
  }
};

export const ItemsAfterCollapse: Story = {
  render: (args) => {
    return (
      <Breadcrumbs itemsAfterCollapse={3} {...args}>
        <a href="#">route1</a>
        <a href="#">route2</a>
        <a href="#">route3</a>
        <a href="#">route4</a>
        <a href="#">route5</a>
        <a href="#">route6</a>
      </Breadcrumbs>
    );
  }
};

export const CondensedBreadcrumbsWithMenu: Story = {
  render: (args) => CondensedBreadcrumbsWithMenuTemplate(args)
};

export const Separator: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <Breadcrumbs separator="-" {...args}>
          <a href="#">route1</a>
          <a href="#">route2</a>
          <a href="#">route3</a>
        </Breadcrumbs>
        <Breadcrumbs separator={<ArrowRightIcon size={15} />} {...args}>
          <a href="#">route1</a>
          <a href="#">route2</a>
          <a href="#">route3</a>
        </Breadcrumbs>
      </Stack>
    );
  }
};
