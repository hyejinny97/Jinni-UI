import type { Meta, StoryObj } from '@storybook/react';
import TimelineOppositeContent from './TimelineOppositeContent';

const meta: Meta<typeof TimelineOppositeContent> = {
  component: TimelineOppositeContent,
  argTypes: {
    children: {
      description: 'main content 반대편에 위치한 content',
      table: {
        type: { summary: `React.ReactNode` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof TimelineOppositeContent>;

export const BasicTimelineOppositeContent: Story = {};
