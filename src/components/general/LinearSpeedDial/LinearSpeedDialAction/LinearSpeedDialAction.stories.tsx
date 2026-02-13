import type { Meta, StoryObj } from '@storybook/react';
import LinearSpeedDialAction from './LinearSpeedDialAction';
import { StoryErrorBoundary } from '@/components/_share/StoryErrorBoundary';

const meta: Meta<typeof LinearSpeedDialAction> = {
  component: LinearSpeedDialAction,
  argTypes: {
    TooltipProps: {
      description: 'tooltip 컴포넌트의 props',
      table: {
        type: { summary: 'TooltipProps' }
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
type Story = StoryObj<typeof LinearSpeedDialAction>;

export const Basic: Story = {};
