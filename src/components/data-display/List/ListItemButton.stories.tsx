import type { Meta, StoryObj } from '@storybook/react';
import { ListItemButton } from '.';

const meta: Meta<typeof ListItemButton> = {
  component: ListItemButton,
  argTypes: {
    children: {
      description: 'list item content',
      table: {
        type: { summary: `node` }
      }
    },
    selected: {
      description: 'true이면, selected style이 보여짐',
      type: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<typeof ListItemButton>;

export const BasicListItemButton: Story = {};
