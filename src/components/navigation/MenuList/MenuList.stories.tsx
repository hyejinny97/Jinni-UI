import type { Meta, StoryObj } from '@storybook/react';
import MenuList from './MenuList';
import { MenuItem } from '@/components/navigation/MenuItem';

const meta: Meta<typeof MenuList> = {
  component: MenuList,
  argTypes: {
    children: {
      description: '메뉴 콘텐츠 (MenuItem, Divider 등)'
    },
    dense: {
      description:
        'true이면, MenuItem 컴포넌트 내 padding과 font-size를 줄여줌',
      defaultValue: { summary: 'false' }
    },
    elevation: {
      description: 'elevation(box-shadow) 정도',
      defaultValue: { summary: '3' }
    }
  }
};

export default meta;
type Story = StoryObj<typeof MenuList>;

export const BasicMenuList: Story = {
  render: (args) => (
    <MenuList {...args}>
      <MenuItem>My Account</MenuItem>
      <MenuItem>Profile</MenuItem>
      <MenuItem>Logout</MenuItem>
    </MenuList>
  )
};

export const Dense: Story = {
  render: (args) => (
    <MenuList dense {...args}>
      <MenuItem>My Account</MenuItem>
      <MenuItem>Profile</MenuItem>
      <MenuItem>Logout</MenuItem>
    </MenuList>
  )
};

export const Elevation: Story = {
  render: (args) => (
    <MenuList elevation={5} {...args}>
      <MenuItem>My Account</MenuItem>
      <MenuItem>Profile</MenuItem>
      <MenuItem>Logout</MenuItem>
    </MenuList>
  )
};
