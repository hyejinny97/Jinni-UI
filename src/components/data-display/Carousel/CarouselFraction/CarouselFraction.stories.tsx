import type { Meta, StoryObj } from '@storybook/react';
import CarouselFraction from './CarouselFraction';
import { StoryErrorBoundary } from '@/components/_share/StoryErrorBoundary';

const meta: Meta<typeof CarouselFraction> = {
  component: CarouselFraction,
  argTypes: {
    position: {
      description: 'carousel 내에서 fraction 위치',
      table: {
        type: {
          summary: `'top-start' | 'top-center' | 'top-end' | 'center-start' | 'center-end' | 'bottom-start' | 'bottom-center' | 'bottom-end'`
        },
        defaultValue: {
          summary: `- carousel이 horizontal인 경우, 'bottom-center'\n
- carousel이 vertical인 경우, 'center-end'`
        }
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
type Story = StoryObj<typeof CarouselFraction>;

export const BasicCarouselFraction: Story = {};
