import type { Meta, StoryObj } from '@storybook/react';
import CarouselDots from './CarouselDots';

const meta: Meta<typeof CarouselDots> = {
  component: CarouselDots,
  argTypes: {
    orientation: {
      description: 'dots 방향',
      table: {
        type: { summary: `'horizontal' | 'vertical'` },
        defaultValue: {
          summary: `- carousel이 horizontal인 경우, 'horizontal'\n
- carousel이 vertical인 경우, 'vertical'`
        }
      }
    },
    position: {
      description: 'carousel 내에서 dots 위치',
      table: {
        type: {
          summary: `'top-start' | 'top-center' | 'top-end' | 'left-center' | 'right-center' | 'bottom-start' | 'bottom-center' | 'bottom-end'`
        },
        defaultValue: {
          summary: `- carousel이 horizontal인 경우, 'bottom-center'\n
- carousel이 vertical인 경우, 'right-center'`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof CarouselDots>;

export const BasicCarouselDots: Story = {};
