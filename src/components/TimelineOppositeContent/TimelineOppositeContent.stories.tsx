import type { Meta, StoryObj } from '@storybook/react';
import TimelineOppositeContent from './TimelineOppositeContent';
import StoryErrorBoundary from '@/components/StoryErrorBoundary';

const meta: Meta<typeof TimelineOppositeContent> = {
  title: 'components/Timeline/TimelineOppositeContent',
  component: TimelineOppositeContent,
  argTypes: {
    children: {
      description: 'main content 반대편에 위치한 content',
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
type Story = StoryObj<typeof TimelineOppositeContent>;

export const BasicTimelineOppositeContent: Story = {};
