import type { Meta, StoryObj } from '@storybook/react';
import TabNextButton from './TabNextButton';
import { StoryErrorBoundary } from '@/components/_share/StoryErrorBoundary';

const meta: Meta<typeof TabNextButton> = {
  component: TabNextButton,
  argTypes: {
    children: {
      description: 'tab prev button content',
      table: {
        type: { summary: 'React.ReactNode' }
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
type Story = StoryObj<typeof TabNextButton>;

export const Basic: Story = {};
