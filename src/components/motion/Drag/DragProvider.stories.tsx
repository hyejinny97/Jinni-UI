import type { Meta, StoryObj } from '@storybook/react';
import { DragProvider } from '.';
import { StoryErrorBoundary } from '@/components/_share/StoryErrorBoundary';

const meta: Meta<typeof DragProvider> = {
  component: DragProvider,
  argTypes: {
    direction: {
      description: 'target 요소의 이동 방향',
      table: {
        type: { summary: `'horizontal' | 'vertical'` },
        defaultValue: { summary: `'horizontal'` }
      }
    },
    disabled: {
      description: 'true이면, drag 되지 않음',
      table: {
        type: { summary: `boolean` }
      }
    },
    disableOverDragEffect: {
      description: 'true이면, over drag 효과가 사라짐',
      table: {
        type: { summary: `boolean` }
      }
    },
    slip: {
      description: 'true이면, 미끄러지는 효과가 나타남',
      table: {
        type: { summary: `boolean` },
        defaultValue: { summary: `false` }
      }
    },
    slipSize: {
      description: '미끄러지는 정도',
      table: {
        type: { summary: `'small' | 'medium' | 'large'` },
        defaultValue: { summary: `'medium'` }
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
type Story = StoryObj<typeof DragProvider>;

export const Basic: Story = {};
