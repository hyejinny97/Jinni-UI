import type { Meta, StoryObj } from '@storybook/react';
import LinearSpeedDialAction from './LinearSpeedDialAction';
import StoryErrorBoundary from '@/components/StoryErrorBoundary';

const meta: Meta<typeof LinearSpeedDialAction> = {
  title: 'components/LinearSpeedDial/LinearSpeedDialAction',
  component: LinearSpeedDialAction,
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
type Story = StoryObj<typeof LinearSpeedDialAction>;

export const Basic: Story = {};
