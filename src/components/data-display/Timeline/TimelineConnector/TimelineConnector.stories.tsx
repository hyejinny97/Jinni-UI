import type { Meta, StoryObj } from '@storybook/react';
import TimelineConnector from './TimelineConnector';
import { StoryErrorBoundary } from '@/components/_share/StoryErrorBoundary';

const meta: Meta<typeof TimelineConnector> = {
  component: TimelineConnector,
  argTypes: {
    color: {
      description: 'connector 색상',
      table: {
        type: { summary: `ColorType` },
        defaultValue: { summary: `'gray-400'` }
      }
    },
    variant: {
      description: 'connector 종류',
      table: {
        type: { summary: `'solid' | 'dotted' | 'dashed'` },
        defaultValue: { summary: `'solid'` }
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
type Story = StoryObj<typeof TimelineConnector>;

export const BasicTimelineConnector: Story = {};
