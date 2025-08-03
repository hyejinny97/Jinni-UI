import type { Meta, StoryObj } from '@storybook/react';
import TourStep from './TourStep';

const meta: Meta<typeof TourStep> = {
  component: TourStep,
  argTypes: {
    anchorEl: {
      description:
        'HTML element로, 해당 anchor 위치에 따라 tour content의 위치가 결정됨',
      table: {
        type: {
          summary: `HTMLElement`
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
    maskHolePadding: {
      description: 'mask hole의 패딩',
      table: {
        type: {
          summary: `number`
        },
        defaultValue: { summary: `5` }
      }
    },
    offset: {
      description: 'mask hole과 tour content 사이 거리',
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
    TourStepContentProps: {
      description: 'TourStepContent(=Box)에 적용되는 props',
      table: {
        type: {
          summary: `BoxProps`
        },
        defaultValue: { summary: `{ elevation: 5, round: 4 }` }
      }
    },
    value: {
      description: 'TourStep을 식별하는 유니크한 값',
      table: {
        type: {
          summary: `string | number`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof TourStep>;

export const BasicTourStep: Story = {};
