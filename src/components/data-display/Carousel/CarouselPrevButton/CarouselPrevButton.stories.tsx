import type { Meta, StoryObj } from '@storybook/react';
import CarouselPrevButton from './CarouselPrevButton';

const meta: Meta<typeof CarouselPrevButton> = {
  component: CarouselPrevButton,
  argTypes: {
    children: {
      description: 'prev button contents',
      table: {
        type: { summary: `React.ReactNode` },
        defaultValue: {
          summary: `- carousel이 horizontal인 경우, <ArrowLeftIcon />\n
- carousel이 vertical인 경우, <ArrowUpIcon />`
        }
      }
    },
    position: {
      description: 'carousel 내에서 prev button 위치',
      table: {
        type: {
          summary: `'top-start' | 'top-center' | 'top-end' | 'center-start' | 'center-end' | 'bottom-start' | 'bottom-center' | 'bottom-end'`
        },
        defaultValue: {
          summary: `- carousel이 horizontal인 경우, 'center-start'\n
- carousel이 vertical인 경우, 'top-center'`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof CarouselPrevButton>;

export const BasicCarouselPrevButton: Story = {};
