import type { Meta, StoryObj } from '@storybook/react';
import TimelineContent from './TimelineContent';
import { StoryErrorBoundary } from '@/components/_share/StoryErrorBoundary';

const meta: Meta<typeof TimelineContent> = {
  component: TimelineContent,
  argTypes: {
    children: {
      description: 'main content',
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
type Story = StoryObj<typeof TimelineContent>;

export const BasicTimelineContent: Story = {};
