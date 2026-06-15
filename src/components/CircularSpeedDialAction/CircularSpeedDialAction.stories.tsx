import type { Meta, StoryObj } from '@storybook/react';
import CircularSpeedDialAction from './CircularSpeedDialAction';
import StoryErrorBoundary from '@/components/StoryErrorBoundary';

const meta: Meta<typeof CircularSpeedDialAction> = {
  title: 'components/CircularSpeedDial/CircularSpeedDialAction',
  component: CircularSpeedDialAction,
  argTypes: {
    TooltipProps: {
      description: 'tooltip 컴포넌트의 props',
      table: {
        type: { summary: 'TooltipProps' }
      }
    },
    TransitionComponent: {
      description: `transition 컴포넌트`,
      table: {
        type: { summary: `React.ComponentType<any>` },
        defaultValue: { summary: `'span'` }
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
