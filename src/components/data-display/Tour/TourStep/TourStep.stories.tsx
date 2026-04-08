import type { Meta, StoryObj } from '@storybook/react';
import TourStep from './TourStep';
import { StoryErrorBoundary } from '@/components/_share/StoryErrorBoundary';

const meta: Meta<typeof TourStep> = {
  component: TourStep,
  argTypes: {
    anchorElRef: {
      description: 'TourStep의 위치를 결정짓는 anchor',
      table: {
        type: {
          summary: `React.RefObject<HTMLElement>`
        }
      }
    },
    BoxProps: {
      description: 'Box 컴포넌트에 적용되는 props',
      table: {
        type: {
          summary: `BoxProps`
        }
      }
    },
    children: {
      description: '콘텐츠',
      table: {
        type: {
          summary: `React.ReactNode`
        }
      }
    },
    offset: {
      description: 'spotlight와 tour content 사이 거리',
      table: {
        type: {
          summary: `number`
        },
        defaultValue: { summary: `10` }
      }
    },
    placement: {
      description: 'anchorEl에 상대적인 tour content의 위치',
      table: {
        type: {
          summary: `'top-start' | 'top' | 'top-end' | 'bottom-start' | 'bottom' | 'bottom-end' | 'left-start' | 'left' | 'left-end' | 'right-start' | 'right' | 'right-end'`
        },
        defaultValue: { summary: `'bottom-start'` }
      }
    },
    value: {
      description: '특정 TourStep을 구별하는 식별자',
      table: {
        type: {
          summary: `string | number`
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
type Story = StoryObj<typeof TourStep>;

export const BasicTourStep: Story = {};
