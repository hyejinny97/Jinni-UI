import type { Meta, StoryObj } from '@storybook/react';
import CarouselContent from './CarouselContent';
import { StoryErrorBoundary } from '@/components/_share/StoryErrorBoundary';

const meta: Meta<typeof CarouselContent> = {
  component: CarouselContent,
  argTypes: {
    children: {
      description: 'CarouselItem 컴포넌트들',
      table: {
        type: { summary: `CarouselItemElement | CarouselItemElement[]` }
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
type Story = StoryObj<typeof CarouselContent>;

export const BasicCarouselContent: Story = {};
