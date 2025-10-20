import type { Meta, StoryObj } from '@storybook/react';
import MenuList from './MenuList';
import { MenuItem } from '@/components/navigation/MenuItem';

const meta: Meta<typeof MenuList> = {
  component: MenuList,
  argTypes: {
    children: {
      description: 'MenuItem 등 메뉴 항목'
    },
    dense: {
      description: 'true이면, MenuItem 컴포넌트 내 padding과 font-size를 줄여줌'
    },
    disableAlphabetKeyFocus: {
      description: 'true이면, 알파벳 키를 눌러도 해당 item이 focus 되지 않음'
    },
    elevation: {
      description: '계층(높낮이)',
      table: {
        type: { summary: 'ElevationLevelType (0~24)' },
        defaultValue: { summary: '3' }
      }
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

export const DisableAlphabetKeyFocus: Story = {
  render: (args) => (
    <MenuList disableAlphabetKeyFocus {...args}>
      <MenuItem>My Account</MenuItem>
      <MenuItem>Profile</MenuItem>
      <MenuItem>Logout</MenuItem>
    </MenuList>
  )
};
