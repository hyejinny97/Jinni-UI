import type { Meta, StoryObj } from '@storybook/react';
import TableRow from './TableRow';
import { StoryErrorBoundary } from '@/components/_share/StoryErrorBoundary';

const meta: Meta<typeof TableRow> = {
  component: TableRow,
  argTypes: {
    hover: {
      description: 'true이면, hover effect가 활성화됨',
      table: {
        type: { summary: `boolean` }
      }
    },
    selected: {
      description: 'true이면 selected styling 됨',
      table: {
        type: { summary: `boolean` }
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
type Story = StoryObj<typeof TableRow>;

export const BasicTableRow: Story = {};
