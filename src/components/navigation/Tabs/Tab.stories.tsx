import type { Meta, StoryObj } from '@storybook/react';
import Tab from './Tab';
import { Stack } from '@/components/layout/Stack';
import { HomeIcon } from '@/components/icons/HomeIcon';

const meta: Meta<typeof Tab> = {
  component: Tab,
  argTypes: {
    selected: {
      description: 'selected tab인지 여부',
      defaultValue: { summary: `false` }
    },
    value: {
      description: '다른 tab과 구별되는 특정 tab value',
      table: {
        type: { summary: `string | number` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Tab>;

export const BasicTab: Story = {
  render: (args) => (
    <Tab value="one" {...args}>
      ITEM ONE
    </Tab>
  )
};

export const Variant: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20} style={{ display: 'inline-flex' }}>
      <Tab variant="filled" {...args}>
        ITEM ONE
      </Tab>
      <Tab variant="subtle-filled" {...args}>
        ITEM ONE
      </Tab>
      <Tab variant="outlined" {...args}>
        ITEM ONE
      </Tab>
      <Tab variant="text" {...args}>
        ITEM ONE
      </Tab>
    </Stack>
  )
};

export const SelectedTab: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20} style={{ display: 'inline-flex' }}>
      <Tab variant="filled" selected {...args}>
        ITEM ONE
      </Tab>
      <Tab variant="subtle-filled" selected {...args}>
        ITEM ONE
      </Tab>
      <Tab variant="outlined" selected {...args}>
        ITEM ONE
      </Tab>
      <Tab variant="text" selected {...args}>
        ITEM ONE
      </Tab>
    </Stack>
  )
};

export const Color: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20} style={{ display: 'inline-flex' }}>
      <Tab variant="filled" selected color="yellow-500" {...args}>
        ITEM ONE
      </Tab>
      <Tab variant="subtle-filled" selected color="yellow-500" {...args}>
        ITEM ONE
      </Tab>
      <Tab variant="outlined" selected color="yellow-500" {...args}>
        ITEM ONE
      </Tab>
      <Tab variant="text" selected color="yellow-500" {...args}>
        ITEM ONE
      </Tab>
    </Stack>
  )
};

export const Disabled: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20} style={{ display: 'inline-flex' }}>
      <Tab variant="filled" disabled {...args}>
        ITEM ONE
      </Tab>
      <Tab variant="subtle-filled" disabled {...args}>
        ITEM ONE
      </Tab>
      <Tab variant="outlined" disabled {...args}>
        ITEM ONE
      </Tab>
      <Tab variant="text" disabled {...args}>
        ITEM ONE
      </Tab>
    </Stack>
  )
};

export const Size: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20} style={{ display: 'inline-flex' }}>
      <Tab size="sm" {...args}>
        ITEM ONE
      </Tab>
      <Tab size="md" {...args}>
        ITEM ONE
      </Tab>
      <Tab size="lg" {...args}>
        ITEM ONE
      </Tab>
    </Stack>
  )
};

export const IconTab: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20} style={{ display: 'inline-flex' }}>
      <Tab leftIcon={<HomeIcon />} {...args}>
        ITEM ONE
      </Tab>
      <Tab rightIcon={<HomeIcon />} {...args}>
        ITEM ONE
      </Tab>
      <Tab centerIcon={<HomeIcon />} {...args}>
        ITEM ONE
      </Tab>
    </Stack>
  )
};

export const LinkTab: Story = {
  render: (args) => (
    <Tab as="a" href="#" {...args}>
      ITEM ONE
    </Tab>
  )
};
