import type { Meta, StoryObj } from '@storybook/react';
import CircularSpeedDialAction from './CircularSpeedDialAction';

const meta: Meta<typeof CircularSpeedDialAction> = {
  component: CircularSpeedDialAction,
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
type Story = StoryObj<typeof CircularSpeedDialAction>;

export const Basic: Story = {};
