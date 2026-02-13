import type { Meta, StoryObj } from '@storybook/react';
import CarouselItem from './CarouselItem';
import { StoryErrorBoundary } from '@/components/_share/StoryErrorBoundary';

const meta: Meta<typeof CarouselItem> = {
  component: CarouselItem,
  argTypes: {
    children: {
      description: '한 slide에 들어갈 contents',
      table: {
        type: { summary: `React.ReactNode` }
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
type Story = StoryObj<typeof CarouselItem>;

export const BasicCarouselItem: Story = {};
