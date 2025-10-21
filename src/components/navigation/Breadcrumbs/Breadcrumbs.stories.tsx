import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import Breadcrumbs from './Breadcrumbs';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { HomeIcon } from '@/components/icons/HomeIcon';
import { PersonIcon } from '@/components/icons/PersonIcon';
import { CartIcon } from '@/components/icons/CartIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { Menu } from '@/components/navigation/Menu';
import { MenuItem } from '@/components/navigation/MenuItem';
import { Button } from '@/components/general/Button';
import { ButtonBase } from '@/components/general/ButtonBase';
import { Link } from '@/components/navigation/Link';
import { Text } from '@/components/general/Text';
import { Chip } from '@/components/data-display/Chip';
import { Tree, TreeItem, TreeItemIdType } from '@/components/data-display/Tree';

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

const WithMenu = () => {
  const anchorRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link href="#" underline="hover">
          route1
        </Link>
        <Button
          ref={anchorRef}
          variant="subtle-filled"
          color="gray-600"
          size="sm"
          onClick={openMenu}
          aria-haspopup={true}
          aria-expanded={open}
          aria-controls="condensed-path"
        >
          ...
        </Button>
        <Link href="#" underline="hover" aria-current="page">
          route4
        </Link>
      </Breadcrumbs>
      <Menu
        id="condensed-path"
        anchorElRef={anchorRef}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom'
        }}
        menuOrigin={{
          horizontal: 'center',
          vertical: 'top'
        }}
        open={open}
        onClose={closeMenu}
      >
        <MenuItem href="#" onClick={closeMenu}>
          route2
        </MenuItem>
        <MenuItem href="#" onClick={closeMenu}>
          route3
        </MenuItem>
      </Menu>
    </>
  );
};

type PageType = { [key: string]: { label: string; routes: string } };

const PAGES: PageType = {
  home: { label: 'Home', routes: '/' },
  news: { label: 'News', routes: '/news' },
  weather: { label: 'Weather', routes: '/news/weather' },
  entertainment: {
    label: 'Entertainment',
    routes: '/news/entertainment'
  },
  shopping: { label: 'Shopping', routes: '/shopping' },
  email: { label: 'Email', routes: '/email' }
};

const getRouteArr = (currentPage: string) => {
  return ['home', ...PAGES[currentPage].routes.split('/').filter(Boolean)];
};

const BreadcrumbsWithTree = () => {
  const [currentPage, setCurrentPage] = useState<string>('weather');
  const routeArr = getRouteArr(currentPage);

  const handleChipClick = (route: string) => {
    setCurrentPage(route);
  };
  const handleSelectedItemsChange = (
    _: Event | React.SyntheticEvent,
    itemId: TreeItemIdType | null
  ) => {
    setCurrentPage(itemId as string);
  };

  return (
    <Stack spacing={20}>
      <Breadcrumbs itemsAfterCollapse={3} aria-label="breadcrumb">
        {routeArr.map((route) => (
          <Chip
            key={route}
            as={ButtonBase}
            variant="subtle-filled"
            onClick={() => handleChipClick(route)}
          >
            {PAGES[route].label}
          </Chip>
        ))}
      </Breadcrumbs>
      <Box style={{ width: '300px' }}>
        <Tree
          defaultExpandedItems={['news']}
          selectedItems={currentPage}
          onSelectedItemsChange={handleSelectedItemsChange}
        >
          <TreeItem itemId="news" label={PAGES.news.label}>
            <TreeItem itemId="weather" label={PAGES.weather.label} />
            <TreeItem
              itemId="entertainment"
              label={PAGES.entertainment.label}
            />
          </TreeItem>
          <TreeItem itemId="shopping" label={PAGES.shopping.label} />
          <TreeItem itemId="email" label={PAGES.email.label} />
        </Tree>
      </Box>
    </Stack>
  );
};

export const BasicBreadcrumbs: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <Breadcrumbs aria-label="breadcrumb" {...args}>
          <Link href="#" underline="hover">
            route1
          </Link>
          <Link href="#" underline="hover" aria-current="page">
            route2
          </Link>
        </Breadcrumbs>
        <Breadcrumbs aria-label="breadcrumb" {...args}>
          <Link href="#" underline="hover">
            route1
          </Link>
          <Text style={{ margin: 0, color: 'gray-700' }}>route2</Text>
        </Breadcrumbs>
      </Stack>
    );
  }
};

export const BreadcrumbsWithIcons: Story = {
  render: (args) => {
    return (
      <Breadcrumbs aria-label="breadcrumb" {...args}>
        <Link href="#" underline="hover" style={ICON_LINK_STYLE}>
          <HomeIcon size={15} />
          Home
        </Link>
        <Link href="#" underline="hover" style={ICON_LINK_STYLE}>
          <PersonIcon size={15} />
          Profile
        </Link>
        <Link
          href="#"
          underline="hover"
          style={ICON_LINK_STYLE}
          aria-current="page"
        >
          <CartIcon size={15} />
          Cart
        </Link>
      </Breadcrumbs>
    );
  }
};

export const MaxItems: Story = {
  render: (args) => {
    return (
      <Breadcrumbs maxItems={3} aria-label="breadcrumb" {...args}>
        <Link href="#" underline="hover">
          route1
        </Link>
        <Link href="#" underline="hover">
          route2
        </Link>
        <Link href="#" underline="hover">
          route3
        </Link>
        <Link href="#" underline="hover">
          route4
        </Link>
        <Link href="#" underline="hover">
          route5
        </Link>
        <Link href="#" underline="hover" aria-current="page">
          route6
        </Link>
      </Breadcrumbs>
    );
  }
};

export const ItemsBeforeCollapse: Story = {
  render: (args) => {
    return (
      <Breadcrumbs itemsBeforeCollapse={2} aria-label="breadcrumb" {...args}>
        <Link href="#" underline="hover">
          route1
        </Link>
        <Link href="#" underline="hover">
          route2
        </Link>
        <Link href="#" underline="hover">
          route3
        </Link>
        <Link href="#" underline="hover">
          route4
        </Link>
        <Link href="#" underline="hover">
          route5
        </Link>
        <Link href="#" underline="hover" aria-current="page">
          route6
        </Link>
      </Breadcrumbs>
    );
  }
};

export const ItemsAfterCollapse: Story = {
  render: (args) => {
    return (
      <Breadcrumbs itemsAfterCollapse={3} aria-label="breadcrumb" {...args}>
        <Link href="#" underline="hover">
          route1
        </Link>
        <Link href="#" underline="hover">
          route2
        </Link>
        <Link href="#" underline="hover">
          route3
        </Link>
        <Link href="#" underline="hover">
          route4
        </Link>
        <Link href="#" underline="hover">
          route5
        </Link>
        <Link href="#" underline="hover" aria-current="page">
          route6
        </Link>
      </Breadcrumbs>
    );
  }
};

export const CondensedBreadcrumbsWithMenu: Story = {
  render: () => <WithMenu />,
  parameters: {
    docs: {
      source: {
        code: `const WithMenu = () => {
  const anchorRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link href="#" underline="hover">
          route1
        </Link>
        <Button
          ref={anchorRef}
          variant="subtle-filled"
          color="gray-600"
          size="sm"
          onClick={openMenu}
          aria-haspopup={true}
          aria-expanded={open}
          aria-controls="condensed-path"
        >
          ...
        </Button>
        <Link href="#" underline="hover" aria-current="page">
          route4
        </Link>
      </Breadcrumbs>
      <Menu
        id="condensed-path"
        anchorElRef={anchorRef}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom'
        }}
        menuOrigin={{
          horizontal: 'center',
          vertical: 'top'
        }}
        open={open}
        onClose={closeMenu}
      >
        <MenuItem href="#" onClick={closeMenu}>
          route2
        </MenuItem>
        <MenuItem href="#" onClick={closeMenu}>
          route3
        </MenuItem>
      </Menu>
    </>
  );
};`.trim()
      }
    }
  }
};

export const Separator: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <Breadcrumbs separator="-" aria-label="breadcrumb" {...args}>
          <Link href="#" underline="hover">
            route1
          </Link>
          <Link href="#" underline="hover">
            route2
          </Link>
          <Link href="#" underline="hover" aria-current="page">
            route3
          </Link>
        </Breadcrumbs>
        <Breadcrumbs
          separator={<ArrowRightIcon size={15} />}
          aria-label="breadcrumb"
          {...args}
        >
          <Link href="#" underline="hover">
            route1
          </Link>
          <Link href="#" underline="hover">
            route2
          </Link>
          <Link href="#" underline="hover" aria-current="page">
            route3
          </Link>
        </Breadcrumbs>
      </Stack>
    );
  }
};

export const Customization: Story = {
  render: () => <BreadcrumbsWithTree />,
  parameters: {
    docs: {
      source: {
        code: `type PageType = { [key: string]: { label: string; routes: string } };

const PAGES: PageType = {
  home: { label: 'Home', routes: '/' },
  news: { label: 'News', routes: '/news' },
  weather: { label: 'Weather', routes: '/news/weather' },
  entertainment: {
    label: 'Entertainment',
    routes: '/news/entertainment'
  },
  shopping: { label: 'Shopping', routes: '/shopping' },
  email: { label: 'Email', routes: '/email' }
};

const getRouteArr = (currentPage: string) => {
  return ['home', ...PAGES[currentPage].routes.split('/').filter(Boolean)];
};

const BreadcrumbsWithTree = () => {
  const [currentPage, setCurrentPage] = useState<string>('weather');
  const routeArr = getRouteArr(currentPage);

  const handleChipClick = (route: string) => {
    setCurrentPage(route);
  };
  const handleSelectedItemsChange = (
    _: Event | React.SyntheticEvent,
    itemId: TreeItemIdType | null
  ) => {
    setCurrentPage(itemId as string);
  };

  return (
    <Stack spacing={20}>
      <Breadcrumbs itemsAfterCollapse={3} aria-label="breadcrumb">
        {routeArr.map((route) => (
          <Chip
            key={route}
            as={ButtonBase}
            variant="subtle-filled"
            onClick={() => handleChipClick(route)}
          >
            {PAGES[route].label}
          </Chip>
        ))}
      </Breadcrumbs>
      <Box style={{ width: '300px' }}>
        <Tree
          defaultExpandedItems={['news']}
          selectedItems={currentPage}
          onSelectedItemsChange={handleSelectedItemsChange}
        >
          <TreeItem itemId="news" label={PAGES.news.label}>
            <TreeItem itemId="weather" label={PAGES.weather.label} />
            <TreeItem
              itemId="entertainment"
              label={PAGES.entertainment.label}
            />
          </TreeItem>
          <TreeItem itemId="shopping" label={PAGES.shopping.label} />
          <TreeItem itemId="email" label={PAGES.email.label} />
        </Tree>
      </Box>
    </Stack>
  );
};`.trim()
      }
    }
  }
};
