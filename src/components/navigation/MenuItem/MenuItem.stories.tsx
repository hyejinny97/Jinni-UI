import type { Meta, StoryObj } from '@storybook/react';
import MenuItem from './MenuItem';

const meta: Meta<typeof MenuItem> = {
  component: MenuItem,
  argTypes: {
    children: {
      description: '메뉴 아이템 콘텐츠'
    },
    selected: {
      description: 'true이면, 선택됨'
    }
  }
};

export default meta;
type Story = StoryObj<typeof MenuItem>;

export const BasicMenuItem: Story = {
  render: (args) => <MenuItem {...args}>Menu Item</MenuItem>
};

export const Selected: Story = {
  render: (args) => (
    <MenuItem selected {...args}>
      Menu Item
    </MenuItem>
  )
};

export const LinkMenuItem: Story = {
  render: (args) => (
    <MenuItem href="#" {...args}>
      Menu Item
    </MenuItem>
  )
};

export const OverlayEffect: Story = {
  render: (args) => (
    <MenuItem disableOverlay {...args}>
      Menu Item
    </MenuItem>
  )
};

export const RippleStartLocation: Story = {
  render: (args) => (
    <MenuItem rippleStartLocation="center" {...args}>
      Menu Item
    </MenuItem>
  )
};

export const DisableRipple: Story = {
  render: (args) => (
    <MenuItem disableRipple {...args}>
      Menu Item
    </MenuItem>
  )
};

export const Disabled: Story = {
  render: (args) => (
    <MenuItem disabled {...args}>
      Menu Item
    </MenuItem>
  )
};
