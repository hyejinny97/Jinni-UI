import type { Meta, StoryObj } from '@storybook/react';
import TimelineItem from './TimelineItem';
import { StoryErrorBoundary } from '@/components/_share/StoryErrorBoundary';

const meta: Meta<typeof TimelineItem> = {
  component: TimelineItem,
  argTypes: {
    children: {
      description:
        'TimelineContent, TimelineOppositeContent, TimelineSeparator 컴포넌트들',
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
type Story = StoryObj<typeof TimelineItem>;

export const BasicTimelineItem: Story = {};
