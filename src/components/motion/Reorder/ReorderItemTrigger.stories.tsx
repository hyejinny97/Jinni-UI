import type { Meta, StoryObj } from '@storybook/react';
import { ReorderItemTrigger } from '.';
import { StoryErrorBoundary } from '@/components/_share/StoryErrorBoundary';

const meta: Meta<typeof ReorderItemTrigger> = {
  component: ReorderItemTrigger,
  argTypes: {
    children: {
      description: 'drag 이벤트를 유발하는 요소',
      table: {
        type: { summary: 'React.ReactNode' }
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
type Story = StoryObj<typeof ReorderItemTrigger>;

export const Basic: Story = {};
