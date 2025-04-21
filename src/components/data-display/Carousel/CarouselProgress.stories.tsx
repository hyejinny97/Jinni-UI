import type { Meta, StoryObj } from '@storybook/react';
import CarouselProgress from './CarouselProgress';

const meta: Meta<typeof CarouselProgress> = {
  component: CarouselProgress,
  argTypes: {
    orientation: {
      description: 'linear progress 방향',
      table: {
        type: { summary: `'horizontal' | 'vertical'` },
        defaultValue: {
          summary: `- carousel이 horizontal인 경우, 'horizontal'\n
- carousel이 vertical인 경우, 'vertical'`
        }
      }
    },
    position: {
      description: 'carousel 내에서 linear progress 위치',
      table: {
        type: {
          summary: `'top' | 'bottom' | 'left' | 'right'`
        },
        defaultValue: {
          summary: `- carousel이 horizontal인 경우, 'top'\n
- carousel이 vertical인 경우, 'left'`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof CarouselProgress>;

export const BasicCarouselProgress: Story = {};
