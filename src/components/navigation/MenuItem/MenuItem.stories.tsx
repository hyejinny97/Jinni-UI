import type { Meta, StoryObj } from '@storybook/react';
import MenuItem from './MenuItem';

const meta: Meta<typeof MenuItem> = {
  component: MenuItem,
  argTypes: {
    children: {
      description: '메뉴 아이템 콘텐츠'
    },
    dense: {
      description:
        'true이면, MenuItem 컴포넌트 내 padding과 font-size를 줄여줌',
      defaultValue: { summary: 'false' }
    },
    disabled: {
      description: 'true이면, 비활성화됨',
      defaultValue: { summary: 'false' }
    },
    focus: {
      description: 'true이면, focus 됨',
      defaultValue: { summary: 'false' }
    },
    href: {
      description: '이동할 링크 url'
    },
    onClick: {
      description: 'MenuItem을 클릭하거나 Enter 키를 누를 때 호출되는 함수'
    },
    selected: {
      description: 'true이면, 선택됨',
      defaultValue: { summary: 'false' }
    }
  }
};

export default meta;
type Story = StoryObj<typeof MenuItem>;

export const BasicMenuItem: Story = {
  render: (args) => <MenuItem {...args}>Item</MenuItem>
};

export const Dense: Story = {
  render: (args) => (
    <MenuItem dense {...args}>
      Item
    </MenuItem>
  )
};

export const Selected: Story = {
  render: (args) => (
    <MenuItem selected {...args}>
      Item
    </MenuItem>
  )
};

export const Disabled: Story = {
  render: (args) => (
    <MenuItem disabled {...args}>
      Item
    </MenuItem>
  )
};

export const Focus: Story = {
  render: (args) => (
    <MenuItem focus {...args}>
      Item
    </MenuItem>
  )
};

export const LinkMenuItem: Story = {
  render: (args) => (
    <MenuItem href="#" {...args}>
      Item
    </MenuItem>
  )
};
