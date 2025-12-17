import type { Meta, StoryObj } from '@storybook/react';
import LinearSpeedDialAction from './LinearSpeedDialAction';

const meta: Meta<typeof LinearSpeedDialAction> = {
  component: LinearSpeedDialAction,
  argTypes: {
    TooltipProps: {
      description: 'tooltip 컴포넌트의 props',
      table: {
        type: { summary: 'TooltipProps' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof LinearSpeedDialAction>;

export const Basic: Story = {};
