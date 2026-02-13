import type { Meta, StoryObj } from '@storybook/react';
import TabPrevButton from './TabPrevButton';
import { StoryErrorBoundary } from '@/components/_share/StoryErrorBoundary';

const meta: Meta<typeof TabPrevButton> = {
  component: TabPrevButton,
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
type Story = StoryObj<typeof TabPrevButton>;

export const Basic: Story = {};
