import type { Meta, StoryObj } from '@storybook/react';
import CircularSpeedDialAction from './CircularSpeedDialAction';
import { StoryErrorBoundary } from '@/components/_share/StoryErrorBoundary';

const meta: Meta<typeof CircularSpeedDialAction> = {
  component: CircularSpeedDialAction,
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
type Story = StoryObj<typeof CircularSpeedDialAction>;

export const Basic: Story = {};
