import type { Meta, StoryObj } from '@storybook/react';
import ListItem from './ListItem';
import { StoryErrorBoundary } from '@/components/_share/StoryErrorBoundary';

const meta: Meta<typeof ListItem> = {
  component: ListItem,
  argTypes: {
    children: {
      description: 'list item content',
      table: {
        type: { summary: `React.ReactNode` }
      }
    }
  },
  decorators: [
    (Story) => (
      <StoryErrorBoundary>
        <Story />
      </StoryErrorBoundary>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof ListItem>;

export const BasicListItem: Story = {};
