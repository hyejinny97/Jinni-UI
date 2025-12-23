import type { Meta, StoryObj } from '@storybook/react';
import TimelineContent from './TimelineContent';

const meta: Meta<typeof TimelineContent> = {
  component: TimelineContent,
  argTypes: {
    children: {
      description: 'main content',
      table: {
        type: { summary: `React.ReactNode` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof TimelineContent>;

export const BasicTimelineContent: Story = {};
