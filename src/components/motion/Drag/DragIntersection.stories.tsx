import type { Meta, StoryObj } from '@storybook/react';
import { DragIntersection } from '.';
import { StoryErrorBoundary } from '@/components/_share/StoryErrorBoundary';

const meta: Meta<typeof DragIntersection> = {
  component: DragIntersection,
  argTypes: {
    children: {
      description: 'intersection root에 대한 교차 여부를 감지하는 대상',
      table: {
        type: { summary: `React.ReactNode` }
      }
    },
    onIntersect: {
      description:
        'intersection root와 intersection target이 교차할 때 호출되는 함수',
      table: {
        type: {
          summary: `(entry: IntersectionObserverEntry) => {
  signedDestination: number | null;
  speed?: number;
  acceleration?: number;
  onDestinationArrived?: () => void;
 }`
        }
      }
    },
    root: {
      description: 'intersection root',
      table: {
        type: { summary: `'container' | 'viewport'` },
        defaultValue: { summary: `'container'` }
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
type Story = StoryObj<typeof DragIntersection>;

export const Basic: Story = {};
