import type { Meta, StoryObj } from '@storybook/react';
import CarouselItem from './CarouselItem';

const meta: Meta<typeof CarouselItem> = {
  component: CarouselItem,
  argTypes: {
    children: {
      description: '한 slide에 들어갈 contents',
      table: {
        type: { summary: `React.ReactNode` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof CarouselItem>;

export const BasicCarouselItem: Story = {};
