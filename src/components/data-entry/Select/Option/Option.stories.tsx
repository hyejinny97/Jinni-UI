import type { Meta, StoryObj } from '@storybook/react';
import Option from './Option';
import { StoryErrorBoundary } from '@/components/_share/StoryErrorBoundary';

const meta: Meta<typeof Option> = {
  component: Option,
  argTypes: {
    children: {
      description: 'option content',
      table: {
        type: { summary: `React.ReactNode` }
      }
    },
    value: {
      description: '다른 options와 구별되는 식별자',
      table: {
        type: { summary: `string | number` }
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
type Story = StoryObj<typeof Option>;

export const BasicOption: Story = {};
