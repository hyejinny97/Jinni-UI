import type { Meta, StoryObj } from '@storybook/react';
import CarouselNextButton from './CarouselNextButton';

const meta: Meta<typeof CarouselNextButton> = {
  component: CarouselNextButton,
  argTypes: {
    children: {
      description: 'next button contents',
      table: {
        type: { summary: `React.ReactNode` },
        defaultValue: {
          summary: `- carousel이 horizontal인 경우, <ArrowRightIcon />\n
- carousel이 vertical인 경우, <ArrowDownIcon />`
        }
      }
    },
    position: {
      description: 'carousel 내에서 next button 위치',
      table: {
        type: {
          summary: `'top-start' | 'top-center' | 'top-end' | 'center-start' | 'center-end' | 'bottom-start' | 'bottom-center' | 'bottom-end'`
        },
        defaultValue: {
          summary: `- carousel이 horizontal인 경우, 'center-end'\n
- carousel이 vertical인 경우, 'bottom-center'`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof CarouselNextButton>;

export const BasicCarouselNextButton: Story = {};
