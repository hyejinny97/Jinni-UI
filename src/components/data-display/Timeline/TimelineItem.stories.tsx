import type { Meta, StoryObj } from '@storybook/react';
import { TimelineItem } from '@/components/data-display/Timeline';

const meta: Meta<typeof TimelineItem> = {
  component: TimelineItem,
  argTypes: {
    children: {
      description:
        'TimelineContent, TimelineOppositeContent, TimelineSeparator  컴포넌트들',
      table: {
        type: { summary: `React.ReactNode` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof TimelineItem>;

export const BasicTimelineItem: Story = {};
