import type { Meta, StoryObj } from '@storybook/react';
import { DragContainer } from '.';
import { StoryErrorBoundary } from '@/components/_share/StoryErrorBoundary';

const meta: Meta<typeof DragContainer> = {
  component: DragContainer,
  argTypes: {
    children: {
      description: 'Drag 컴포넌트가 이동할 수 있는 제한된 공간',
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
type Story = StoryObj<typeof DragContainer>;

export const Basic: Story = {};
