import type { Meta, StoryObj } from '@storybook/react';
import { ListItem } from '.';

const meta: Meta<typeof ListItem> = {
  component: ListItem,
  argTypes: {
    children: {
      description: 'list item content',
      table: {
        type: { summary: `node` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ListItem>;

export const BasicListItem: Story = {};
