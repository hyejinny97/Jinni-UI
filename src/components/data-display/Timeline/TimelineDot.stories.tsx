import type { Meta, StoryObj } from '@storybook/react';
import { TimelineDot } from '@/components/data-display/Timeline';

const meta: Meta<typeof TimelineDot> = {
  component: TimelineDot,
  argTypes: {
    children: {
      description: 'dot 안에 들어갈 내용',
      table: {
        type: { summary: `React.ReactNode` }
      }
    },
    color: {
      description: 'dot 색상',
      table: {
        type: { summary: `ColorType` },
        defaultValue: { summary: `'gray-400'` }
      }
    },
    variant: {
      description: 'dot 종류',
      table: {
        type: { summary: `'filled' | 'outlined'` },
        defaultValue: { summary: `'filled'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof TimelineDot>;

export const BasicTimelineDot: Story = {};
