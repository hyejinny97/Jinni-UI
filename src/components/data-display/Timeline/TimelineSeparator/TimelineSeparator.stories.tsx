import type { Meta, StoryObj } from '@storybook/react';
import TimelineSeparator from './TimelineSeparator';

const meta: Meta<typeof TimelineSeparator> = {
  component: TimelineSeparator,
  argTypes: {
    children: {
      description: 'TimelineDot, TimelineConnector 컴포넌트',
      table: {
        type: { summary: `React.ReactNode` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof TimelineSeparator>;

export const BasicTimelineSeparator: Story = {};
